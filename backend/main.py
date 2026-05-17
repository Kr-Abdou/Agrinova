from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Agrinova API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/farms", response_model=List[schemas.Farm])
def read_farms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    farms = db.query(models.Farm).offset(skip).limit(limit).all()
    return farms

@app.get("/api/farms/{farm_id}", response_model=schemas.Farm)
def read_farm(farm_id: str, db: Session = Depends(get_db)):
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if farm is None:
        raise HTTPException(status_code=404, detail="Farm not found")
    return farm

@app.get("/api/sensors")
def read_sensors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sensors = db.query(models.Sensor).offset(skip).limit(limit).all()
    result = []
    for s in sensors:
        # Generate some fake coordinates based on zone_id if needed, or static
        lat = 36.4028 if s.zone_id == "Z-001" else 36.3995
        lng = 2.8527 if s.zone_id == "Z-001" else 2.8412
        zone_name = "Champ Nord" if s.zone_id == "Z-001" else "Champ Sud"
        
        result.append({
            "id": s.id,
            "type": s.type,
            "name": s.name,
            "zone": zone_name,
            "coordinates": {"lat": lat, "lng": lng},
            "radius_meters": 50,
            "health_score": s.health_score,
            "status": s.status,
            "battery_percent": s.battery_percent,
            "readings": {
                "pH": s.ph,
                "EC_dS_per_m": s.ec,
                "moisture_percent": s.moisture,
                "temperature_celsius": s.temperature,
                "nitrogen_mg_per_kg": s.nitrogen,
                "phosphorus_mg_per_kg": s.phosphorus,
                "potassium_mg_per_kg": s.potassium
            }
        })
    return result

@app.get("/api/zones", response_model=List[schemas.Zone])
def read_zones(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    zones = db.query(models.Zone).offset(skip).limit(limit).all()
    return zones

@app.get("/api/crops", response_model=List[schemas.Crop])
def read_crops(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    crops = db.query(models.Crop).offset(skip).limit(limit).all()
    return crops
