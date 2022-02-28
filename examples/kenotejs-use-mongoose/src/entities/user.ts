import { Field, ObjectType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export default class User {

  @Field({ nullable: true, description: 'ID' })
  @prop({ unique: true })
  public id!: number

  @Field({ nullable: true, description: '用户名' })
  @prop()
  public username!: string

  @Field({ nullable: true, description: '密码' })
  @prop()
  public password!: string

  @Field({ nullable: true, description: 'JWToken' })
  @prop()
  public jwtoken!: string
}
