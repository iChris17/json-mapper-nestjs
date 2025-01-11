import { Module } from '@nestjs/common';
import { SesController } from './controllers/ses.controller';
import { MapperService } from './mapper/mapper.service';

@Module({
  controllers: [SesController],
  providers: [MapperService],
})
export class SesSnsModule {}
