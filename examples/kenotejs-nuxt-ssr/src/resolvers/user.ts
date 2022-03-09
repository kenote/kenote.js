import { Arg, Args, ArgsType, Ctx, Field, InputType, Query, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { isAuth } from '~/middlewares/auth'
import { User } from '~/entities'
import { filterData, FilterData } from 'parse-string'
import { loadConfig } from '@kenote/config'
import { Context } from '@kenote/core'

@ArgsType()
class UserArgs {
  @Field({ nullable: true, description: 'ID' })
  public id?: number

  @Field({ nullable: true, description: '用户名' })
  public username?: string

  @Field({ nullable: true, description: '密码' })
  public password?: string

  @Field({ nullable: true, description: 'JWToken' })
  public jwtoken?: string
}

@InputType()
class LoginInput {
  @Field({ nullable: true, description: '用户名' })
  public username?: string

  @Field({ nullable: true, description: '密码' })
  public password?: string
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User], { name: 'list', nullable: true, description: '用户列表' })
  @UseMiddleware(isAuth)
  async list (@Args() args: UserArgs, @Ctx() ctx: Context) {
    let { mock } = ctx.service
    try {
      return await mock.user.find(args)
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => User, { name: 'login', nullable: true, description: '用户登录' })
  async login (@Arg('data') data: LoginInput, @Ctx() ctx: Context) {
    let { mock, httpError, ErrorCode } = ctx.service
    try {
      let filters = loadConfig<Record<string, FilterData.options[]>>('config/filters/main.yml')
      let { username, password } = filterData(filters.login)(data)
      let result = await mock.user.findOne({ username, password })
      if (result == null) {
        throw httpError(ErrorCode.ERROR_LOGINVALID_FAIL)
      }
      return await ctx.jwtLogin(result)
    } catch (error) {
      throw error
    }
  }
}
