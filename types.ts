export interface SensorReadings {
  nitrogen_mg_per_kg?: number;
  phosphorus_mg_per_kg?: number;
  potassium_mg_per_kg?: number;
  moisture_percent: number; // Kept for backward compatibility (usually surface)
  moisture_surface_percent?: number;
  moisture_deep_percent?: number;
  pH: number;
  EC_dS_per_m?: number;
  temperature_celsius: number;
  timestamp?: string;
  organicMatter?: number; 
}

export interface SensorTrend {
  nitrogen?: number[];
  phosphorus?: number[];
  potassium?: number[];
  moisture?: number[];
  pH?: number[];
  EC_dS_per_m?: number[];
  dates?: string[];
}

export interface SoilTypeSummary {
  soil_type: string;
  suitability: {
    fruits_percent: number;
    vegetables_percent: number;
    grains_percent: number;
  };
  health_indicator: 'good' | 'medium' | 'poor';
}

export interface FertilityEstimates {
  organic_matter_percent?: number; 
  organic_matter_category: string; 
  fertility_score_percent: number;
}

export interface SoilStructure {
  compaction_category: string; 
  interpretation: string;
}

export interface Sensor {
  id: string;
  type: 'Multi-Sensor' | 'NPK' | 'EC' | 'pH' | 'Moisture'; 
  name: string;
  zone: string;
  coordinates: { lat: number; lng: number };
  radius_meters: number;
  health_score: number;
  status: 'healthy' | 'caution' | 'critical' | 'offline' | 'active' | 'warning' | 'error';
  readings: SensorReadings;
  battery_percent: number;
  signal_strength_dbm?: number;
  last_sync?: string;
  trend_7day?: SensorTrend;
  alerts?: Alert[];
  location?: string;
  data?: SensorReadings;
  lastReading?: string;
  deployment_date?: string;
  calibration_last?: string;
  calibration_next_due?: string;
  soil_type_summary?: SoilTypeSummary;
  fertility_estimates?: FertilityEstimates;
  structure?: SoilStructure;
}

export interface Alert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description?: string;
  message?: string;
  zone?: string;
  timestamp?: string;
  action_link?: string;
  sensorId?: string;
  action?: string; 
  action_label?: string; 
}

export interface DetailedSensorReading extends SensorReadings {
  nitrogen_target_min?: number;
  nitrogen_target_max?: number;
  nitrogen_status?: string;
  phosphorus_target_min?: number;
  phosphorus_target_max?: number;
  phosphorus_status?: string;
  potassium_target_min?: number;
  potassium_target_max?: number;
  potassium_status?: string;
  moisture_target_min?: number;
  moisture_target_max?: number;
  moisture_status?: string;
  pH_target_min?: number;
  pH_target_max?: number;
  pH_status?: string;
  EC_target_min?: number;
  EC_target_max?: number;
  EC_status?: string;
}

