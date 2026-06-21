import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

export class AttemptAnswerDto {
  @IsInt()
  id!: number

  @IsInt()
  attemptId!: number

  @IsInt()
  questionId!: number

  @IsString()
  @IsNotEmpty()
  text!: string

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  options!: string[]

  @IsOptional()
  @IsInt()
  @Min(0)
  selectedOptionIndex!: number | null

  @IsDateString()
  createdAt!: string
}

export class AttemptResponseDto {
  @IsInt()
  id!: number

  @IsInt()
  @Min(1)
  attemptNumber!: number

  @IsString()
  @IsNotEmpty()
  userId!: string

  @IsInt()
  quizId!: number

  @IsString()
  @IsNotEmpty()
  status!: string

  @IsInt()
  @Min(0)
  score!: number

  @IsInt()
  @Min(0)
  totalQuestions!: number

  @IsDateString()
  createdAt!: string

  @IsDateString()
  expiresAt!: string

  @IsOptional()
  @IsDateString()
  submittedAt!: string | null

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AttemptAnswerDto)
  answers!: AttemptAnswerDto[]
}
