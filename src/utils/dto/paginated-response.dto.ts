import { IsArray } from 'class-validator';
import { MetaQueryDto } from './meta-query.dto';
import { MetaDataDto } from './meta-data.dto';

/**
 * This class standardizes the structure of responses that return paginated data.
 *
 * @template T - The type of data being returned in the pagination.
 * @example
 * ```ts
 * class UserDto {
 *   id: number;
 *   name: string;
 * }
 *
 * const users: UserDto[] = [
 *   { id: 1, name: "John Doe" },
 *   { id: 2, name: "Jane Doe" }
 * ];
 *
 * const meta: @link MetaDataDto = {
 *   total_pages: 10,
 *   total_rows: 100,
 *   order: "DESC",
 *   order_by: "created_at",
 *   limit: 10,
 *   offset: 0
 * };
 *
 * const paginatedUsers = new PaginatedResponseDto<UserDto>(users, meta);
 * ```
 */
export class PaginatedResponseDto<T> {
  /**
   * The array of items in the current page.
   * @type {T[]}
   */
  @IsArray()
  readonly data: T[];

  /**
   * Metadata containing pagination details such as total pages, total rows,
   * ordering, limit, and offset.
   * @type {MetaDataDto}
   */
  readonly meta: MetaDataDto;

  constructor(data: T[], metaData: MetaDataDto) {
    this.data = data;
    this.meta = metaData;
  }
}
