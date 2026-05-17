import { FarmData, Sensor, Alert, CropData, SoilAnalysisSummary, DetailedSensorReading, NutrientOptimizationData, DiseasePredictionData, YieldData, ReportData, SettingsData } from '../types';

export const farmData: FarmData = {
  farm: {
    id: "FARM-ALG-001",
    name: "Ferme Beni Messi",
    location: "Médéa, Algeria",
    region: "Kabylie",
    hectares: 45,
    owner: "Ahmed Beldjilali",
    subscription_tier: "Pro",
    currency: "DZD"
  },
  overview: {
    overall_health_score: 78,
    overall_status: "صحي",
    active_alerts_count: 2,
    next_action: "نثر الأسمدة خلال 3 أيام",
    last_update: "2025-12-11T19:15:00Z"
  },
  weather: {
    current_temp_c: 22,
    humidity_percent: 65,
    rainfall_forecast_mm: 10,
    forecast_3day: [
      { "date": "2025-12-12", "temp_high": 24, "temp_low": 18, "rain_mm": 5 },
      { "date": "2025-12-13", "temp_high": 26, "temp_low": 20, "rain_mm": 0 },
      { "date": "2025-12-14", "temp_high": 25, "temp_low": 19, "rain_mm": 2 }
    ]
  },
  sensors: [
    {
      id: "S-001",
      type: "Multi-Sensor",
      name: "مستشعر التربة - الحقل الشمالي",
      zone: "Champ Nord",
      coordinates: { lat: 36.4028, lng: 2.8527 },
      radius_meters: 50,
      health_score: 82,
      status: "healthy",
      last_sync: "2025-12-11T19:15:00Z",
      battery_percent: 95,
      readings: {
        pH: 6.8,
        EC_dS_per_m: 1.2,
        moisture_percent: 28, // Backward compat
        moisture_surface_percent: 28,
        moisture_deep_percent: 35,
        temperature_celsius: 22,
        nitrogen_mg_per_kg: 45,
        phosphorus_mg_per_kg: 12,
        potassium_mg_per_kg: 180
      },
      get data() { return this.readings; }, // Compat getter
      soil_type_summary: {
        soil_type: "كلسي (Calcaire)",
        suitability: {
          fruits_percent: 76,
          vegetables_percent: 82,
          grains_percent: 88
        },
        health_indicator: "good"
      },
      fertility_estimates: {
        organic_matter_percent: 2.5,
        organic_matter_category: "معتدلة (~2.5%)",
        fertility_score_percent: 72
      },
      structure: {
        compaction_category: "medium",
        interpretation: "متوازن (Équilibré)"
      },
      alerts: [
        {
          id: "ALT-001",
          severity: "high",
          type: "nutrient_deficiency",
          title: "الفوسفور منخفض جداً",
          description: "الفوسفور: 12 ملغ/كغ (المستهدف: 15-25). خطر على نمو الجذور.",
          message: "الفوسفور: 12 ملغ/كغ (المستهدف: 15-25). خطر على نمو الجذور.",
          action_label: "تحسين",
          action_link: "/nutrients",
          action: "أضف سماد الفوسفور"
        }
      ]
    },
    {
      id: "S-002",
      type: "Multi-Sensor",
      name: "مستشعر التربة - الحقل الجنوبي",
      zone: "Champ Sud",
      coordinates: { lat: 36.3995, lng: 2.8412 },
      radius_meters: 60,
      health_score: 65,
      status: "caution",
      last_sync: "2025-12-11T19:10:00Z",
      battery_percent: 62,
      readings: {
        pH: 7.2,
        EC_dS_per_m: 2.8,
        moisture_percent: 32, // Backward compat
        moisture_surface_percent: 32,
        moisture_deep_percent: 38,
        temperature_celsius: 20,
        nitrogen_mg_per_kg: 40,
        phosphorus_mg_per_kg: 14,
        potassium_mg_per_kg: 160
      },
      get data() { return this.readings; }, // Compat getter
      soil_type_summary: {
        soil_type: "طينية (Argile)",
        suitability: {
          fruits_percent: 60,
          vegetables_percent: 68,
          grains_percent: 72
        },
        health_indicator: "medium"
      },
      fertility_estimates: {
        organic_matter_percent: 1.8,
        organic_matter_category: "منخفضة",
        fertility_score_percent: 58
      },
      structure: {
        compaction_category: "high",
        interpretation: "مضغوطة (Compacté)"
      },
      alerts: []
    }
  ],
  alerts: [
    {
      id: "ALT-001",
      severity: "high",
      type: "nutrient_deficiency",
      title: "الفوسفور منخفض جداً",
      description: "الفوسفور: 12 ملغ/كغ (المستهدف: 15-25). خطر على نمو الجذور.",
      message: "الفوسفور: 12 ملغ/كغ (المستهدف: 15-25). خطر على نمو الجذور.",
      zone: "Champ Nord",
      timestamp: "2025-12-11T18:45:00Z",
      action_link: "/nutrients",
      action: "تطبيق التسميد"
    }
  ],
  zones: [
    {
      id: "Z-001",
      name: "الحقل الشمالي",
      name_fr: "Champ Nord",
      color: "#3b82f6",
      color_name: "blue",
      hectares: 15,
      coordinates: {
        polygon: [
          [36.41, 2.84],
          [36.41, 2.86],
          [36.40, 2.86],
          [36.40, 2.84]
        ]
      },
      health_score: 82,
      status: "healthy",
      soil_foundation: {
        soil_type: "Calcaire",
        texture: "Limon argileux",
        pH: 6.8,
        pH_category: "Neutre",
        pH_status: "optimal",
        EC_dS_per_m: 1.2,
        EC_category: "Normal",
        EC_status: "optimal",
        organic_matter_percent: 2.5,
        organic_matter_category: "Modéré",
        compaction_category: "Moyen",
        compaction_interpretation: "Équilibré"
      },
      water_resources: {
        moisture_surface_percent: 28,
        moisture_surface_category: "Optimal",
        moisture_deep_percent: 35,
        moisture_deep_category: "Optimal",
        drainage_classification: "Good",
        infiltration_rate_mm_per_hour: 15,
        infiltration_interpretation: "Bon",
        irrigation_frequency_days: 5,
        irrigation_amount_mm: 25,
        irrigation_method: "Irrigation goutte-à-goutte recommandée"
      },
      macronutrients: {
        nitrogen_current_mg_per_kg: 45,
        nitrogen_target_mg_per_kg: 60,
        nitrogen_deficit_mg_per_kg: 15,
        nitrogen_status: "low",
        phosphorus_current_mg_per_kg: 12,
        phosphorus_target_mg_per_kg: 25,
        phosphorus_deficit_mg_per_kg: 13,
        phosphorus_status: "critical",
        potassium_current_mg_per_kg: 180,
        potassium_target_mg_per_kg: 150,
        potassium_excess_mg_per_kg: 30,
        potassium_status: "high"
      },
      secondary_nutrients: {
        calcium_mg_per_kg: 2000,
        calcium_target_mg_per_kg: 1500,
        calcium_status: "high",
        magnesium_mg_per_kg: 50,
        magnesium_target_mg_per_kg: 40,
        magnesium_status: "optimal",
        sulfur_mg_per_kg: 18,
        sulfur_target_mg_per_kg: 20,
        sulfur_deficit_mg_per_kg: 2,
        sulfur_status: "low"
      },
      micronutrients: {
        boron_mg_per_kg: 0.5,
        boron_target_mg_per_kg: 1.0,
        boron_deficit_mg_per_kg: 0.5,
        boron_status: "low",
        copper_mg_per_kg: 0.8,
        copper_target_mg_per_kg: 1.2,
        copper_deficit_mg_per_kg: 0.4,
        copper_status: "low",
        iron_mg_per_kg: 50,
        iron_target_mg_per_kg: 60,
        iron_deficit_mg_per_kg: 10,
        iron_status: "low",
        manganese_mg_per_kg: 10,
        manganese_target_mg_per_kg: 15,
        manganese_deficit_mg_per_kg: 5,
        manganese_status: "low",
        zinc_mg_per_kg: 3,
        zinc_target_mg_per_kg: 5,
        zinc_deficit_mg_per_kg: 2,
        zinc_status: "low"
      },
      recommended_amendments: {
        mineral_fertilizers: [
          {
            id: "FERT-001",
            type: "NPK 15:10:20",
            dose_per_hectare_kg: 33.3,
            total_dose_for_zone_kg: 500,
            price_per_kg_dzd: 35,
            total_cost_dzd: 17500,
            application_day: 1,
            notes: "انثر بشكل متساوٍ، وادمج في التربة خلال 24 ساعة"
          },
          {
            id: "FERT-002",
            type: "Engrais P (Phosphaté)",
            dose_per_hectare_kg: 6.7,
            total_dose_for_zone_kg: 100,
            price_per_kg_dzd: 45,
            total_cost_dzd: 4500,
            application_day: 3,
            notes: "الفوسفور حرج – أولوية قصوى"
          }
        ],
        micronutrient_supplements: [
          {
            id: "MICRO-001",
            type: "Micro-éléments (B, Cu, Fe, Mn, Zn)",
            dose_per_hectare_kg: 2.0,
            total_dose_for_zone_kg: 30,
            price_per_kg_dzd: 120,
            total_cost_dzd: 3600,
            application_method: "Foliar spray",
            application_day: 15,
            notes: "الرش عند شروق الشمس أو غروبها"
          }
        ],
        organic_matter_amendments: [
          {
            id: "ORGANIC-001",
            type: "Compost bien décomposé",
            recommended_rate_tonnes_per_hectare: 7.5,
            total_for_zone_tonnes: 112.5,
            price_per_tonne_dzd: 3000,
            total_cost_dzd: 337500,
            application_timing: "Before planting or incorporation",
            benefits: "يزيد المادة العضوية، يحسن البنية والصرف"
          }
        ],
        bio_products: [
          {
            id: "BIO-001",
            type: "Bio-stimulant racinaire",
            dose_per_hectare_liters: 2,
            total_for_zone_liters: 30,
            price_per_liter_dzd: 600,
            total_cost_dzd: 18000,
            application_method: "Soil drench or foliar",
            application_day: 10,
            notes: "يحسن الامتصاص ومقاومة الإجهاد"
          }
        ]
      },
      action_plan: [
        "أولوية: تطبيق سماد الفوسفات (P) خلال 7 أيام. الفوسفور حرج.",
        "تطبيق العناصر الصغرى عن طريق الرش الورقي (اليوم 15). تم الكشف عن نقص متعدد.",
        "دمج السماد العضوي لزيادة المادة العضوية (حالياً: 2.5%، الهدف: >3.5%).",
        "المراقبة: اختبار درجة الحموضة (pH) خلال 30 يومًا. الكالسيوم مرتفع – ضع في اعتبارك إضافة الكبريت.",
        "الري: الحفاظ على المعدل الحالي. الصرف جيد. مراقبة الملوحة (EC)."
      ],
      zone_summary_notes: "المنطقة صحية بشكل عام (82%) ولكن هناك نقص كبير في الفوسفور والعناصر الصغرى. المادة العضوية غير كافية لتربة المدية الطينية."
    },
    {
      id: "Z-002",
      name: "الحقل الجنوبي",
      name_fr: "Champ Sud",
      color: "#f97316",
      color_name: "orange",
      hectares: 18,
      coordinates: {
        polygon: [
          [36.40, 2.84],
          [36.40, 2.86],
          [36.39, 2.86],
          [36.39, 2.84]
        ]
      },
      health_score: 65,
      status: "caution",
      soil_foundation: {
        soil_type: "Argile",
        texture: "Argile compacte",
        pH: 7.2,
        pH_category: "Légèrement alcalin",
        pH_status: "caution",
        EC_dS_per_m: 2.8,
        EC_category: "Salin",
        EC_status: "critical",
        organic_matter_percent: 1.8,
        organic_matter_category: "Faible",
        compaction_category: "Élevé",
        compaction_interpretation: "Compacté – Risque pour racines"
      },
      water_resources: {
        moisture_surface_percent: 32,
        moisture_surface_category: "Optimal",
        moisture_deep_percent: 38,
        moisture_deep_category: "Mouillé",
        drainage_classification: "Poor",
        infiltration_rate_mm_per_hour: 5,
        infiltration_interpretation: "Lent – Risque engorgement",
        irrigation_frequency_days: 7,
        irrigation_amount_mm: 15,
        irrigation_method: "Réduire irrigation, améliorer drainage"
      },
      macronutrients: {
        nitrogen_current_mg_per_kg: 40,
        nitrogen_target_mg_per_kg: 60,
        nitrogen_deficit_mg_per_kg: 20,
        nitrogen_status: "low",
        phosphorus_current_mg_per_kg: 14,
        phosphorus_target_mg_per_kg: 25,
        phosphorus_deficit_mg_per_kg: 11,
        phosphorus_status: "low",
        potassium_current_mg_per_kg: 160,
        potassium_target_mg_per_kg: 150,
        potassium_excess_mg_per_kg: 10,
        potassium_status: "optimal"
      },
      secondary_nutrients: {
        calcium_mg_per_kg: 2200,
        calcium_target_mg_per_kg: 1500,
        calcium_status: "high",
        magnesium_mg_per_kg: 60,
        magnesium_target_mg_per_kg: 40,
        magnesium_status: "high",
        sulfur_mg_per_kg: 25,
        sulfur_target_mg_per_kg: 20,
        sulfur_status: "high"
      },
      micronutrients: {
        boron_mg_per_kg: 0.3,
        boron_target_mg_per_kg: 1.0,
        boron_deficit_mg_per_kg: 0.7,
        boron_status: "critical",
        copper_mg_per_kg: 0.6,
        copper_target_mg_per_kg: 1.2,
        copper_deficit_mg_per_kg: 0.6,
        copper_status: "low",
        iron_mg_per_kg: 40,
        iron_target_mg_per_kg: 60,
        iron_deficit_mg_per_kg: 20,
        iron_status: "low",
        manganese_mg_per_kg: 8,
        manganese_target_mg_per_kg: 15,
        manganese_deficit_mg_per_kg: 7,
        manganese_status: "low",
        zinc_mg_per_kg: 2,
        zinc_target_mg_per_kg: 5,
        zinc_deficit_mg_per_kg: 3,
        zinc_status: "critical"
      },
      recommended_amendments: {
        mineral_fertilizers: [
          {
            id: "FERT-003",
            type: "Urea (Engrais N)",
            dose_per_hectare_kg: 11.1,
            total_dose_for_zone_kg: 200,
            price_per_kg_dzd: 40,
            total_cost_dzd: 8000,
            application_day: 1,
            notes: "النيتروجين غير كافٍ. التطبيق السريع ضروري."
          }
        ],
        micronutrient_supplements: [
          {
            id: "MICRO-002",
            type: "Boron + Zinc (Carences críticas)",
            dose_per_hectare_kg: 3.0,
            total_dose_for_zone_kg: 54,
            price_per_kg_dzd: 150,
            total_cost_dzd: 8100,
            application_method: "Foliar spray + soil drench",
            application_day: 5,
            notes: "البورون والزنك حرجان – تدخل عاجل"
          }
        ],
        organic_matter_amendments: [
          {
            id: "ORGANIC-002",
            type: "Fumier bien décomposé",
            recommended_rate_tonnes_per_hectare: 10,
            total_for_zone_tonnes: 180,
            price_per_tonne_dzd: 2500,
            total_cost_dzd: 450000,
            application_timing: "Before planting or mid-season incorporation",
            benefits: "يزيد المادة العضوية (الهدف: 3-4%)، يحسن البنية، ويخفف الانضغاط"
          }
        ],
        bio_products: [
          {
            id: "BIO-002",
            type: "Inoculant microbien + Activateur biologique",
            dose_per_hectare_liters: 2.5,
            total_for_zone_liters: 45,
            price_per_liter_dzd: 700,
            total_cost_dzd: 31500,
            application_method: "Soil drench",
            application_day: 7,
            notes: "يحسن بيولوجيا التربة، يفكك الانضغاط، ويحسن البنية"
          },
          {
            id: "BIO-003",
            type: "Correcteur de pH (Soufre élémentaire)",
            dose_per_hectare_kg: 0.5,
            total_for_zone_kg: 9,
            price_per_kg_dzd: 200,
            total_cost_dzd: 1800,
            application_timing: "Before planting incorporation",
            notes: "يقلل درجة الحموضة القلوية، ويحسن توافر العناصر الصغرى"
          }
        ]
      },
      action_plan: [
        "عاجل: تطبيق البورون والزنك عن طريق الرش + التربة. نقص حاد (B: 0.3, Zn: 2 mg/kg).",
        "تقليل الري بنسبة 20–30%. المنطقة رطبة جداً (العمق: 38%). تحسين الصرف أو تركيب مصارف.",
        "دمج 10 طن/هكتار من السماد الطبيعي لتفكيك التربة المضغوطة (حالياً: مرتفع). هدف المادة العضوية: >3%.",
        "تطبيق لقاح ميكروبي لتحسين البنية بيولوجياً.",
        "التفكير في استخدام الكبريت الأولي لتصحيح القلوية (pH 7.2 → 6.8–7.0).",
        "المراقبة: الملوحة (EC: 2.8). يوصى باختبار شهري."
      ],
      zone_summary_notes: "منطقة بها مشاكل (65%). ملوحة عالية، انضغاط كبير، نقص متعدد (خاصة البورون والزنك)، مادة عضوية غير كافية. تتطلب تدخلات كبيرة."
    },
    {
      id: "Z-003",
      name: "البستان",
      name_fr: "Verger",
      color: "#10b981",
      color_name: "green",
      hectares: 12,
      coordinates: {
        polygon: [
          [36.41, 2.85],
          [36.41, 2.87],
          [36.405, 2.87],
          [36.405, 2.85]
        ]
      },
      health_score: 88,
      status: "healthy",
      soil_foundation: {
        soil_type: "Loam",
        texture: "Loam équilibré",
        pH: 6.5,
        pH_category: "Légèrement acide",
        pH_status: "optimal",
        EC_dS_per_m: 1.0,
        EC_category: "Normal",
        EC_status: "optimal",
        organic_matter_percent: 3.8,
        organic_matter_category: "Bonne",
        compaction_category: "Faible",
        compaction_interpretation: "Meuble – Idéal pour racines"
      },
      water_resources: {
        moisture_surface_percent: 30,
        moisture_surface_category: "Optimal",
        moisture_deep_percent: 36,
        moisture_deep_category: "Optimal",
        drainage_classification: "Excellent",
        infiltration_rate_mm_per_hour: 25,
        infiltration_interpretation: "Excellent – Drainage parfait",
        irrigation_frequency_days: 7,
        irrigation_amount_mm: 20,
        irrigation_method: "Irrigation goutte-à-goutte (optimal)"
      },
      macronutrients: {
        nitrogen_current_mg_per_kg: 55,
        nitrogen_target_mg_per_kg: 60,
        nitrogen_deficit_mg_per_kg: 5,
        nitrogen_status: "optimal",
        phosphorus_current_mg_per_kg: 22,
        phosphorus_target_mg_per_kg: 25,
        phosphorus_deficit_mg_per_kg: 3,
        phosphorus_status: "optimal",
        potassium_current_mg_per_kg: 190,
        potassium_target_mg_per_kg: 150,
        potassium_excess_mg_per_kg: 40,
        potassium_status: "high"
      },
      secondary_nutrients: {
        calcium_mg_per_kg: 1600,
        calcium_target_mg_per_kg: 1500,
        calcium_status: "optimal",
        magnesium_mg_per_kg: 45,
        magnesium_target_mg_per_kg: 40,
        magnesium_status: "optimal",
        sulfur_mg_per_kg: 22,
        sulfur_target_mg_per_kg: 20,
        sulfur_status: "optimal"
      },
      micronutrients: {
        boron_mg_per_kg: 1.2,
        boron_target_mg_per_kg: 1.0,
        boron_status: "optimal",
        copper_mg_per_kg: 1.5,
        copper_target_mg_per_kg: 1.2,
        copper_status: "optimal",
        iron_mg_per_kg: 65,
        iron_target_mg_per_kg: 60,
        iron_status: "optimal",
        manganese_mg_per_kg: 18,
        manganese_target_mg_per_kg: 15,
        manganese_status: "optimal",
        zinc_mg_per_kg: 5.5,
        zinc_target_mg_per_kg: 5,
        zinc_status: "optimal"
      },
      recommended_amendments: {
        mineral_fertilizers: [
          {
            id: "FERT-004",
            type: "NPK 10:10:10 (Maintenance)",
            dose_per_hectare_kg: 13.3,
            total_dose_for_zone_kg: 160,
            price_per_kg_dzd: 32,
            total_cost_dzd: 5120,
            application_day: 30,
            notes: "للصيانة فقط. NPK شبه مثالي."
          }
        ],
        micronutrient_supplements: [
          {
            id: "MICRO-003",
            type: "Micro-éléments équilibrés (formule entretien)",
            dose_per_hectare_kg: 1.5,
            total_dose_for_zone_kg: 18,
            price_per_kg_dzd: 110,
            total_cost_dzd: 1980,
            application_method: "Foliar spray",
            application_day: 45,
            notes: "للصيانة فقط. جميع العناصر الصغرى مثالية."
          }
        ],
        organic_matter_amendments: [
          {
            id: "ORGANIC-003",
            type: "Paillis organique (copeaux bois décomposé)",
            recommended_rate_tonnes_per_hectare: 3,
            total_for_zone_tonnes: 36,
            price_per_tonne_dzd: 1500,
            total_cost_dzd: 54000,
            application_timing: "Annual maintenance",
            benefits: "يحافظ على المادة العضوية، ينظم الحرارة/الرطوبة، ويكبح الأعشاب الضارة"
          }
        ],
        bio_products: []
      },
      action_plan: [
        "تدخلات قليلة ضرورية. منطقة ممتازة (88%).",
        "الصيانة: تطبيق NPK خفيف كل 30 يوماً (سماد + كمبوست).",
        "نشارة عضوية سنوية (3 طن/هكتار) للحفاظ على المادة العضوية والبنية.",
        "رش ورقي للعناصر الصغرى كل 45 يوماً (صيانة).",
        "الاستمرار في الري بالتنقيط الحالي. مثالي للبستان.",
        "المراقبة: اختبارات نصف سنوية. لم يتم الكشف عن أي طارئ."
      ],
      zone_summary_notes: "منطقة مثالية (88%). جميع العناصر الغذائية والموارد متوازنة. ممتاز للأشجار المثمرة. الصيانة البسيطة كافية."
    }
  ],
};

