import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosModule } from './todos/todos.module'
import { Todo } from './todos/entities/todo.entity'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (err) => ({ message: err.message, status: err.extensions.code }),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Todo],
      synchronize: true,
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