// New Detailed Zone Interface
export interface Zone {
  id: string;
  name: string;
  name_fr: string;
  color: string;
  color_name: string;
  hectares: number;
  coordinates: {
    polygon: [number, number][]; // Array of [lat, lng]
  };
  health_score: number;
  status: string;
  soil_foundation: {
    soil_type: string;
    texture: string;
    pH: number;
    pH_category: string;
    pH_status: string;
    EC_dS_per_m: number;
    EC_category: string;
    EC_status: string;
    organic_matter_percent: number;
    organic_matter_category: string;
    compaction_category: string;
    compaction_interpretation: string;
  };
  water_resources: {
    moisture_surface_percent: number;
    moisture_surface_category: string;
    moisture_deep_percent: number;
    moisture_deep_category: string;
    drainage_classification: string;
    infiltration_rate_mm_per_hour: number;
    infiltration_interpretation: string;
    irrigation_frequency_days: number;
    irrigation_amount_mm: number;
    irrigation_method: string;
  };
  macronutrients: {
    nitrogen_current_mg_per_kg: number;
    nitrogen_target_mg_per_kg: number;
    nitrogen_deficit_mg_per_kg: number;
    nitrogen_status: string;
    phosphorus_current_mg_per_kg: number;
    phosphorus_target_mg_per_kg: number;
    phosphorus_deficit_mg_per_kg: number;
    phosphorus_status: string;
    potassium_current_mg_per_kg: number;
    potassium_target_mg_per_kg: number;
    potassium_excess_mg_per_kg: number;
    potassium_status: string;
  };
  secondary_nutrients: {
    calcium_mg_per_kg: number;
    calcium_target_mg_per_kg: number;
    calcium_status: string;
    magnesium_mg_per_kg: number;
    magnesium_target_mg_per_kg: number;
    magnesium_status: string;
    sulfur_mg_per_kg: number;
    sulfur_target_mg_per_kg: number;
    sulfur_status?: string;
    sulfur_deficit_mg_per_kg?: number;
  };
  micronutrients: {
    boron_mg_per_kg: number;
    boron_target_mg_per_kg: number;
    boron_deficit_mg_per_kg?: number;
    boron_status: string;
    copper_mg_per_kg: number;
    copper_target_mg_per_kg: number;
    copper_deficit_mg_per_kg?: number;
    copper_status: string;
    iron_mg_per_kg: number;
    iron_target_mg_per_kg: number;
    iron_deficit_mg_per_kg?: number;
    iron_status: string;
    manganese_mg_per_kg: number;
    manganese_target_mg_per_kg: number;
    manganese_deficit_mg_per_kg?: number;
    manganese_status: string;
    zinc_mg_per_kg: number;
    zinc_target_mg_per_kg: number;
    zinc_deficit_mg_per_kg?: number;
    zinc_status: string;
  };
  recommended_amendments: {
    mineral_fertilizers: any[];
    micronutrient_supplements: any[];
    organic_matter_amendments: any[];
    bio_products: any[];
  };
  action_plan: string[];
  zone_summary_notes: string;
}

export interface FarmData {
  farm: {
    id: string;
    name: string;
    location: string;
    region: string;
    hectares: number;
    owner: string;
    subscription_tier: string;
    currency: string;
  };
  overview: {
    overall_health_score: number;
    overall_status: string;
    active_alerts_count: number;
    next_action: string;
    last_update: string;
  };
  weather: {
    current_temp_c: number;
    humidity_percent: number;
    rainfall_forecast_mm: number;
    forecast_3day: Array<{
      date: string;
      temp_high: number;
      temp_low: number;
      rain_mm: number;
    }>;
  };
  sensors: Sensor[];
  alerts: Alert[];
  zones: Zone[]; // Updated to detailed Zone interface
}

export interface CropData {
  rank: number;
  crop_id: string;
  crop_name: string;
  crop_name_ar: string;
  image_url: string;
  suitability_score: number;
  suitability_level: string;
  profitability: string;
  market_price_dzd_per_kg?: number;
  market_price_dzd_per_liter_oil?: number;
  water_requirements: string;
  growing_season_days: number;
  expected_yield_tons_per_hectare?: number;
  expected_yield_liters_oil_per_hectare?: number;
  expected_yield_tons_per_hectare_fruit?: number;
  disease_susceptibilities: string[];
  notes: string;
  recommended_variety?: string;
  planting_window_start?: string;
  planting_window_end?: string;
  harvest_window_start?: string;
  harvest_window_end?: string;
  regional_suppliers?: string[];
}

export interface SoilAnalysisSummary {
    zone_id: string;
    soil_type: string;
    classification_confidence: number;
    usda_taxonomy: string;
    pH: number;
    organic_matter_percent: number;
    drainage: string;
}

export interface NutrientComparison {
  nutrient: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  status: 'deficit' | 'optimal' | 'excess' | 'low';
  diff: number;
}

