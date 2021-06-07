export interface Properties {
  value: Property[];
  updateTarget: number;
}

export interface Property {
  property_id: number;
  userId: number;
  name: string;
  street: string;
  postalCode: string;
  city: string;
  municipality: string;
  country: string;
  description: string;
  latitude: number;
  longitude: number;
};

export const PropertyInitialState = [{
  property_id: 0,
  userId: 0,
  name: '',
  street: '',
  postalCode: '',
  city: '',
  municipality: '',
  country: '',
  description: '',
  latitude: 0.0,
  longitude: 0.0,
}];