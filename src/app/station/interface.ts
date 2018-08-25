export interface Station {
  "id": number
  "name": string
  "content": string
  "cover_img": string
  "status": string
  "address": {
    "lng": string
    "lat": string
    "address": string
  }
  "create_time": string
  "update_time": string
}

export interface StationList {
  ok: boolean
  data: {
    total: number
    page_size: number
    data: Array<Station>
  }
}
