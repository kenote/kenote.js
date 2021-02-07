import { Resolver, Query, Args, ArgsType, Field, ObjectType } from 'type-graphql'
import ruleJudgment from 'rule-judgment'

const users = [
  {id: 1, name: 'admin' },
  {id: 2, name: 'thondery' }
]

@ObjectType()
class User {

  @Field({ nullable: true, description: 'ID' })
  public id!: number

  @Field({ nullable: true, description: '用户名' })
  public name!: string
}

@ArgsType()
class UserArgs {

  @Field({ nullable: true, description: 'ID' })
  public id?: number

  @Field({ nullable: true, description: '用户名' })
  public name?: string
}

@Resolver(User)
export default class UserResolver {

  @Query(() => User, { name: 'user', nullable: true, description: '查看用户信息' })
  async info (@Args() args: UserArgs) {
    return users.find( ruleJudgment({ ...args }) )
  }
}