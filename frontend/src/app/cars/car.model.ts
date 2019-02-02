import {LocationInterface} from '../core/models/location.model';

export interface CarModel {
  _id: number;
  brand: string;
  model: string;
  priceMin?: number;
  description?: string;
  photos?: string[];
  color?: string;
  mileage?: number;
  productionYear?: number;
  category?: string;
  location: LocationInterface;
}


export interface CarUpdateInterface {
  brand?: string;
  model?: string;
  priceMin?: number;
  description?: string;
  photos?: string[];
  color?: string;
  mileage?: number;
  productionYear?: number;
  category?: string;
  location: LocationInterface;
}
