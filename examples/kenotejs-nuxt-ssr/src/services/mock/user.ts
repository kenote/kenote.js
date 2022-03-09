
import { loadConfig } from '@kenote/config'
import ruleJudgment, { FilterQuery } from 'rule-judgment'
import { User } from '~/entities'
import { merge } from 'lodash'
import jsYaml from 'js-yaml'
import path from 'path'
import fs from 'fs/promises'

export async function find (conditions?: FilterQuery<User>) {
  let users = loadConfig<User[]>('mock/user.yml')
  if (conditions == null) {
    return users
  }
  return users.filter(ruleJudgment(conditions))
}

export async function findOne (conditions: FilterQuery<User>) {
  let users = loadConfig<User[]>('mock/user.yml')
  return users.find(ruleJudgment(conditions))
}

export async function update (conditions: FilterQuery<User>, doc: Partial<User>) {
  let users = loadConfig<User[]>('mock/user.yml')
  let i: number = 0
  for (let item of users) {
    let user = await findOne(conditions)
    if (user?.id === item.id) {
      users[i] = merge(item, doc)
      break
    }
    i++
  }
  await fs.writeFile(path.resolve(process.cwd(), 'mock/user.yml'), jsYaml.dump(users))
}
