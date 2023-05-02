export type TimeStamps = {
  created_at: string,
  updated_at: string
}

export interface PropertyStatus extends TimeStamps {
  id: number,
  name: string
}
