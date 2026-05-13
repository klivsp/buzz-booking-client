export interface Property {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  amenities: {
    icon: string;
    label: string;
  }[];
  rooms: Room[];
  location: {
    lat: number;
    lng: number;
  };
  reviews: Review[];
  detailedRatings: {
    category: string;
    score: number;
  }[];
  houseRules: {
    icon: string;
    title: string;
    description: string;
  }[];
  host: {
    name: string;
    avatar: string;
    joinedDate: string;
    responseRate: string;
  };
}

export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  beds: string;
  availability: boolean;
  options: string[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  pros?: string;
  cons?: string;
}

export interface Reservation {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  totalPrice: number;
  guests: number;
  roomType: string;
}

export interface Activity {
  id: string;
  type: 'booking' | 'cancellation' | 'search' | 'review' | 'favorite';
  description: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    currency: string;
    language: string;
    notifications: boolean;
    travelType: 'leisure' | 'business' | 'family';
  };
  
}
