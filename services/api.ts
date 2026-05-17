import { FarmData, Sensor, CropData, Zone } from '../types';

const API_BASE_URL = '/api';

export const api = {
  getFarms: async (): Promise<FarmData[]> => {
    const res = await fetch(`${API_BASE_URL}/farms`);
    return res.json();
  },
  
  getSensors: async (): Promise<Sensor[]> => {
    const res = await fetch(`${API_BASE_URL}/sensors`);
    return res.json();
  },
  
  getZones: async (): Promise<Zone[]> => {
    const res = await fetch(`${API_BASE_URL}/zones`);
    return res.json();
  },

  getCrops: async (): Promise<CropData[]> => {
    const res = await fetch(`${API_BASE_URL}/crops`);
    return res.json();
  }
};
