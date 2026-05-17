import { SoilData, CropRecommendation, DiseaseRisk, NutrientPlan } from '../types';

export const getCropRecommendations = async (soilData: SoilData): Promise<CropRecommendation[]> => {
  return [
    {
      cropName: "القمح",
      matchScore: 90,
      reasoning: "تربة مناسبة ومستوى حموضة مثالي",
      requirements: "ري معتدل"
    },
    {
      cropName: "الطماطم",
      matchScore: 75,
      reasoning: "تحتاج إلى زيادة الفوسفور",
      requirements: "ري مكثف وتسميد"
    }
  ];
};

export const getNutrientPlan = async (soilData: SoilData, targetCrop: string): Promise<NutrientPlan[]> => {
  return [
    {
      deficiency: "نقص في الفوسفور",
      recommendation: "إضافة سماد فوسفاتي",
      applicationMethod: "نثر قبل الزراعة",
      estimatedCost: "متوسطة"
    }
  ];
};

export const getDiseasePrediction = async (soilData: SoilData, crop: string, region: string): Promise<DiseaseRisk[]> => {
  return [
    {
      diseaseName: "اللفحة",
      riskLevel: "MEDIUM",
      probability: 60,
      prevention: "استخدام مبيدات فطرية وقائية"
    }
  ];
};

export const getYieldForecast = async (soilData: SoilData, crop: string): Promise<{ text: string, groundingChunks?: any[] }> => {
   return {
     text: "بناءً على المعطيات الحالية، يتوقع أن يكون الإنتاج جيداً إذا تم تعديل نسبة الفوسفور. العائد المتوقع يتوافق مع المتوسط الإقليمي.",
     groundingChunks: []
   };
}