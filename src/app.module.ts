import { Module } from '@nestjs/common';
import { SesSnsModule } from './ses/ses.module';

@Module({
  imports: [SesSnsModule],
})
export class AppModule {}
