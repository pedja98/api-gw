import { registerAs } from '@nestjs/config'

export default registerAs('endpoint', () => ({
  auth: process.env.AUTH_API,
  quiz: process.env.QUIZ_API,
  result: process.env.RESULT_API,
}))
