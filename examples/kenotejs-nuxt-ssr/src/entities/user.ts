import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class User {
  @Field({ nullable: true, description: 'ID' })
  public id!: number

  @Field({ nullable: true, description: '用户名' })
  public username!: string

  @Field({ nullable: true, description: '密码' })
  public password!: string

  @Field({ nullable: true, description: 'JWToken' })
  public jwtoken!: string
}
