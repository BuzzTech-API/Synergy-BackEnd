import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ZoomService } from 'src/zoom/service/zoom/zoom.service';
@Controller('zoom')
export class ZoomController {
  constructor(private zoomService: ZoomService) { }

  @HttpCode(200)
  @Post('/token')
  async getToken(@Body() code: string) {
    try {
      return this.zoomService.getToken(code);
    } catch (error) {
      console.error('Error', error);
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
