import { Order } from '../../config/enums';

// no need to validate these since getMetaData already outputs default values
export class MetaDataDto {
  readonly total_pages: number;
  readonly total_rows: number;
  readonly order: Order;
  readonly order_by: string;
  readonly limit: number;
  readonly offset: number;

  // constructor(metaQuery: MetaQueryDto, count: number) {
  //   const {
  //     total_pages = 1,
  //     order = Order.ASC,
  //     order_by = Order.ASC,
  //     limit = 10,
  //     offset = 0,
  //   } = metaQuery;
  //
  //   this.total_pages = total_pages ?? 1;
  //   this.total_rows = Math.ceil(count / limit);
  //   this.order = order;
  //   this.order_by = order_by;
  //   this.limit = limit;
  //   this.offset = offset;
  // }
}
