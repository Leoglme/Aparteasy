import type { TimeStamps } from "@/services/model";
import type { Location } from '@/services/location/location.model'
import type { User } from '@/services/user/user.model'

export type TravelTimes = {
  driving: number
  walking: number
  transit: number
}


interface Property extends TimeStamps {
  id: number;
  name: string;
  url: string;
  price: number;
  amount_of_charges: number;
  availability_date: Date;
  location_id: number;
  number_of_rooms: number;
  surface_area: number;
  quality_rating: number;
  average_ratings: number;
  transport_time: string;
  search_id: number;
  ratings: Rating[];
  location: Location;
  isDeleted: boolean;
  contacted: boolean;
  available: boolean;
  travelTimes: TravelTimes;
  comment: string
}

interface Rating extends TimeStamps {
  id: number;
  property_id: number;
  user_id: number;
  user: User
  isUser: boolean;
  rating: number;
}

type PropertyCommand = {
  name?: string;
  url: string;
  price: number;
  amount_of_charges?: number;
  number_of_rooms: number;
  surface_area: number;
  location?: Location;
  availability_date?: Date;
  quality_rating?: number;
  comment?: string;
}


interface UpdatePropertyCommand extends PropertyCommand{
  contacted?: boolean;
  available?: boolean;
}
