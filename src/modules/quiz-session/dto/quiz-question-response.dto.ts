import { IsArray, IsNumber, IsString } from 'class-validator'

export class QuizQuestionResponseDto {
  @IsNumber()
  id!: number

  @IsString()
  text!: string

  @IsArray()
  @IsString({ each: true })
  options!: string[]

  @IsNumber()
  correctOptionIndex!: number
}
