export interface Bike {
  bike_no: string // 单车号
  bike_type: string// 类型
  id: string// 自增ID
  status: number // 开启状态 1开启 0关闭
}

export interface Track{
  bike_id:string
  bike_no: string
  create_time: string
  order_sn: string
  real_name: string
  rent_station_name: string
  return_station_name: string
  update_time:string
}
