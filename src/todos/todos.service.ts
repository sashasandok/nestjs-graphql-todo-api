import { Injectable } from '@nestjs/common'
import { CreateTodoInput } from './dto/create-todo.input'
import { UpdateTodoInput } from './dto/update-todo.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todosRepository: Repository<Todo>) {}

  create(createTodoInput: CreateTodoInput) {
    const newTodo = this.todosRepository.create(createTodoInput)
    return this.todosRepository.save(newTodo)
  }

  findAll() {
    return this.todosRepository.find()
  }

  findOne(id: number) {
    return this.todosRepository.findOneBy({ id })
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    await this.todosRepository.update(id, updateTodoInput)

    const updatedTodo = await this.todosRepository.findOneBy({ id })
    return updatedTodo
  }

  async remove(id: number) {
    const todo = await this.todosRepository.findOneBy({ id })
    const deleted = await this.todosRepository.delete({ id })

    if (deleted.affected) {
      console.log(`This action removes a #${id} todo`)
      return todo
    }
  }
}
