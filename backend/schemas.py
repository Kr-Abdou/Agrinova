from pydantic import BaseModel
from typing import List, Optional

class SensorBase(BaseModel):
    id: str
    farm_id: Optional[str] = None
    zone_id: Optional[str] = None
    type: str
    name: str
    health_score: float
    status: str
    battery_percent: float
    ph: float
    ec: float
    moisture: float
    temperature: float
    nitrogen: float
    phosphorus: float
    potassium: float

class Sensor(SensorBase):
    class Config:
        orm_mode = True
        from_attributes = True

class ZoneBase(BaseModel):
    id: str
    farm_id: Optional[str] = None
    name: str
    name_fr: str
    color: str
    color_name: str
    hectares: float
    health_score: float
    status: str

class Zone(ZoneBase):
    class Config:
        orm_mode = True
        from_attributes = True

class FarmBase(BaseModel):
    id: str
    name: str
    location: str
    region: str
    hectares: float
    owner: str
    subscription_tier: str
    currency: str

class Farm(FarmBase):
    zones: List[Zone] = []
    sensors: List[Sensor] = []
    
    class Config:
        orm_mode = True
        from_attributes = True

class CropBase(BaseModel):
    crop_id: str
    crop_name: str
    crop_name_ar: str
    suitability_score: int
    suitability_level: str
    profitability: str
    expected_yield_tons_per_hectare: float

class Crop(CropBase):
    class Config:
        orm_mode = True
        from_attributes = True
