import { PopulateOptions, Model, Document, DocumentDefinition, AnyObject, FilterQuery, UpdateQuery, ModelUpdateOptions } from 'mongoose'

export type CreateQuery<T = Document> = T | DocumentDefinition<T> | AnyObject

/**
 * 插入返回值
 */
export declare interface InsertWriteResult {
  ok                 ?: number
  n                  ?: number
}

/**
 * 更新返回值
 */
export declare interface UpdateWriteResult extends InsertWriteResult {
  nModified          ?: number
}

/**
 * 删除返回值
 */
export declare interface DeleteWriteResult extends InsertWriteResult {
  deletedCount       ?: number
}

/**
 * 列表数据返回值
 */
export declare interface ListDataResult<T = Document> {
  /**
   * 数据
   */
  data                : T[]
  /**
   * 总条数
   */
  counts              : number
  /**
   * 单页条数
   */
  limit               : number
}

/**
 * 查询选项
 */
export declare interface QueryOptions {
  /**
   * 模型名称
   */
  name               ?: string
  /**
   * Populate 选项
   */
  populate           ?: string | string[] | PopulateOptions | PopulateOptions[]
  /**
   * 提取的字段
   */
  select             ?: any
  /**
   * 排序规则
   */
  sort               ?: any
  /**
   * 记录条数
   */
  limit              ?: number
  /**
   * 第几条开始
   */
  skip               ?: number
}

export declare class ModelDao<T = Document> {

  constructor (model: Model<Document, {}>, options?: QueryOptions)

  /**
   * Model 名称
   */
  name: string

  /**
   * /**
   * 创建数据文档
   * @param docs 
   */
  public create<U = T> (doc: CreateQuery<T>): Promise<U>
  public create<U = T> (docs: Array<CreateQuery<T>>): Promise<U[]>

  /**
   * 查询单条数据
   * @param conditions 
   * @param options 
   */
  public findOne<U = T> (conditions: FilterQuery<T>, options?: QueryOptions): Promise<U>

  /**
   * 查询多条数据（列表）
   * @param conditions 
   * @param options 
   */
  public find<U = T> (conditions?: FilterQuery<T> | null, options?: QueryOptions): Promise<U[]>

  /**
   * 统计数据条数
   * @param conditions 
   */
  public counts (conditions?: FilterQuery<T> | null): Promise<number>

  /**
   * 数据分页列表
   * @param conditions 
   * @param options 
   */
  public list (conditions?: FilterQuery<T> | null, options?: QueryOptions): Promise<ListDataResult>

  /**
   * 更新单条数据
   * @param conditions 
   * @param doc 
   * @param options 
   */
  public updateOne (conditions: FilterQuery<T>, doc: UpdateQuery<T>, options?: ModelUpdateOptions): Promise<UpdateWriteResult>

  /**
   * 更新多条数据
   * @param conditions 
   * @param doc 
   * @param options 
   */
  public updateMany (conditions: FilterQuery<T> | null, doc: UpdateQuery<T>, options?: ModelUpdateOptions): Promise<UpdateWriteResult>

  /**
   * 删除数据文档
   * @param conditions 
   */
  public remove (conditions?: FilterQuery<T> | null): Promise<DeleteWriteResult>

  /**
   * 清除数据文档
   */
  public clear (): Promise<void>
}

export declare function modelDao<T = Document> (model: Model<Document, {}>, options?: QueryOptions): ModelDao<T>