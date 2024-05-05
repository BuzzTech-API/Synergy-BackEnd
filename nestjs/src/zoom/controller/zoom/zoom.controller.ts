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
import { AuthorizationCode } from 'src/common/dtos/Zoom.dto';
import { ZoomService } from 'src/zoom/service/zoom/zoom.service';


@Controller('zoom')
export class ZoomController {
  constructor(private zoomService: ZoomService) { }

  @HttpCode(200)
  @Post('/token')
  async getToken(@Body() body: AuthorizationCode) {
    return this.zoomService.getToken(body.code)
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
