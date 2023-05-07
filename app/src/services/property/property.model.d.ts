import type { PropertyStatus, TimeStamps } from "@/services/model";
import type { Location } from '@/services/location/location.model'

interface Property extends TimeStamps {
  id: number;
  name: string;
  url: string;
  price: number;
  amount_of_charges: number;
  availability_date: string;
  location_id: number;
  number_of_rooms: number;
  surface_area: number;
  quality_rating: number;
  transport_time: string;
  search_id: number;
  ratings: Rating[];
  statuses: PropertyStatus[] | never[]
  location: Location;
  isDeleted: boolean;
}

interface Rating extends TimeStamps {
  id: number;
  property_id: number;
  user_id: number;
  rating: number;
}

type PropertyCommand = {
  name?: string;
  url: string;
  price: number;
  charges: number;
  availability_date: string;
  location: Location;
  number_of_bedrooms: number;
  surface_area: number;
  quality_rating: number;
  transport_time: string;
  search_id: number;
}
