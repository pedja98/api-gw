import { Body, Controller, Post } from '@nestjs/common'
import { QuizSessionService } from './quiz-session.service'
import { User } from 'src/decorators/user.decorator'
import { AuthUser } from 'src/types/auth-user.types'
import { StartQuizSessionDto } from './dto/start-quiz-session.dto'

@Controller('quiz-session')
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}

  @Post('start')
  async start(@User() user: AuthUser, @Body() dto: StartQuizSessionDto) {
    return this.quizSessionService.start(user, dto)
  }
}
