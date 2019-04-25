export class pageFilter {
  constructor(
    public orderBy?: string,
    public page?: number
  ) {
    this.orderBy = orderBy;
    this.page = page;
  }
}
