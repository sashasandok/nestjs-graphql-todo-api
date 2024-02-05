import { ObjectType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('todo')
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number

  @IsNotEmpty()
  @Column()
  @Field()
  text: string

  @Column()
  @Field(() => Boolean)
  done: number
}
