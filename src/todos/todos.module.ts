import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosResolver } from './todos.resolver'
import { Todo } from './entities/todo.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
