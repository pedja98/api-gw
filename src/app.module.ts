import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GlobalModule } from './global/global.module'
import { ProxyModule } from './modules/proxy/proxy.module'
import endpointConfig from './configs/endpoint.config'
import jwtConfig from './configs/jwt.config'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './guards/auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { QuizPolicyGuard } from './guards/quiz-policy.guard'
import { QuizSessionModule } from './modules/quiz-session/quiz-session.module'
import { ResultPolicyGuard } from './guards/result-policy.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [endpointConfig, jwtConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    GlobalModule,
    ProxyModule,
    QuizSessionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: QuizPolicyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResultPolicyGuard,
    },
  ],
})
export class AppModule {}
