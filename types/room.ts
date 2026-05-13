

export type TravelType = 'business' | 'leisure' | 'family' | 'solo';

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: boolean;
  travelType: TravelType;
}

export interface UserActivity {
  id: string;
  type: 'booking' | 'search' | 'review' | 'favorite';
  description: string;
  timestamp: string; 
}

export interface Reservation {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string; 
  roomType: string;      
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  totalPrice: number;    
}

export interface Property {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  images: string[];
  features: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  favorites: string[]; 
  reservations: Reservation[];
  activities: UserActivity[];
}

export interface ClientDashboardProps {
  user: UserProfile;
  properties: Property[];
  onCancelReservation: (id: string) => void;
  onPostponeReservation: (id: string, newDate: string) => void;
  onEditProfile: () => void;
}