// Detailed sensor readings for the detail view (mocking NPK-001 specifically)
export const sensorDetailReadings: DetailedSensorReading = {
  nitrogen_mg_per_kg: 45,
  nitrogen_target_min: 40,
  nitrogen_target_max: 60,
  nitrogen_status: "optimal",
  phosphorus_mg_per_kg: 12,
  phosphorus_target_min: 15,
  phosphorus_target_max: 25,
  phosphorus_status: "low",
  potassium_mg_per_kg: 180,
  potassium_target_min: 150,
  potassium_target_max: 200,
  potassium_status: "optimal",
  moisture_percent: 28,
  moisture_target_min: 25,
  moisture_target_max: 35,
  moisture_status: "optimal",
  pH: 6.8,
  pH_target_min: 6.5,
  pH_target_max: 7.0,
  pH_status: "optimal",
  EC_dS_per_m: 1.2,
  EC_target_min: 0.8,
  EC_target_max: 1.8,
  EC_status: "optimal",
  temperature_celsius: 22,
  timestamp: "2025-12-11T19:15:00Z"
};

export const soilAnalysis: SoilAnalysisSummary = {
  zone_id: "Z1",
  soil_type: "كلسي",
  classification_confidence: 94,
  usda_taxonomy: "إنسيبتيسول",
  pH: 6.8,
  organic_matter_percent: 2.5,
  drainage: "متوسط"
};

