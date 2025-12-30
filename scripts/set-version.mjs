import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_CONTENT = `VITE_GA_MEASUREMENT_ID=${process.env.VITE_GA_MEASUREMENT_ID || ''}
VITE_ADMIN_PASSWORD=${process.env.VITE_ADMIN_PASSWORD || ''}
VITE_BUILD_VERSION=${process.env.VITE_BUILD_VERSION || '0.0.0-dev'}
`;

fs.writeFileSync('.env.production', ENV_CONTENT);
console.log(`Version ${process.env.VITE_BUILD_VERSION || '0.0.0-dev'} written to .env.production`);
