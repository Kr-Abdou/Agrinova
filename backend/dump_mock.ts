import * as mockData from '../services/mockData.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fs.writeFileSync(join(__dirname, 'mockData.json'), JSON.stringify(mockData, null, 2));
console.log('Dumped mockData to mockData.json');