export const cropRecommendations: CropData[] = [
  {
    rank: 1,
    crop_id: "soft_wheat",
    crop_name: "القمح اللين",
    crop_name_ar: "القمح الطري",
    image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400",
    suitability_score: 92,
    suitability_level: "ممتاز",
    profitability: "عالية",
    market_price_dzd_per_kg: 190,
    water_requirements: "متوسط (450–600 ملم)",
    growing_season_days: 150,
    expected_yield_tons_per_hectare: 5.2,
    disease_susceptibilities: ["لفحة السنابل الفيوزارية", "تبقع الأوراق السبتوري"],
    recommended_variety: "قمح صلب (هضبة 3، فيترون)",
    planting_window_start: "2025-10-15",
    planting_window_end: "2025-11-15",
    harvest_window_start: "2026-06-01",
    harvest_window_end: "2026-06-30",
    notes: "ممتاز للزراعة الجبلية. مقاوم للجفاف بشكل جيد. سعر مستقر.",
    regional_suppliers: ["الديوان الوطني للحبوب بالمدية", "تعاونية بني مسي"]
  },
  {
    rank: 2,
    crop_id: "barley",
    crop_name: "الشعير",
    crop_name_ar: "الشعير",
    image_url: "https://images.unsplash.com/photo-1437252611977-07f74518abd7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    suitability_score: 88,
    suitability_level: "جيد جداً",
    profitability: "عالية",
    market_price_dzd_per_kg: 170,
    water_requirements: "منخفض (350–450 ملم)",
    growing_season_days: 140,
    expected_yield_tons_per_hectare: 4.8,
    disease_susceptibilities: ["البياض الدقيقي", "صدأ الأوراق"],
    notes: "أكثر تحملاً للجفاف من القمح. طلب زراعي محلي (للأعلاف)."
  },
  {
    rank: 3,
    crop_id: "tomato",
    crop_name: "الطماطم",
    crop_name_ar: "الطماطم",
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
    suitability_score: 82,
    suitability_level: "جيد",
    profitability: "عالية جداً",
    market_price_dzd_per_kg: 40,
    water_requirements: "مرتفع (600–750 ملم)",
    growing_season_days: 120,
    expected_yield_tons_per_hectare: 45,
    disease_susceptibilities: ["اللفحة المتأخرة", "اللفحة المبكرة", "ذبول الفيوزاريوم"],
    notes: "طلب كبير في الأسواق المحلية. سعر مرتفع. يتطلب الري."
  },
  {
    rank: 4,
    crop_id: "citrus",
    crop_name: "الحمضيات",
    crop_name_ar: "الحمضيات",
    image_url: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    suitability_score: 78,
    suitability_level: "جيد",
    profitability: "عالية جداً",
    market_price_dzd_per_kg: 50,
    water_requirements: "متوسط (600–800 ملم/سنة)",
    growing_season_days: 365,
    expected_yield_tons_per_hectare: 35,
    disease_susceptibilities: ["تقرح الحمضيات", "التبقع البني"],
    notes: "محصول دائم، إنتاج مستقر. طلب قوي (عصير، سوق طازج)."
  },
  {
    rank: 5,
    crop_id: "olive",
    crop_name: "الزيتون",
    crop_name_ar: "الزيتون",
    image_url: "https://images.unsplash.com/photo-1612879988258-0d819c297621?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    suitability_score: 75,
    suitability_level: "جيد",
    profitability: "عالية",
    market_price_dzd_per_liter_oil: 250,
    water_requirements: "منخفض (400–500 ملم)",
    growing_season_days: 365,
    expected_yield_tons_per_hectare_fruit: 4,
    expected_yield_liters_oil_per_hectare: 800,
    disease_susceptibilities: ["ذبول الفرتيسيليوم", "عين الطاووس"],
    notes: "محصول ممتاز للمناخ المتوسطي. زيت الزيتون مطلوب بشدة."
  },
  {
    rank: 6,
    crop_id: "date_palm",
    crop_name: "نخيل التمر",
    crop_name_ar: "نخيل التمر",
    image_url: "https://cdn.britannica.com/24/162724-050-6C219853/Date-palm.jpg",
    suitability_score: 68,
    suitability_level: "مقبول",
    profitability: "عالية جداً",
    market_price_dzd_per_kg: 200,
    water_requirements: "منخفض (500–600 ملم)",
    growing_season_days: 365,
    expected_yield_tons_per_hectare: 18,
    disease_susceptibilities: ["البيوض", "سوسة النخيل الحمراء"],
    notes: "أفضل في المناطق القاحلة. إنتاجية وأسعار عالية جداً. استثمار أولي كبير."
  }
];

