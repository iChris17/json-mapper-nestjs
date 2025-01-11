import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { SesEventDto } from '../dtos/ses-event.dto';
import { MapperService } from '../mapper/mapper.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('ses')
export class SesController {
  constructor(private readonly mapperService: MapperService) {}

  @Post('map')
  @HttpCode(200)
  async processEvent(@Body() body: any) {
    // Validate the input JSON
    const sesEvent = plainToInstance(SesEventDto, body);
    const errors = await validate(sesEvent);
    if (errors.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'the JSON structure is not valid',
        error: 'Bad Request',
      });
    }

    // Map the JSON to the target structure
    return this.mapperService.mapToTarget(sesEvent);
  }
}
