/**
 * Impact Calculations Service
 * Provides scientific calculations for asteroid impact simulations
 */

// Note: GeoTIFF functionality removed for browser compatibility
// import { fromArrayBuffer } from 'geotiff';
// import fs from "fs/promises";

const ASTEROID_DENSITY = 2000; // kg/m³ (more realistic for small asteroids)
const TNT_ENERGY = 4.184e12; // Joules per megaton (4.184e9 J/kt * 1000 kt/Mt)
const EARTH_OCEAN_COVERAGE = 0.71; // 71% of Earth is ocean

export interface AsteroidData {
  diameter: number; // meters
  velocity: number; // km/s
  angle: number; // degrees
  impactLat: number;
  impactLon: number;
}

export interface ImpactResults {
  mass: number; // kg
  energy: number; // megatons TNT
  craterDiameter: number; // km
  craterDepth: number; // km
  shockwaveRadius: number; // km
  seismicMagnitude: number;
  thermalRadius: number; // km
  isOceanImpact: boolean;
  tsunamiHeight?: number; // meters (if ocean impact)
  affectedPopulation: number;
}

/**
 * Calculate asteroid mass based on diameter
 */
export function calculateMass(diameter: number): number {
  const radius = diameter / 2;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  return volume * ASTEROID_DENSITY;
}

/**
 * Calculate impact energy in megatons of TNT
 */
export function calculateEnergy(mass: number, velocity: number): number {
  const velocityMs = velocity * 1000; // Convert km/s to m/s
  const energyJoules = 0.5 * mass * Math.pow(velocityMs, 2);
  const energyMegatons = energyJoules / TNT_ENERGY; // Convert directly to megatons
  return energyMegatons;
}

/**
 * Calculate crater diameter using empirical formula
 * Based on simplified scaling for educational purposes
 */
export function calculateCraterDiameter(
  energy: number,
  _velocity: number, // Prefixed with underscore to indicate intentionally unused
  angle: number,
  isOcean: boolean
): number {
  // Simplified crater diameter calculation
  // Based on energy scaling with realistic constants
  
  // Angle efficiency factor (steeper impacts create larger craters)
  const angleRadians = (angle * Math.PI) / 180;
  const angleEfficiency = Math.pow(Math.sin(angleRadians), 0.3);
  
  // Terrain factor (ocean impacts are less efficient)
  const terrainFactor = isOcean ? 0.7 : 1.0;
  
  // Simplified scaling: D = k * E^0.33 * angle_factor * terrain_factor
  // Where k is chosen to give realistic crater sizes
  const scalingConstant = 0.8; // km per megaton^(1/3)
  
  // Crater diameter in km
  const diameterKm = scalingConstant * Math.pow(energy, 0.33) * angleEfficiency * terrainFactor;
  
  return Math.max(0.1, diameterKm); // Minimum 100m crater
}

/**
 * Calculate crater depth (typically 1/5 to 1/3 of diameter)
 */
export function calculateCraterDepth(diameter: number): number {
  return diameter / 4;
}

/**
 * Calculate shockwave radius
 */
export function calculateShockwaveRadius(energy: number): number {
  return Math.pow(energy, 0.33) * 2.5;
}

/**
 * Calculate thermal radiation radius
 */
export function calculateThermalRadius(energy: number): number {
  return Math.pow(energy, 0.41) * 3.2;
}

/**
 * Estimate seismic magnitude
 */
export function calculateSeismicMagnitude(energy: number): number {
  const energyJoules = energy * 1e6 * TNT_ENERGY;
  return (2 / 3) * Math.log10(energyJoules) - 2.9;
}

/**
 * Determine if impact location is in ocean
 */
export function isOceanImpact(lat: number, lon: number): boolean {
  if ((lon > 120 || lon < -70) && Math.abs(lat) < 60) return true; // Pacific
  if (lon > -70 && lon < -10 && Math.abs(lat) < 60) return true; // Atlantic
  if (lon > 40 && lon < 120 && lat < 20 && lat > -50) return true; // Indian
  return Math.random() < EARTH_OCEAN_COVERAGE;
}

/**
 * Calculate tsunami wave height
 */
export function calculateTsunamiHeight(
  energy: number,
  craterDiameter: number,
  waterDepth: number = 4000
): number {
  const energyFactor = Math.pow(energy, 0.25);
  const craterFactor = craterDiameter * 1000;
  const initialHeight = Math.min(craterFactor / 10, waterDepth * 0.5);
  return initialHeight * energyFactor * 0.1;
}

/**
 * Population density estimation (simplified for browser compatibility)
 * Uses a simplified model based on latitude and longitude
 */
async function getPopulationDensity(lat: number, lon: number): Promise<number> {
  // Simplified population density model
  // Higher density in temperate zones, lower at poles and extreme latitudes
  
  // Base density by latitude (people per km²)
  let baseDensity = 50; // Default
  
  // Adjust for latitude (higher density in temperate zones)
  const absLat = Math.abs(lat);
  if (absLat < 30) {
    baseDensity = 200; // Tropical/subtropical
  } else if (absLat < 50) {
    baseDensity = 150; // Temperate
  } else if (absLat < 70) {
    baseDensity = 20; // Subarctic
  } else {
    baseDensity = 1; // Arctic/Antarctic
  }
  
  // Adjust for longitude (rough continental approximation)
  if (lon > -180 && lon < -50) { // Americas
    baseDensity *= 0.8;
  } else if (lon > -50 && lon < 50) { // Europe/Africa
    baseDensity *= 1.2;
  } else if (lon > 50 && lon < 150) { // Asia
    baseDensity *= 1.5;
  } else { // Pacific
    baseDensity *= 0.3;
  }
  
  // Add some randomness to simulate local variations
  const variation = 0.5 + Math.random();
  
  return Math.max(1, baseDensity * variation);
}

/**
 * Estimate affected population
 */
export async function estimateAffectedPopulation(
  lat: number,
  lon: number,
  shockwaveRadius: number,
  thermalRadius: number
): Promise<number> {
  const density = await getPopulationDensity(lat, lon);
  const affectedArea = Math.PI * Math.pow(Math.max(shockwaveRadius, thermalRadius), 2);
  return Math.round(density * affectedArea);
}

/**
 * Main calculation function
 */
export async function calculateImpact(data: AsteroidData): Promise<ImpactResults> {
  const mass = calculateMass(data.diameter);
  const energy = calculateEnergy(mass, data.velocity);
  const isOcean = isOceanImpact(data.impactLat, data.impactLon);
  const craterDiameter = calculateCraterDiameter(energy, data.velocity, data.angle, isOcean);
  const craterDepth = calculateCraterDepth(craterDiameter);
  const shockwaveRadius = calculateShockwaveRadius(energy);
  const thermalRadius = calculateThermalRadius(energy);
  const seismicMagnitude = calculateSeismicMagnitude(energy);

  const affectedPopulation = await estimateAffectedPopulation(
    data.impactLat,
    data.impactLon,
    shockwaveRadius,
    thermalRadius
  );

  const results: ImpactResults = {
    mass,
    energy,
    craterDiameter,
    craterDepth,
    shockwaveRadius,
    thermalRadius,
    seismicMagnitude,
    isOceanImpact: isOcean,
    affectedPopulation
  };

  if (isOcean) {
    results.tsunamiHeight = calculateTsunamiHeight(energy, craterDiameter);
  }

  return results;
}