export const nutrientData: NutrientOptimizationData = {
  farm_id: "FARM-ALG-001",
  zone_id: "Z1",
  crop_id: "soft_wheat",
  farm_size_hectares: 45,
  current_nutrients: {
    nitrogen: 45,
    phosphorus: 12,
    potassium: 180,
    magnesium: 50,
    calcium: 2000,
    sulfur: 18,
    boron: 0.5,
    copper: 0.8,
    iron: 50,
    manganese: 10,
    zinc: 3
  },
  target_nutrients: {
    nitrogen: 60,
    phosphorus: 20,
    potassium: 150,
    magnesium: 40,
    calcium: 1500,
    sulfur: 20,
    boron: 1.0,
    copper: 1.2,
    iron: 60,
    manganese: 15,
    zinc: 5
  },
  optimization_plan: {
    total_cost_dzd: 41600,
    total_cost_usd: 310,
    estimated_yield_increase_percent: 15,
    soil_health_impact: "تحسن ملحوظ في توازن P/K",
    fertilizers: [
      {
        rank: 1,
        type: "DAP (18-46-0) ديامونيوم فوسفات",
        quantity_kg: 200,
        cost_per_kg_dzd: 140,
        total_cost_dzd: 28000,
        total_cost_usd: 210,
        supplier: "Asmidal / Fertial",
        application_method: "نثر قبل الزراعة",
        application_day: 1,
        notes: "سماد أساسي - مصدر عالي للفوسفور والنيتروجين"
      },
      {
        rank: 2,
        type: "Urea 46% (يوريا)",
        quantity_kg: 150,
        cost_per_kg_dzd: 60,
        total_cost_dzd: 9000,
        total_cost_usd: 68,
        supplier: "Sorfert / Local Coop",
        application_method: "نثر (تغطية)",
        application_day: 45,
        notes: "مصدر نيتروجين مركز للنمو الخضري"
      },
      {
        rank: 3,
        type: "SOP (0-0-50) سلفات البوتاس",
        quantity_kg: 40,
        cost_per_kg_dzd: 115,
        total_cost_dzd: 4600,
        total_cost_usd: 32,
        supplier: "Imported / Local Distributor",
        application_method: "ذوبان في الماء / رش",
        application_day: 60,
        notes: "لتحسين جودة الحبوب ومقاومة الأمراض"
      }
    ],
    application_schedule: [
      {
        day: 1,
        action: "التسميد الأساسي (DAP)",
        fertilizer_type: "DAP (18-46-0)",
        quantity_kg: 200,
        instructions: "ينثر ويخلط بالتربة قبل البذر مباشرة لضمان وصول الفوسفور للجذور."
      },
      {
        day: 45,
        action: "دفعة النيتروجين الأولى (Urea)",
        fertilizer_type: "Urea 46%",
        quantity_kg: 75,
        instructions: "تطبق في مرحلة التفرعات (Tillering). يفضل قبل المطر أو الري."
      },
      {
        day: 60,
        action: "دفعة النيتروجين الثانية + البوتاس",
        fertilizer_type: "Urea + SOP",
        quantity_kg: 115,
        instructions: "75 كغ يوريا + 40 كغ بوتاس. مرحلة الاستطالة لتعزيز السنابل."
      }
    ],
    roi_x: 18.2,
    payback_days: 5
  },
  farm_baseline_scenario: {
    baseline_yield_tons_per_hectare: 4.8,
    baseline_yield_total_tons: 216,
    market_price_dzd_per_kg: 190,
    market_price_usd_per_ton: 260,
    baseline_revenue_dzd: 41040000,
    baseline_revenue_usd: 328000
  },
  farm_optimized_scenario: {
    optimized_yield_tons_per_hectare: 5.6,
    optimized_yield_total_tons: 252,
    revenue_dzd: 47880000,
    revenue_usd: 382000,
    extra_profit_dzd: 6840000,
    extra_profit_usd: 54000,
    optimization_cost_dzd: 41600,
    optimization_cost_usd: 310,
    net_gain_dzd: 6798400,
    net_gain_usd: 53690
  }
};

