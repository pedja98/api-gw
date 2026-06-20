import { IsNotEmpty, IsNumber } from 'class-validator'

export class StartQuizSessionDto {
  @IsNumber()
  @IsNotEmpty()
  quizId!: number
}
