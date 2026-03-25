// Shared eco app constants:
// - scoring per action
// - grouping actions for eco bot suggestions
// - badge levels + reward coupons

const CATEGORY_POINTS = {
  // Waste Management (5-20 points)
  Recycled: 10,
  Composted: 15,
  AvoidedPlastic: 20,
  ReusedContainer: 8,
  DonatedItems: 12,
  RepairedInsteadOfBuying: 18,
  UsedReusableBag: 5,
  RefusedDisposables: 10,

  // Transportation (10-30 points)
  PublicTransport: 15,
  Biked: 20,
  Walked: 18,
  Carpooled: 12,
  ElectricVehicle: 25,
  WorkedFromHome: 15,
  CombinedTrips: 10,

  // Energy (10-40 points)
  UsedSolarPower: 40,
  UnpluggedDevices: 10,
  UsedNaturalLight: 8,
  EnergyEfficientAppliance: 30,
  ReducedHeatingCooling: 15,
  UsedColdWater: 10,
  AirDried: 12,

  // Water Conservation (5-25 points)
  ShortShower: 10,
  FixedLeak: 20,
  RainwaterHarvesting: 25,
  WateredPlantsEfficiently: 8,
  UsedDishwasherFull: 10,
  InstalledLowFlowFixture: 22,

  // Food & Diet (5-35 points)
  VegetarianMeal: 15,
  VeganMeal: 20,
  LocalFood: 12,
  OrganicFood: 15,
  ReducedFoodWaste: 10,
  MealPrepped: 8,
  GrewOwnFood: 25,
  AvoidedProcessedFood: 10,

  // Nature & Environment (15-50 points)
  PlantedTree: 50,
  PlantedFlowers: 15,
  CreatedBirdHabitat: 20,
  CleanedPark: 25,
  BeachCleanup: 30,
  WildlifeConservation: 35,
  CommunityGarden: 20,

  // Shopping & Consumption (5-30 points)
  BoughtSecondhand: 15,
  ChoseEcoFriendlyProduct: 12,
  MinimalistPurchase: 10,
  SupportedLocalBusiness: 10,
  BoughtInBulk: 8,
  AvoidedFastFashion: 18,

  // Education & Advocacy (10-40 points)
  EducatedOthers: 20,
  AttendedEcoEvent: 15,
  SignedPetition: 10,
  VolunteeredForEnvironment: 30,
  SharedEcoTips: 12,
  ParticipatedInEcoCampaign: 25,
};

const ACTION_GROUPS = {
  'Waste Management': [
    'Recycled',
    'Composted',
    'AvoidedPlastic',
    'ReusedContainer',
    'DonatedItems',
    'RepairedInsteadOfBuying',
    'UsedReusableBag',
    'RefusedDisposables',
  ],
  Transportation: ['PublicTransport', 'Biked', 'Walked', 'Carpooled', 'ElectricVehicle', 'WorkedFromHome', 'CombinedTrips'],
  Energy: [
    'UsedSolarPower',
    'UnpluggedDevices',
    'UsedNaturalLight',
    'EnergyEfficientAppliance',
    'ReducedHeatingCooling',
    'UsedColdWater',
    'AirDried',
  ],
  Water: [
    'ShortShower',
    'FixedLeak',
    'RainwaterHarvesting',
    'WateredPlantsEfficiently',
    'UsedDishwasherFull',
    'InstalledLowFlowFixture',
  ],
  Food: [
    'VegetarianMeal',
    'VeganMeal',
    'LocalFood',
    'OrganicFood',
    'ReducedFoodWaste',
    'MealPrepped',
    'GrewOwnFood',
    'AvoidedProcessedFood',
  ],
  Nature: [
    'PlantedTree',
    'PlantedFlowers',
    'CreatedBirdHabitat',
    'CleanedPark',
    'BeachCleanup',
    'WildlifeConservation',
    'CommunityGarden',
  ],
  Shopping: [
    'BoughtSecondhand',
    'ChoseEcoFriendlyProduct',
    'MinimalistPurchase',
    'SupportedLocalBusiness',
    'BoughtInBulk',
    'AvoidedFastFashion',
  ],
  Advocacy: [
    'EducatedOthers',
    'AttendedEcoEvent',
    'SignedPetition',
    'VolunteeredForEnvironment',
    'SharedEcoTips',
    'ParticipatedInEcoCampaign',
  ],
};

function getActionGroup(actionValue) {
  for (const [group, actions] of Object.entries(ACTION_GROUPS)) {
    if (actions.includes(actionValue)) return group;
  }
  return null;
}

function getBadgeLevel(totalScore) {
  // Keep aligned with what Dashboard displays.
  if (!totalScore || totalScore === 0) return { level: 0, name: 'Getting Started' };
  if (totalScore <= 50) return { level: 1, name: 'Eco Beginner' };
  if (totalScore <= 100) return { level: 2, name: 'Green Warrior' };
  if (totalScore <= 200) return { level: 3, name: 'Eco Champion' };
  if (totalScore <= 350) return { level: 4, name: 'Climate Hero' };
  return { level: 5, name: 'Planet Protector' };
}

function couponForLevel(level) {
  // For demo: generic merchant + discount.
  const coupons = {
    1: { code: 'GREEN10', discountPercent: 10, description: '10% off at EcoMart (demo)' },
    2: { code: 'ECO15', discountPercent: 15, description: '15% off at GreenGrocer (demo)' },
    3: { code: 'CHAMPION20', discountPercent: 20, description: '20% off on sustainable essentials (demo)' },
    4: { code: 'CLIMATE25', discountPercent: 25, description: '25% off for climate-friendly products (demo)' },
    5: { code: 'PLANET30', discountPercent: 30, description: '30% off to help you go greener (demo)' },
  };
  return coupons[level] || null;
}

module.exports = {
  CATEGORY_POINTS,
  ACTION_GROUPS,
  getActionGroup,
  getBadgeLevel,
  couponForLevel,
};