export const diseaseData: DiseasePredictionData = {
  farm_id: "FARM-ALG-001",
  zone_id: "Z1",
  crop_id: "soft_wheat",
  crop_name: "القمح اللين",
  farm_size_hectares: 45,
  forecast_date: "2025-12-11T00:00:00Z",
  forecast_days: 60,
  overall_disease_risk: "مرتفع",
  disease_risks: [
    {
      rank: 1,
      disease_id: "fusarium_head_blight",
      disease_name_fr: "Fusariose (FHB)",
      disease_name_en: "Fusarium Head Blight",
      disease_name_ar: "لفحة السنابل (الفيوزاريوم)",
      image_url: "https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&q=80&w=400",
      risk_level: "HAUT",
      risk_score: 85,
      confidence_percent: 92,
      trigger_factors: [
        "الإزهار (Anthesis)",
        "رطوبة >90%",
        "حرارة >20°C"
      ],
      weather_triggers: {
        humidity_percent: 92,
        temperature_range_celsius: "22–26",
        rainfall_mm: 12
      },
      critical_window: {
        start_day: 60, // GS60 (Start of flowering)
        end_day: 69,   // GS69 (End of flowering)
        description: "مرحلة الإزهار الكامل (حساسة جداً للعدوى)"
      },
      prevention_actions: [
        {
          day: 1,
          action_id: "fungicide_spray_1",
          action_name_fr: "Tebuconazole + Prothioconazole",
          action_name_en: "Triazole Application",
          product_name: "Prosaro 250 EC",
          product_name_local: "بروسارو (Bayer/Profert)",
          product_code: "PROS-250",
          quantity_liters: 0.8,
          cost_per_liter_dzd: 5500,
          total_cost_dzd: 4400,
          supplier: "Profert Algerie",
          application_method: "رش دقيق (فوهات مسطحة)",
          coverage_hectares: 45,
          instructions_fr: "الرش الوقائي في بداية التزهير (GS61-63).",
          safety_period_days: 35,
          application_notes: "فعالية قصوى عند الرش قبل هطول المطر المتوقع."
        },
        {
          day: 7,
          action_name_fr: "فحص ميداني دقيق",
          description_fr: "ابحث عن سنيبلات مبيضة أو وردية اللون.",
          cost_dzd: 0
        }
      ],
      total_prevention_cost_dzd: 198000, // Total for farm
      historical_occurrence: true
    },
    {
      rank: 2,
      disease_id: "septoria_tritici",
      disease_name_fr: "Septoriose (STB)",
      disease_name_en: "Septoria Leaf Blotch",
      disease_name_ar: "التبقع السبتوري",
      image_url: "https://images.unsplash.com/photo-1628676233405-c94380b2a493?auto=format&fit=crop&q=80&w=400",
      risk_level: "MOYEN",
      risk_score: 55,
      confidence_percent: 78,
      trigger_factors: [
        "رذاذ المطر",
        "حرارة 15-20°C",
        "أوراق مبللة >48 ساعة"
      ],
      prevention_actions: [
        {
          day: 3,
          action_name_fr: "Azoxystrobin + Epoxiconazole",
          product_name: "Amistar Xtra",
          product_name_local: "أميستار (Syngenta/CASAP)",
          quantity_liters: 0.5,
          cost_per_liter_dzd: 4800,
          total_cost_dzd: 2400,
          supplier: "CASAP (Sidi Bel Abbes)",
          instructions_fr: "حماية ورقة العلم (GS39).",
          safety_period_days: 21
        }
      ]
    },
    {
      rank: 3,
      disease_id: "yellow_rust",
      disease_name_fr: "Rouille Jaune",
      disease_name_en: "Yellow Rust",
      disease_name_ar: "الصدأ الأصفر",
      image_url: "https://images.unsplash.com/photo-1655993356649-65239a9c7923?auto=format&fit=crop&q=80&w=400",
      risk_level: "FAIBLE",
      risk_score: 25,
      confidence_percent: 60,
      trigger_factors: [
        "ليالي باردة (10°C)",
        "ندى صباحي",
        "رياح"
      ]
    }
  ],
  disease_history: [
    {
      date: "2024-04-15T00:00:00Z",
      disease_fr: "الصدأ الأصفر",
      disease_en: "Yellow Rust",
      severity: "شديد",
      treatment_fr: "Tebuconazole",
      treatment_en: "Tebuconazole",
      recovered: true,
      yield_impact_percent: -8
    }
  ],
  general_recommendations_fr: [
    "مرحلة الإزهار حساسة جداً للفيوزاريوم. راقب الرطوبة.",
    "استخدم فوهات رش مزدوجة لضمان تغطية السنابل من الجانبين.",
    "تجنب الري بالرش أثناء فترة التزهير."
  ],
  local_fungicide_suppliers: [
    {
      name: "Profert Algerie",
      phone: "+213 23 55 11 00",
      email: "contact@profert.dz",
      region: "الجزائر العاصمة / المدية"
    },
    {
      name: "CASAP",
      phone: "+213 48 54 22 11",
      email: "commercial@casap.dz",
      region: "الغرب / الهضاب العليا"
    },
    {
      name: "Asmidal",
      phone: "+213 38 99 88 77",
      email: "info@asmidal.dz",
      region: "عنابة / وطني"
    }
  ]
};