export interface FertilizerRecommendation {
  rank: number;
  type: string;
  quantity_kg: number;
  cost_per_kg_dzd: number;
  total_cost_dzd: number;
  total_cost_usd: number;
  supplier: string;
  application_method: string;
  application_day: number;
  notes: string;
}

export interface ApplicationScheduleItem {
  day: number;
  action: string;
  fertilizer_type: string;
  quantity_kg: number;
  instructions: string;
}

export interface NutrientOptimizationData {
  farm_id: string;
  zone_id: string;
  crop_id: string;
  farm_size_hectares: number;
  current_nutrients: Record<string, number>;
  target_nutrients: Record<string, number>;
  optimization_plan: {
    total_cost_dzd: number;
    total_cost_usd: number;
    estimated_yield_increase_percent: number;
    soil_health_impact: string;
    fertilizers: FertilizerRecommendation[];
    application_schedule: ApplicationScheduleItem[];
    roi_x: number;
    payback_days: number;
  };
  farm_baseline_scenario: {
    baseline_yield_tons_per_hectare: number;
    baseline_yield_total_tons: number;
    market_price_dzd_per_kg: number;
    market_price_usd_per_ton: number;
    baseline_revenue_dzd: number;
    baseline_revenue_usd: number;
  };
  farm_optimized_scenario: {
    optimized_yield_tons_per_hectare: number;
    optimized_yield_total_tons: number;
    revenue_dzd: number;
    revenue_usd: number;
    extra_profit_dzd: number;
    extra_profit_usd: number;
    optimization_cost_dzd: number;
    optimization_cost_usd: number;
    net_gain_dzd: number;
    net_gain_usd: number;
  };
}

export interface PreventionAction {
  day: number;
  action_id?: string;
  action_name_fr: string;
  action_name_en?: string;
  description_fr?: string;
  description_en?: string;
  product_name?: string;
  product_name_local?: string;
  product_code?: string;
  quantity_liters?: number;
  cost_per_liter_dzd?: number;
  cost_per_liter_usd?: number;
  total_cost_dzd?: number;
  total_cost_usd?: number;
  cost_per_hectare_dzd?: number;
  cost_per_hectare_usd?: number;
  supplier?: string;
  supplier_contact?: string;
  application_method?: string;
  coverage_hectares?: number;
  instructions_fr?: string;
  instructions_en?: string;
  safety_period_days?: number;
  application_notes?: string;
  cost_dzd?: number;
}

export interface DiseaseRiskDetail {
  rank: number;
  disease_id: string;
  disease_name_fr: string;
  disease_name_en: string;
  disease_name_ar?: string;
  image_url?: string;
  risk_level: 'HAUT' | 'MOYEN' | 'FAIBLE';
  risk_score: number;
  confidence_percent: number;
  trigger_factors?: string[];
  weather_triggers?: any;
  critical_window?: any;
  prevention_actions?: PreventionAction[];
  total_prevention_cost_dzd?: number;
  total_prevention_cost_usd?: number;
  historical_occurrence?: boolean;
}

export interface DiseasePredictionData {
  farm_id: string;
  zone_id: string;
  crop_id: string;
  crop_name: string;
  farm_size_hectares: number;
  forecast_date: string;
  forecast_days: number;
  overall_disease_risk: string;
  disease_risks: DiseaseRiskDetail[];
  disease_history: Array<{
    date: string;
    disease_fr: string;
    disease_en: string;
    severity: string;
    treatment_fr: string;
    treatment_en: string;
    recovered: boolean;
    yield_impact_percent: number;
  }>;
  general_recommendations_fr: string[];
  local_fungicide_suppliers: Array<{
    name: string;
    phone: string;
    email: string;
    region: string;
  }>;
}

export interface YieldScenario {
  scenario_name: string;
  scenario_name_en: string;
  estimated_yield_tons_per_hectare: number;
  total_yield_tons: number;
  market_price_dzd_per_kg: number;
  market_price_usd_per_ton: number;
  total_revenue_dzd: number;
  total_revenue_usd: number;
  optimization_cost_dzd?: number;
  optimization_cost_usd?: number;
  net_profit_dzd?: number;
  net_profit_usd?: number;
  roi_x?: number;
  assumptions: string;
}

