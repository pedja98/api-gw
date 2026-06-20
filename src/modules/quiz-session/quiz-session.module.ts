import { Module } from '@nestjs/common'
import { QuizSessionService } from './quiz-session.service'
import { QuizSessionController } from './quiz-session.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  controllers: [QuizSessionController],
  providers: [QuizSessionService],
  imports: [HttpModule],
})
export class QuizSessionModule {}
