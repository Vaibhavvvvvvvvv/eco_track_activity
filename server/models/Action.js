const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { 
    type: String, 
    enum: [
      // Waste Management (5-20 points)
      'Recycled', 'Composted', 'AvoidedPlastic', 'ReusedContainer', 'DonatedItems',
      'RepairedInsteadOfBuying', 'UsedReusableBag', 'RefusedDisposables',
      
      // Transportation (10-30 points)
      'PublicTransport', 'Biked', 'Walked', 'Carpooled', 'ElectricVehicle',
      'WorkedFromHome', 'CombinedTrips',
      
      // Energy (10-40 points)
      'UsedSolarPower', 'UnpluggedDevices', 'UsedNaturalLight', 'EnergyEfficientAppliance',
      'ReducedHeatingCooling', 'UsedColdWater', 'AirDried',
      
      // Water Conservation (5-25 points)
      'ShortShower', 'FixedLeak', 'RainwaterHarvesting', 'WateredPlantsEfficiently',
      'UsedDishwasherFull', 'InstalledLowFlowFixture',
      
      // Food & Diet (5-35 points)
      'VegetarianMeal', 'VeganMeal', 'LocalFood', 'OrganicFood', 'ReducedFoodWaste',
      'MealPrepped', 'GrewOwnFood', 'AvoidedProcessedFood',
      
      // Nature & Environment (15-50 points)
      'PlantedTree', 'PlantedFlowers', 'CreatedBirdHabitat', 'CleanedPark',
      'BeachCleanup', 'WildlifeConservation', 'CommunityGarden',
      
      // Shopping & Consumption (5-30 points)
      'BoughtSecondhand', 'ChoseEcoFriendlyProduct', 'MinimalistPurchase',
      'SupportedLocalBusiness', 'BoughtInBulk', 'AvoidedFastFashion',
      
      // Education & Advocacy (10-40 points)
      'EducatedOthers', 'AttendedEcoEvent', 'SignedPetition', 'VolunteeredForEnvironment',
      'SharedEcoTips', 'ParticipatedInEcoCampaign'
    ], 
    required: true 
  },
  points: { type: Number, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Action', actionSchema);
