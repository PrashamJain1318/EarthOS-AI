export interface CarbonEstimate {
  footprint: number; // in kg CO2e
  repairBenefit: number; // in kg CO2e saved
  reuseBenefit: number; // in kg CO2e saved
  recyclingBenefit: number; // in kg CO2e saved
  remainingUsefulLife: number; // in years
  methodology: string;
  confidence: number; // 0-100 percentage
}

class CarbonService {
  /**
   * Estimates environmental footprint and circular benefits.
   */
  public calculateCarbonEstimate(
    category: string,
    material: string,
    ageYears: number
  ): CarbonEstimate {
    const normCategory = category.toUpperCase();
    const normMaterial = material.toUpperCase();

    // Base manufacturing footprints by category (kg CO2e)
    let baseFootprint = 30;
    let expectedLifespan = 5; // default lifespan in years

    if (normCategory.includes('ELECTRONICS')) {
      baseFootprint = 180;
      expectedLifespan = 4;
    } else if (normCategory.includes('TEXTILES') || normCategory.includes('CLOTHES')) {
      baseFootprint = 20;
      expectedLifespan = 3;
    } else if (normCategory.includes('FURNITURE') || normCategory.includes('WOOD')) {
      baseFootprint = 70;
      expectedLifespan = 10;
    } else if (normCategory.includes('METAL')) {
      baseFootprint = 100;
      expectedLifespan = 15;
    } else if (normCategory.includes('PLASTIC')) {
      baseFootprint = 45;
      expectedLifespan = 6;
    }

    // Material adjustment factors
    let materialFactor = 1.0;
    if (normMaterial.includes('ALUMINUM') || normMaterial.includes('STEEL') || normMaterial.includes('COPPER')) {
      materialFactor = 1.3;
    } else if (normMaterial.includes('COTTON') || normMaterial.includes('WOOL')) {
      materialFactor = 0.8;
    } else if (normMaterial.includes('POLYESTER') || normMaterial.includes('NYLON')) {
      materialFactor = 1.1;
    } else if (normMaterial.includes('RECYCLED')) {
      materialFactor = 0.4; // Recycled materials have much lower footprint
    }

    // Age efficiency adjustment
    // Older equipment had less clean grid/manufacturing efficiency
    const ageFactor = 1.0 + Math.min(0.5, ageYears * 0.03);

    // Calculate final footprint
    const footprint = Math.round(baseFootprint * materialFactor * ageFactor);

    // Remaining useful life calculation
    const remainingUsefulLife = Math.max(0, expectedLifespan - ageYears);

    // Circular economy benefits (emissions prevented relative to buying brand new equivalent)
    const repairBenefit = Math.round(footprint * 0.75); // Repair keeps product active, saving 75% of manufacturing footprint
    const reuseBenefit = Math.round(footprint * 0.90);  // Reuse saves 90% of manufacturing footprint
    const recyclingBenefit = Math.round(footprint * 0.35); // Recycling recovers material loops, preventing 35% of extraction footprint

    // Methodology description
    const methodology = `LCA-based estimation utilizing category base baselines adjusted by material factors and manufacturing age efficiencies. Product lifecycle calculations compare raw extraction offsets against standard logistics grid values.`;

    // Confidence level estimation
    let confidence = 85;
    if (!material || material === 'UNKNOWN') confidence -= 20;
    if (!category || category === 'OTHER') confidence -= 15;
    if (ageYears === 0) confidence -= 5; // guess if age is missing

    return {
      footprint,
      repairBenefit,
      reuseBenefit,
      recyclingBenefit,
      remainingUsefulLife,
      methodology,
      confidence: Math.max(30, confidence),
    };
  }
}

export const carbonService = new CarbonService();
export default carbonService;
