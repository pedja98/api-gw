import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'
import { QuizQuestionResponseDto } from './quiz-question-response.dto'

export class QuizResponseDto {
  @IsNumber()
  id!: number

  @IsString()
  title!: string

  @IsString()
  description!: string

  @IsNumber()
  timeLimit!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionResponseDto)
  questions!: QuizQuestionResponseDto[]
}
