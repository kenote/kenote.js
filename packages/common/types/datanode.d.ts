
/**
 * 基础数据节点
 */
export declare interface CommonDataNode {
  /**
   * key
   */
  key         : string
  /**
   * 名称
   */
  name        : string
  /**
   * 子集
   */
  children   ?: this[]
  /**
   * Maps
   */
  maps       ?: Array<Pick<this, 'key' | 'name'>>
}

/**
 * 数据节点代理
 */
export declare class DataNodeProxy<T extends CommonDataNode> {

  /**
   * 传入数据节点
   * @param data 
   */
  constructor (data: T[])

  /**
   * 获取处理后的数据节点
   */
  get data (): T[]

  /**
   * 查找节点
   * @param query 
   */
  public find (): T | undefined
  public find (query: FilterQuery<T> | null): T | undefined
  public find (query: FilterQuery<T> | null, data: T[]): T | undefined

  /**
   * 添加节点
   * @param key 
   * @param items
   */
  public add (key: string | null, items: T | T[]): void
  public add (key: string, items: T | T[], data: T[]): void

  /**
   * 移除节点
   * @param key 
   */
  public remove (key: string): T[]
  public remove (key: string, data: T[]): T[]

  /**
   * 更新节点
   * @param key 
   * @param payload 
   */
  public update (key: string, payload: Partial<T>): T[]
  public update (key: string, payload: Partial<T>, data: T[]): T[]
}

/**
 * 数据节点代理
 * @param data 
 */
export declare function dataNodeProxy<T extends CommonDataNode> (data: T[]): DataNodeProxy<T>

/**
 * 初始化 Maps
 * @param data 
 * @param maps 
 */
export function initMaps<T extends CommonDataNode> (data: T[]): T[]
export function initMaps<T extends CommonDataNode> (data: T[], maps: Array<Pick<T, 'key' | 'name'>>): T[]

/**
 * 移除数据 Maps
 * @param data 
 */
export function removeMaps<T extends CommonDataNode> (data: T[]): T[]

/**
 * 数据查询器
 */
export declare type FilterQuery<T> = {
  [P in keyof T]?: T[P] | QuerySelector<T[P]>
} & {
  $where   ?: (item: T) => boolean
  $and     ?: Array<FilterQuery<T>>
  $or      ?: Array<FilterQuery<T>>
  $nor     ?: Array<FilterQuery<T>>
}

type QuerySelector<T> = {
  // 
  $lt      ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $lte     ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $gt      ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $gte     ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $eq      ?: T
  $ne      ?: T
  $regex   ?: T extends string ? RegExp | string : never
  $mod     ?: T extends (number | bigint) ? T[] : never
  $in      ?: T[]
  $nin     ?: T[]
  $_in     ?: T | T[]
  $_nin    ?: T | T[]
  $size    ?: T extends ReadonlyArray<infer U> ? number | QuerySelector<number> : never
  $exists  ?: boolean
  $type    ?: BSONTypeAlias
  $not     ?: T extends string ? QuerySelector<T> | RegExp | string : QuerySelector<T>
  $where   ?: (item: T) => boolean
  $and     ?: Array<QuerySelector<T>>
  $or      ?: Array<QuerySelector<T>>
  $nor     ?: Array<QuerySelector<T>>
}

type BSONTypeAlias =
  | 'number'
  | 'double'
  | 'string'
  | 'object'
  | 'array'
  | 'binData'
  | 'undefined'
  | 'objectId'
  | 'bool'
  | 'date'
  | 'null'
  | 'regex'
  | 'dbPointer'
  | 'javascript'
  | 'symbol'
  | 'javascriptWithScope'
  | 'int'
  | 'timestamp'
  | 'long'
  | 'decimal'
  | 'minKey'
  | 'maxKey'