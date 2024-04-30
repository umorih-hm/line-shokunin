declare interface UserRequest {
  radioName: string
  gender: string
  age: number | null
  lineId: string
}

declare interface OtayoriRequest {
  theme: string
  title: string
  userId: string
  children: array
}