import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, Unique, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity('user')
@Unique(['id'])
export default class User {

  @Field({ nullable: true, description: 'ID' })
  @PrimaryGeneratedColumn()
  public id!: number

  @Field({ nullable: true, description: '用户名' })
  @Column()
  public username!: string

  @Field({ nullable: true, description: '密码' })
  @Column()
  public password!: string

  @Field({ nullable: true, description: 'JWToken' })
  @Column()
  public jwtoken!: string
}
