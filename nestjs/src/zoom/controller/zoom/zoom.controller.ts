import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ZoomService } from 'src/zoom/service/zoom/zoom.service';

@Controller('zoom')
export class ZoomController {
  constructor(private zoomService: ZoomService) { }

  @HttpCode(200)
  @Post('/token/:code')
  async getToken(@Param('code') code: string) {
    return this.zoomService.getToken(code);
  }

  @Get('/refreshToken')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    try {
      const response = await this.zoomService.refreshZoomToken(refreshToken);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw new HttpException(
        'Error refreshing token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
