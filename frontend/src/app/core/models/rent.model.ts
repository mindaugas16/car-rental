import {User} from './user.model';
import {CarModel} from '../../cars/car.model';
import {LocationInterface} from './location.model';
import {InvoiceModel} from './invoice.model';

export interface RentModel {
  _id: string;
  user: User;
  car: CarModel;
  pickUpLocation: LocationInterface;
  dropOffLocation: LocationInterface;
  startDate: string;
  endDate: string;
  status: number;
  remarks: string;
  price: number;
  invoice: InvoiceModel;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRentModel {
  pickUpLocation: string;
  dropOffLocation: string;
  startDate: string;
  endDate: string;
  price: number;
  remarks?: string;
}

export interface RentUpdateModel {
  status: number;
}
