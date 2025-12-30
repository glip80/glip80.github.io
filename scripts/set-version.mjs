import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const ENV_CONTENT = `VITE_GA_MEASUREMENT_ID=${process.env.VITE_GA_MEASUREMENT_ID || ''}
VITE_ADMIN_PASSWORD=${process.env.VITE_ADMIN_PASSWORD || ''}
VITE_BUILD_VERSION=${packageJson.version}
`;

fs.writeFileSync('.env.production', ENV_CONTENT);
console.log(`Version ${packageJson.version} written to .env.production`);
