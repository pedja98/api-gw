import { Type } from 'class-transformer'
import { IsArray, IsNumber, ValidateNested } from 'class-validator'
import { AttemptQuestionDto } from './attempt-question.dto'

export class CreateAttemptDto {
  @IsNumber()
  quizId!: number

  @IsNumber()
  duration!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttemptQuestionDto)
  questions!: AttemptQuestionDto[]
}
