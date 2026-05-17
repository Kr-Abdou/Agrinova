import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, CropRecommendation, DiseaseRisk, NutrientPlan } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    throw new Error("API Key is missing. Please check your configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `You are an expert AI Agronomist and Soil Scientist specialized in North African agriculture (specifically Algeria).
Your goal is to provide precise, actionable, and scientific advice to farmers in Arabic.
Focus on sustainable farming practices, yield optimization, and cost-efficiency.
Always analyze the input NPK (Nitrogen, Phosphorus, Potassium), pH, and Moisture levels carefully.
All responses MUST be in Arabic language.`;

export const getCropRecommendations = async (soilData: SoilData): Promise<CropRecommendation[]> => {
  try {
    const client = getClient();
    // Use optional chaining or defaults for safe access
    const n = soilData.nitrogen_mg_per_kg ?? 0;
    const p = soilData.phosphorus_mg_per_kg ?? 0;
    const k = soilData.potassium_mg_per_kg ?? 0;
    
    const prompt = `
      قم بتحليل بيانات التربة التالية واقترح 3 محاصيل مثالية:
      pH: ${soilData.pH}
      النيتروجين: ${n} ppm (mg/kg)
      الفوسفور: ${p} ppm (mg/kg)
      البوتاسيوم: ${k} ppm (mg/kg)
      الرطوبة: ${soilData.moisture_percent}%
      درجة الحرارة: ${soilData.temperature_celsius}°C

      قدم الإجابة بتنسيق JSON.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              cropName: { type: Type.STRING },
              matchScore: { type: Type.INTEGER, description: "Score from 0 to 100" },
              reasoning: { type: Type.STRING },
              requirements: { type: Type.STRING }
            },
            required: ["cropName", "matchScore", "reasoning", "requirements"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as CropRecommendation[];
  } catch (error) {
    console.error("Gemini Error (Crops):", error);
    return [];
  }
};

export const getNutrientPlan = async (soilData: SoilData, targetCrop: string): Promise<NutrientPlan[]> => {
  try {
    const client = getClient();
    const n = soilData.nitrogen_mg_per_kg ?? 0;
    const p = soilData.phosphorus_mg_per_kg ?? 0;
    const k = soilData.potassium_mg_per_kg ?? 0;

    const prompt = `
      بيانات التربة الحالية:
      pH: ${soilData.pH}
      NPK: ${n}-${p}-${k} (mg/kg)
      
      المحصول المستهدف: ${targetCrop}

      أنشئ خطة تعديل غذائي لتحسين التربة لهذا المحصول.
      ركز على تصحيح النقص وموازنة درجة الحموضة.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              deficiency: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              applicationMethod: { type: Type.STRING },
              estimatedCost: { type: Type.STRING, description: "منخفضة، متوسطة، أو عالية" }
            },
            required: ["deficiency", "recommendation", "applicationMethod", "estimatedCost"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as NutrientPlan[];
  } catch (error) {
    console.error("Gemini Error (Nutrients):", error);
    return [];
  }
};

export const getDiseasePrediction = async (soilData: SoilData, crop: string, region: string): Promise<DiseaseRisk[]> => {
  try {
    const client = getClient();
    const prompt = `
      حلل مخاطر الأمراض لـ:
      المحصول: ${crop}
      سياق المنطقة: ${region}
      ظروف التربة: رطوبة عالية (${soilData.moisture_percent}%)، درجة الحرارة (${soilData.temperature_celsius}C)، pH (${soilData.pH}).

      حدد أهم 3 مخاطر محتملة للأمراض بناءً على هذه الظروف البيئية.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              diseaseName: { type: Type.STRING },
              riskLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH"] },
              probability: { type: Type.INTEGER, description: "0-100 percent" },
              prevention: { type: Type.STRING }
            },
            required: ["diseaseName", "riskLevel", "probability", "prevention"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as DiseaseRisk[];
  } catch (error) {
    console.error("Gemini Error (Disease):", error);
    return [];
  }
};

export const getYieldForecast = async (soilData: SoilData, crop: string): Promise<{ text: string, groundingChunks?: any[] }> => {
   try {
    const client = getClient();
    const n = soilData.nitrogen_mg_per_kg ?? 0;
    const p = soilData.phosphorus_mg_per_kg ?? 0;
    const k = soilData.potassium_mg_per_kg ?? 0;

    const prompt = `
      توقع إمكانية الإنتاج لـ ${crop} بناءً على:
      صحة التربة: N=${n}, P=${p}, K=${k}, pH=${soilData.pH}.
      
      قدم ملخصًا موجزًا من فقرة واحدة حول أداء العائد المتوقع والتوقعات المالية.
      إذا أمكن، ابحث عن أسعار السوق الحالية لـ ${crop}.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }] 
      }
    });

    return {
      text: response.text || "تعذر إنشاء التوقعات.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini Error (Yield):", error);
    return { text: "فشل إنشاء التوقعات بسبب خطأ في الواجهة البرمجية." };
  }
}