export interface YieldData {
  farm_id: string;
  zone_id: string;
  crop_id: string;
  crop_name: string;
  farm_size_hectares: number;
  region: string;
  scenarios: {
    baseline: YieldScenario;
    optimized: YieldScenario;
  };
  yield_improvement: {
    absolute_tons_per_hectare: number;
    percentage: number;
    absolute_tons_farm: number;
  };
  financial_impact: {
    extra_revenue_dzd: number;
    extra_revenue_usd: number;
    optimization_cost_dzd: number;
    optimization_cost_usd: number;
    net_gain_dzd: number;
    net_gain_usd: number;
    payback_period_days: number;
    payback_period_hours: number;
  };
  soil_health_projection_5year: {
    years: number[];
    current_practice_score: number[];
    optimized_practice_score: number[];
    cumulative_extra_profit_dzd: number[];
    cumulative_extra_profit_usd: number[];
  };
  key_insights: Array<{
    insight_fr: string;
    insight_en: string;
    insight_ar: string;
  }>;
}

export interface ReportItem {
  report_id: string;
  report_type: string;
  report_name_fr: string;
  report_name_en: string;
  description_fr: string;
  generated_date: string;
  last_modified?: string;
  content_sections: string[];
  available_formats: string[];
}

export interface ArchivedReport {
  report_id: string;
  name: string;
  report_type?: string;
  generated_date: string;
  format: string;
  file_size_mb: number;
  download_url: string;
  created_by?: string;
}

export interface ReportData {
  farm_id: string;
  farm_name: string;
  reports_available: ReportItem[];
  report_archive: ArchivedReport[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  language: string;
  timezone: string;
  units: string;
  preferred_notification_time: string;
}

export interface FarmSettings {
  id: string;
  name: string;
  location: { lat: number; lng: number; region: string };
  size_hectares: number;
  farm_type: string;
  crops: string[];
  owner: string;
  owner_contact: string;
  owner_phone: string;
}

export interface NotificationSettings {
  push_enabled: boolean;
  email_enabled: boolean;
  sms_enabled: boolean;
  disease_risk_alerts: boolean;
  nutrient_deficiency_alerts: boolean;
  sensor_offline_alerts: boolean;
  recommendation_pending_alerts: boolean;
  market_price_alerts: boolean;
  quiet_hours_enabled: boolean;
  preferred_time: string;
}

export interface SubscriptionDetails {
  plan: string;
  sensor_limit: number;
  farm_limit: number;
  sensors_used: number;
  farms_used: number;
  billing_cycle: string;
  renewal_date: string;
  cost_per_month_dzd: number;
  cost_per_month_usd: number;
  status: string;
  payment_method: string;
}

export interface ConnectedSensor {
  sensor_id: string;
  type: string;
  name: string;
  zone: string;
  status: string;
  battery_percent: number;
  signal_strength: number;
  last_sync: string;
  paired_date: string;
}

export interface BillingHistoryItem {
  date: string;
  amount_dzd: number;
  amount_usd: number;
  status: string;
}

export interface SettingsData {
  user_id: string;
  user: UserProfile;
  farm: FarmSettings;
  notifications: NotificationSettings;
  subscription: SubscriptionDetails;
  connected_sensors: ConnectedSensor[];
  billing_history: BillingHistoryItem[];
}

// For Gemini Service Compatibility (Legacy)
export interface SoilData extends SensorReadings {}
export interface CropRecommendation {
  cropName: string;
  matchScore: number;
  reasoning: string;
  requirements: string;
}
export interface NutrientPlan {
  deficiency: string;
  recommendation: string;
  applicationMethod: string;
  estimatedCost: string;
}
export interface DiseaseRisk {
  diseaseName: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  probability: number;
  prevention: string;
}
