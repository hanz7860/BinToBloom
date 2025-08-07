export interface RegisterDto {
  name: string
  email: string
  password: string
  role: 'DONOR' | 'COLLECTOR'
  location: {
    address: string
    latitude: number
    longitude: number
  }
}
export interface LocationDto {
  address: string
  latitude: number
  longitude: number
}