export const yieldData: YieldData = {
  farm_id: "FARM-ALG-001",
  zone_id: "Z1",
  crop_id: "soft_wheat",
  crop_name: "القمح اللين",
  farm_size_hectares: 45,
  region: "المدية، الجزائر",
  scenarios: {
    baseline: {
      scenario_name: "الممارسة الحالية (بدون تحسين)",
      scenario_name_en: "Current Practice (No Optimization)",
      estimated_yield_tons_per_hectare: 4.8,
      total_yield_tons: 216,
      market_price_dzd_per_kg: 190,
      market_price_usd_per_ton: 260,
      total_revenue_dzd: 41040000,
      total_revenue_usd: 328320,
      assumptions: "لا تعديل في الأسمدة؛ استمرار الظروف الأساسية."
    },
    optimized: {
      scenario_name: "مع التحسين الغذائي",
      scenario_name_en: "With Nutrient Optimization",
      estimated_yield_tons_per_hectare: 5.4,
      total_yield_tons: 243,
      market_price_dzd_per_kg: 190,
      market_price_usd_per_ton: 260,
      total_revenue_dzd: 46170000,
      total_revenue_usd: 369360,
      optimization_cost_dzd: 23400,
      optimization_cost_usd: 187,
      net_profit_dzd: 5106600,
      net_profit_usd: 40853,
      roi_x: 218,
      assumptions: "تطبيق أسمدة متوازن؛ وقاية مثالية من الأمراض."
    }
  },
  yield_improvement: {
    absolute_tons_per_hectare: 0.6,
    percentage: 12.5,
    absolute_tons_farm: 27
  },
  financial_impact: {
    extra_revenue_dzd: 5130000,
    extra_revenue_usd: 41040,
    optimization_cost_dzd: 23400,
    optimization_cost_usd: 187,
    net_gain_dzd: 5106600,
    net_gain_usd: 40853,
    payback_period_days: 3,
    payback_period_hours: 72
  },
  soil_health_projection_5year: {
    years: [1, 2, 3, 4, 5],
    current_practice_score: [100, 95, 88, 80, 72],
    optimized_practice_score: [100, 98, 98, 99, 100],
    cumulative_extra_profit_dzd: [5106600, 10213200, 15319800, 20426400, 25533000],
    cumulative_extra_profit_usd: [40853, 81706, 122559, 163412, 204265]
  },
  key_insights: [
    {
      insight_fr: "تحسن الإنتاجية بنسبة 12.5% قابل للتحقيق للغاية مع تطبيق متوازن لسماد NPK.",
      insight_en: "Yield improvement of 12.5% is highly achievable with balanced NPK fertilizer application.",
      insight_ar: "تحسن الإنتاجية بنسبة 12.5% قابل للتحقيق من خلال تطبيق سماد NPK متوازن."
    },
    {
      insight_fr: "صحة التربة تتحسن بشكل كبير على المدى الطويل (مستقرة مقابل متناقصة).",
      insight_en: "Long-term soil health significantly improves with optimization (stable vs. declining).",
      insight_ar: "صحة التربة تتحسن بشكل كبير على المدى الطويل مع التحسين (مستقرة مقابل متناقصة)."
    },
    {
      insight_fr: "فترة استرداد الاستثمار: أقل من أسبوع واحد. التحسين مربح جداً.",
      insight_en: "Payback period: less than 1 week. Optimization is highly ROI-positive.",
      insight_ar: "فترة استرجاع الاستثمار: أقل من أسبوع واحد. التحسين مربح جدًا."
    },
    {
      insight_fr: "الربح التراكمي لـ 5 سنوات: +25,533,000 دج ربح إضافي + تربة أكثر صحة.",
      insight_en: "5-year cumulative benefit: +25.5M DZD additional profit + healthier soil.",
      insight_ar: "الفائدة التراكمية لمدة 5 سنوات: +25.5 مليون دينار جزائري من الأرباح الإضافية + تربة أكثر صحة."
    }
  ]
};

