import * as entities from '~/entities'
import { getManager, FindConditions } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export const find = (conditions?: FindConditions<entities.User>) => getManager().getRepository(entities.User).find(conditions)

export const findOne = (conditions: FindConditions<entities.User>) => getManager().getRepository(entities.User).findOne(conditions)

export const update = (conditions: FindConditions<entities.User>, doc: QueryDeepPartialEntity<entities.User>) => getManager().getRepository(entities.User).update(conditions, doc)
