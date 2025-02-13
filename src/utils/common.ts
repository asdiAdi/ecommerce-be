import { MetaQueryDto } from './dto/meta-query.dto';
import { Order } from '../config/enums';

export const getMetaData = (query: MetaQueryDto, count: number): MetaData => {
  const {
    order = Order.ASC,
    order_by = 'created_at',
    limit = 10,
    offset = 0,
  } = query;

  return {
    total_pages: Math.ceil(count / limit),
    total_rows: count,
    order: order,
    order_by: order_by,
    limit: limit,
    offset: offset,
  };
};

//  constructor(metaQuery: MetaQueryDto, count: number) {
//     const {
//       total_pages = 1,
//       order = Order.ASC,
//       order_by = Order.ASC,
//       limit = 10,
//       offset = 0,
//     } = metaQuery;
//
//     this.total_pages = total_pages ?? 1;
//     this.total_rows = Math.ceil(count / limit);
//     this.order = order;
//     this.order_by = order_by;
//     this.limit = limit;
//     this.offset = offset;
//   }