export const reportData: ReportData = {
  farm_id: "FARM-ALG-001",
  farm_name: "مزرعة بني مسي",
  reports_available: [
    {
      report_id: "REPORT-001",
      report_type: "farm_summary",
      report_name_fr: "ملخص المزرعة",
      report_name_en: "Farm Summary Report",
      description_fr: "نظرة عامة من 1-2 صفحة حول صحة المزرعة، التنبيهات الرئيسية، والإجراءات الموصى بها",
      generated_date: "2025-12-11T19:15:00Z",
      last_modified: "2025-12-11T19:15:00Z",
      content_sections: [
        "نظرة عامة على المزرعة",
        "درجة صحة التربة",
        "أهم 3 تنبيهات",
        "الإجراءات التالية الموصى بها"
      ],
      available_formats: ["PDF", "PNG"]
    },
    {
      report_id: "REPORT-002",
      report_type: "nutrient_optimization",
      report_name_fr: "خطة التحسين الغذائي",
      report_name_en: "Nutrient Optimization Plan",
      description_fr: "الأسمدة الموصى بها، جدول التطبيق، قائمة التسوق، التحليل المالي",
      generated_date: "2025-12-10T14:30:00Z",
      content_sections: [
        "تحليل التربة",
        "مقارنة العناصر الغذائية",
        "خطة التسميد (بالأسعار المحلية)",
        "قائمة التسوق (موردين محليين)",
        "جدول التطبيق",
        "التحليل المالي (دج + دولار)"
      ],
      available_formats: ["PDF", "Excel", "CSV"]
    },
    {
      report_id: "REPORT-003",
      report_type: "disease_prevention",
      report_name_fr: "خطة الوقاية من الأمراض",
      report_name_en: "Disease Prevention Plan",
      description_fr: "المخاطر المكتشفة، إجراءات الوقاية، الموردين المحليين للمبيدات الفطرية",
      generated_date: "2025-12-10T10:00:00Z",
      content_sections: ["تحليل المخاطر", "جدول الوقاية", "قائمة الموردين"],
      available_formats: ["PDF"]
    },
    {
      report_id: "REPORT-004",
      report_type: "yield_forecast",
      report_name_fr: "توقعات الإنتاجية",
      report_name_en: "Yield Forecast",
      description_fr: "سيناريوهات الوضع الحالي مقابل المحسن، العائد على الاستثمار، توقعات 5 سنوات",
      generated_date: "2025-12-09T09:15:00Z",
      content_sections: ["مقارنة السيناريوهات", "التقسيم المالي", "توقعات صحة التربة"],
      available_formats: ["PDF", "Excel"]
    }
  ],
  report_archive: [
    {
      report_id: "ARC-001",
      name: "ملخص المزرعة – 11 ديسمبر",
      report_type: "farm_summary",
      generated_date: "2025-12-11T19:15:00Z",
      format: "PDF",
      file_size_mb: 2.5,
      download_url: "#",
      created_by: "النظام"
    },
    {
      report_id: "ARC-002",
      name: "الخطة الغذائية – 10 ديسمبر",
      report_type: "nutrient_optimization",
      generated_date: "2025-12-10T14:30:00Z",
      format: "PDF",
      file_size_mb: 5.2,
      download_url: "#"
    }
  ]
};

