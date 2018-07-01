export class SaveRequestParams {
  constructor (
    public bike_count: number,
    public content: string,
    public cover_img: string,
    public id:string,
    public interval:Array<{
      time: number,
      money:0
    }>,
    public name: string,
    public status: 0 | 1
  ) {}
}

export class ListRequestParams {
  constructor (
    public page: number = 1,
    public page_size: number = 10
  ) {}
}

export class DetailRequestParams {
  constructor (
    public id: string
  ) {}
}
