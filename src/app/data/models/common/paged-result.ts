export interface PagedResult<T> {
  rowCount: number;
  pageCount: number;
  pageSize: number;
  pageIndex: number;
  list: Array<T>;
}
