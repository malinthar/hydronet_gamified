export interface UserProfile {
  id: string;
  userCategory: 'emergency-professional' | 'flood-professional' | 'local-authority' | 'general-resident' | 'at-risk-resident';
  age: number;
  occupation: string;
  location: string;
  floodExperience: 'none' | 'minimal' | 'moderate' | 'extensive';
  techProficiency: 'beginner' | 'intermediate' | 'advanced';
  educationLevel: string;
  createdAt: Date;
}

export interface FloodScenario {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  catchment: string;
  parameters: {
    rainfall: number; // mm/hour
    riverLevel: number; // meters above normal
    soilSaturation: number; // percentage
    urbanization: number; // percentage
    drainageCapacity: number; // percentage
    timeOfYear: 'wet' | 'dry' | 'transition';
    duration: number; // hours
    intensity: 'low' | 'moderate' | 'high' | 'extreme';
  };
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
}

export interface GameAction {
  id: string;
  actionId: string;
  actionLabel: string;
  timestamp: Date;
  scenarioId: string;
  userId: string;
}

export interface GameSession {
  id: string;
  userProfile: UserProfile;
  scenario: FloodScenario;
  actions: GameAction[];
  startTime: Date;
  endTime?: Date;
  score?: number;
}
