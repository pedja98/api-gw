import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { StartQuizSessionDto } from './dto/start-quiz-session.dto'
import { AuthUser } from 'src/types/auth-user.types'
import { QuizResponseDto } from './dto/quiz-response.dto'
import { CreateAttemptDto } from './dto/create-attempt.dto'
import { AttemptResponseDto } from './dto/attempt-response.dto'

@Injectable()
export class QuizSessionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async start(user: AuthUser, dto: StartQuizSessionDto) {
    const quizUrl = `${this.configService.get<string>('endpoint.quiz')}/quizzes/internal/${dto.quizId}`

    const headers = {
      'x-user-id': user.id,
      'x-user-role': user.role,
    }

    const quizResponse = await firstValueFrom(this.httpService.get<QuizResponseDto>(quizUrl, { headers }))

    const attemptPayload = this.transformQuizToAttempt(quizResponse.data)

    const attemptsUrl = `${this.configService.get<string>('endpoint.result')}/attempts`

    const attemptResponse = await firstValueFrom(
      this.httpService.post<AttemptResponseDto>(attemptsUrl, attemptPayload, { headers }),
    )

    return attemptResponse.data
  }

  private transformQuizToAttempt(quiz: QuizResponseDto): CreateAttemptDto {
    return {
      quizId: quiz.id,
      duration: quiz.timeLimit,
      questions: quiz.questions.map((q) => ({
        questionId: q.id,
        text: q.text,
        options: q.options,
        correctOptionIndex: q.correctOptionIndex,
      })),
    }
  }
}
