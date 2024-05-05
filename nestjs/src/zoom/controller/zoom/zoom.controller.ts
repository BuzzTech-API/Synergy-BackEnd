import {
  Controller,
  Query,
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

  @HttpCode(200)
  @Post('/refreshToken')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
      return await this.zoomService.refreshZoomToken(refreshToken)
  }
}
