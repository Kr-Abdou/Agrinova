from sqlalchemy import Boolean, Column, Float, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Farm(Base):
    __tablename__ = "farms"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    region = Column(String)
    hectares = Column(Float)
    owner = Column(String)
    subscription_tier = Column(String)
    currency = Column(String)
    
    zones = relationship("Zone", back_populates="farm")
    sensors = relationship("Sensor", back_populates="farm")

class Zone(Base):
    __tablename__ = "zones"
    id = Column(String, primary_key=True, index=True)
    farm_id = Column(String, ForeignKey("farms.id"))
    name = Column(String)
    name_fr = Column(String)
    color = Column(String)
    color_name = Column(String)
    hectares = Column(Float)
    health_score = Column(Float)
    status = Column(String)
    
    farm = relationship("Farm", back_populates="zones")

class Sensor(Base):
    __tablename__ = "sensors"
    id = Column(String, primary_key=True, index=True)
    farm_id = Column(String, ForeignKey("farms.id"))
    zone_id = Column(String, ForeignKey("zones.id"), nullable=True)
    type = Column(String)
    name = Column(String)
    health_score = Column(Float)
    status = Column(String)
    battery_percent = Column(Float)
    
    # Readings
    ph = Column(Float)
    ec = Column(Float)
    moisture = Column(Float)
    temperature = Column(Float)
    nitrogen = Column(Float)
    phosphorus = Column(Float)
    potassium = Column(Float)
    
    farm = relationship("Farm", back_populates="sensors")

class Crop(Base):
    __tablename__ = "crops"
    crop_id = Column(String, primary_key=True, index=True)
    crop_name = Column(String)
    crop_name_ar = Column(String)
    suitability_score = Column(Integer)
    suitability_level = Column(String)
    profitability = Column(String)
    expected_yield_tons_per_hectare = Column(Float)
