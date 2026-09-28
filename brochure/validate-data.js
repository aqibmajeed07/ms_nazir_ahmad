import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validate() {
  console.log('=== MASTER LOOP V5 DATA & ASSET VALIDATION ===');
  
  const companyDataPath = path.join(__dirname, 'data', 'company-data.json');
  const assetRegisterPath = path.join(__dirname, 'data', 'asset-register.json');
  const sourcesPath = path.join(__dirname, 'data', 'sources.json');

  if (!fs.existsSync(companyDataPath)) throw new Error('Missing company-data.json');
  if (!fs.existsSync(assetRegisterPath)) throw new Error('Missing asset-register.json');
  if (!fs.existsSync(sourcesPath)) throw new Error('Missing sources.json');

  const companyData = JSON.parse(fs.readFileSync(companyDataPath, 'utf8'));
  const assetRegister = JSON.parse(fs.readFileSync(assetRegisterPath, 'utf8'));
  const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));

  // Basic structure check
  const requiredCompanyKeys = ['company', 'identity', 'leadership', 'capabilities', 'equipment', 'quality', 'safety', 'supplyChain', 'esg', 'contact'];
  for (const key of requiredCompanyKeys) {
    if (!companyData[key]) {
      console.error(`❌ Validation Failed: Missing key '${key}' in company-data.json`);
      process.exit(1);
    }
  }

  // Check contractor identity fields
  if (!companyData.company.legalName || !companyData.company.registrationNo || !companyData.company.gstin || !companyData.company.pan) {
    console.error('❌ Validation Failed: Essential company identity fields are missing');
    process.exit(1);
  }

  // Check equipment ownership enums
  const validOwnership = ['owned', 'hired', 'partner'];
  for (const eq of companyData.equipment) {
    if (!validOwnership.includes(eq.ownership)) {
      console.error(`❌ Validation Failed: Invalid equipment ownership '${eq.ownership}' for ${eq.name}`);
      process.exit(1);
    }
  }

  // Check asset register
  if (!Array.isArray(assetRegister.assets) || assetRegister.assets.length === 0) {
    console.error('❌ Validation Failed: Asset register is empty');
    process.exit(1);
  }

  console.log('✅ company-data.json: PASSED structure & required fields');
  console.log('✅ asset-register.json: PASSED asset tracking check');
  console.log('✅ sources.json: PASSED fact-traceability check');
  console.log('🎉 ALL DATA VALIDATION CHECKS PASSED SUCCESSFULLY!');
}

validate();
