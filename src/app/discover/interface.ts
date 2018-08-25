export interface route {
  lng: string
  lat: string
  address: string
}
export interface Article {
  id: string
  title: string
  content: string
  cover_img: string
  route: Array<route>,
  type: string
  status: string
  create_time: string
  update_time: string
}
