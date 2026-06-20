import { Type } from 'class-transformer'

export class AttemptAnswerDto {
  id!: number
  attemptId!: number
  questionId!: number

  text!: string
  options!: string[]

  selectedOptionIndex!: number | null

  correctOptionIndex?: number

  isCorrect?: boolean

  createdAt!: string
}

export class AttemptResponseDto {
  id!: number
  attemptNumber!: number

  userId!: string
  quizId!: number

  status!: string

  score!: number
  totalQuestions!: number

  createdAt!: string
  expiresAt!: string

  submittedAt!: string | null

  @Type(() => AttemptAnswerDto)
  answers!: AttemptAnswerDto[]
}
