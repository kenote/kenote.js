import { modelDao } from '@kenote/mongoose'
import { getModelForClass } from '@typegoose/typegoose'
import { FilterQuery, Model, Document } from 'mongoose'
import * as entities from '~/entities'
import { UserDocument } from '@/types/services/db/user'

export const model = getModelForClass(entities.User)
export const Dao = modelDao<UserDocument>(model as unknown as Model<Document, {}>, {})

export const find = (conditions?: FilterQuery<UserDocument>) => Dao.find(conditions)

export const findOne = (conditions: FilterQuery<UserDocument>) => Dao.findOne(conditions)

export const update = (conditions: FilterQuery<UserDocument>, doc: Partial<UserDocument>) => Dao.updateOne(conditions, doc)
