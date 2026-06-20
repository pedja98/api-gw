import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.use('/api/v1/proxy', express.raw({ type: '*/*', limit: '50mb' }))
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap().catch((error) => {
  Logger.error('Failed to start application', error, 'Bootstrap')
  process.exit(1)
})
