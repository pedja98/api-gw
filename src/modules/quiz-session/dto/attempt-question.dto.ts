import { IsArray, IsNumber, IsString } from 'class-validator'

export class AttemptQuestionDto {
  @IsNumber()
  questionId!: number

  @IsString()
  text!: string

  @IsArray()
  @IsString({ each: true })
  options!: string[]

  @IsNumber()
  correctOptionIndex!: number
}
