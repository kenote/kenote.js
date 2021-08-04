import { Model, Document, FilterQuery, UpdateQuery, ModelUpdateOptions } from 'mongoose'
import type { QueryOptions, CreateQuery } from '..'
import { isArray } from 'lodash'
import { promisifyAll } from 'bluebird'

export class ModelDao {

  private __Model: Model<Document, {}>
  private __Options: QueryOptions = {
    populate: { path: '' },
    limit: 10
  }

  get name () {
    return this.__Options.name ?? this.__Model.modelName
  }

  constructor (model: Model<Document, {}>, options?: QueryOptions) {
    this.__Model = model
    this.__Options = { ...this.__Options, ...options }
  }

  /**
   * 创建数据文档
   * @param docs 
   */
  public async create (docs: CreateQuery | CreateQuery[]) {
    let { populate } = this.__Options
    let data = await this.__Model.create(docs)
    if (isArray(data)) {
      let _data: any[] = []
      for (let res of data) {
        let item = await promisifyAll(res).populateAsync(populate!)
        _data.push(item)
      }
      return _data
    }
    else {
      return await promisifyAll(data as any).populateAsync(populate!)
    }
  }

  /**
   * 查询单条数据
   * @param conditions 
   * @param options 
   */
  public async findOne (conditions: FilterQuery<Document>, options?: QueryOptions) {
    let { select, populate } = this.__Options
    let data = await this.__Model.findOne(conditions)
      .select(options?.select ?? select)
      .populate(options?.populate ?? populate)
    return data
  }

  /**
   * 查询多条数据（列表）
   * @param conditions 
   * @param options 
   */
  public async find (conditions?: FilterQuery<Document> | null, options?: QueryOptions) {
    let { select, populate, sort, limit } = this.__Options
    let data = await this.__Model.find({ ...conditions })
      .select(options?.select ?? select)
      .populate(options?.populate ?? populate)
      .sort(options?.sort ?? sort ?? { _id: 1 })
      .limit(options?.limit ?? limit ?? 10)
      .skip(options?.skip ?? 0)
    return data
  }

  /**
   * 统计数据条数
   * @param conditions 
   */
  public async counts (conditions?: FilterQuery<Document> | null) {
    if (conditions) {
      return this.__Model.countDocuments(conditions)
    }
    return this.__Model.estimatedDocumentCount()
  }

  /**
   * 数据分页列表
   * @param conditions 
   * @param options 
   */
  public async list (conditions?: FilterQuery<Document> | null, options?: QueryOptions) {
    let data = await this.find(conditions, options)
    let counts = await this.counts(conditions)
    let limit = options?.limit ?? this.__Options.limit ?? 10
    return { data, counts, limit }
  }

  /**
   * 更新单条数据
   * @param conditions 
   * @param doc 
   * @param options 
   */
  public async updateOne (conditions: FilterQuery<Document>, doc: UpdateQuery<Document>, options?: ModelUpdateOptions) {
    return this.__Model.updateOne(conditions, doc, { ...options })
  }

  /**
   * 更新多条数据
   * @param conditions 
   * @param doc 
   * @param options 
   */
  public async updateMany (conditions: FilterQuery<Document> | null, doc: UpdateQuery<Document>, options?: ModelUpdateOptions) {
    return await this.__Model.updateMany({ ...conditions }, doc, { ...options })
  }

  /**
   * 删除数据文档
   * @param conditions 
   */
  public async remove (conditions?: FilterQuery<Document> | null) {
    return this.__Model.deleteMany({ ...conditions })
  }

  /**
   * 清除数据文档
   */
  public async clear () {
    await this.remove()
    await this.__Model.collection.dropIndexes()
  }
}

export const modelDao = (model: Model<Document, {}>, options?: QueryOptions) => new ModelDao(model, options)