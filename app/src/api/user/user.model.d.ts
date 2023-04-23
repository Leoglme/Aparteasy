import type { TimeStamps } from "@/api/model";

export interface User extends TimeStamps {
  id: number,
  active: boolean,
  city: string,
  email: string,
  password: string,
  name: string
}