export const settingsData: SettingsData = {
  user_id: "USER-ALG-001",
  user: {
    name: "أحمد بلجيلالي",
    email: "ahmed@ferme-beni-messi.dz",
    phone: "+213 (0)XXX XXXXXX",
    language: "ar",
    timezone: "أفريقيا/الجزائر",
    units: "متري",
    preferred_notification_time: "06:00"
  },
  farm: {
    id: "FARM-ALG-001",
    name: "مزرعة بني مسي",
    location: { lat: 36.4028, lng: 2.8527, region: "المدية" },
    size_hectares: 45,
    farm_type: "تجارية",
    crops: ["soft_wheat", "barley"],
    owner: "أحمد بلجيلالي",
    owner_contact: "ahmed@ferme-beni-messi.dz",
    owner_phone: "+213 (0)XXX XXXXXX"
  },
  notifications: {
    push_enabled: true,
    email_enabled: true,
    sms_enabled: false,
    disease_risk_alerts: true,
    nutrient_deficiency_alerts: true,
    sensor_offline_alerts: true,
    recommendation_pending_alerts: true,
    market_price_alerts: false,
    quiet_hours_enabled: false,
    preferred_time: "06:00"
  },
  subscription: {
    plan: "احترافي",
    sensor_limit: 50,
    farm_limit: 10,
    sensors_used: 2,
    farms_used: 1,
    billing_cycle: "شهري",
    renewal_date: "2026-01-11T00:00:00Z",
    cost_per_month_dzd: 2500,
    cost_per_month_usd: 20,
    status: "نشط",
    payment_method: "بطاقة بنكية •••• 4532"
  },
  connected_sensors: [
    {
      sensor_id: "NPK-001",
      type: "NPK",
      name: "مستشعر NPK - الحقل الشمالي",
      zone: "الحقل الشمالي",
      status: "متصل",
      battery_percent: 95,
      signal_strength: -65,
      last_sync: "2025-12-11T19:15:00Z",
      paired_date: "2025-06-01T00:00:00Z"
    },
    {
      sensor_id: "EC-002",
      type: "EC",
      name: "مستشعر الملوحة - الحقل الجنوبي",
      zone: "الحقل الجنوبي",
      status: "متصل",
      battery_percent: 62,
      signal_strength: -72,
      last_sync: "2025-12-11T19:10:00Z",
      paired_date: "2025-10-15T00:00:00Z"
    }
  ],
  billing_history: [
    {
      date: "2025-11-11T00:00:00Z",
      amount_dzd: 2500,
      amount_usd: 20,
      status: "مدفوع"
    },
    {
      date: "2025-10-11T00:00:00Z",
      amount_dzd: 2500,
      amount_usd: 20,
      status: "مدفوع"
    }
  ]
};

// Backwards compatibility exports
export const mockSensors: Sensor[] = farmData.sensors;
export const mockAlerts: Alert[] = farmData.alerts;

export const generateHistoricalData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('ar-DZ', { month: 'short', day: 'numeric' }),
      moisture: 30 + Math.random() * 20 - 10,
      ph: 6.5 + Math.random() * 0.4 - 0.2,
      nitrogen: 40 + Math.random() * 10 - 5
    });
  }
  return data;
};
