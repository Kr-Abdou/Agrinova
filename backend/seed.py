from database import SessionLocal, engine
import models

def seed_database():
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(models.Farm).first():
        print("Database already seeded.")
        db.close()
        return

    # Create Farm
    farm = models.Farm(
        id="FARM-ALG-001",
        name="Ferme Beni Messi",
        location="Médéa, Algeria",
        region="Kabylie",
        hectares=45.0,
        owner="Ahmed Beldjilali",
        subscription_tier="Pro",
        currency="DZD"
    )
    db.add(farm)
    db.commit()

    # Create Zones
    zones = [
        models.Zone(
            id="Z-001",
            farm_id="FARM-ALG-001",
            name="الحقل الشمالي",
            name_fr="Champ Nord",
            color="#3b82f6",
            color_name="blue",
            hectares=15.0,
            health_score=82.0,
            status="healthy"
        ),
        models.Zone(
            id="Z-002",
            farm_id="FARM-ALG-001",
            name="الحقل الجنوبي",
            name_fr="Champ Sud",
            color="#f97316",
            color_name="orange",
            hectares=18.0,
            health_score=65.0,
            status="caution"
        )
    ]
    db.add_all(zones)
    db.commit()

    # Create Sensors
    sensors = [
        models.Sensor(
            id="S-001",
            farm_id="FARM-ALG-001",
            zone_id="Z-001",
            type="Multi-Sensor",
            name="مستشعر التربة - الحقل الشمالي",
            health_score=82.0,
            status="healthy",
            battery_percent=95.0,
            ph=6.8,
            ec=1.2,
            moisture=28.0,
            temperature=22.0,
            nitrogen=45.0,
            phosphorus=12.0,
            potassium=180.0
        ),
        models.Sensor(
            id="S-002",
            farm_id="FARM-ALG-001",
            zone_id="Z-002",
            type="Multi-Sensor",
            name="مستشعر التربة - الحقل الجنوبي",
            health_score=65.0,
            status="caution",
            battery_percent=62.0,
            ph=7.2,
            ec=2.8,
            moisture=32.0,
            temperature=20.0,
            nitrogen=40.0,
            phosphorus=14.0,
            potassium=160.0
        )
    ]
    db.add_all(sensors)
    db.commit()

    # Create Crops
    crops = [
        models.Crop(
            crop_id="soft_wheat",
            crop_name="القمح اللين",
            crop_name_ar="القمح الطري",
            suitability_score=92,
            suitability_level="ممتاز",
            profitability="عالية",
            expected_yield_tons_per_hectare=5.2
        ),
        models.Crop(
            crop_id="tomato",
            crop_name="الطماطم",
            crop_name_ar="الطماطم",
            suitability_score=82,
            suitability_level="جيد",
            profitability="عالية جداً",
            expected_yield_tons_per_hectare=45.0
        )
    ]
    db.add_all(crops)
    db.commit()

    db.close()
    print("Database seeded successfully.")

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=engine)
    seed_database()
