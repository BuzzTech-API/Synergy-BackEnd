import { Controller, Query, Post, HttpCode, Param, Body } from '@nestjs/common';
import { zoomMeetinhCreateDto } from 'src/common/dtos/Zoom.dto';
import { ZoomService } from 'src/zoom/service/zoom/zoom.service';

@Controller('zoom')
export class ZoomController {
  constructor(private zoomService: ZoomService) {}

  @HttpCode(200)
  @Post('/token/:code')
  async getToken(@Param('code') code: string) {
    return this.zoomService.getToken(code);
  }

  @HttpCode(200)
  @Post('/refreshToken')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    return await this.zoomService.refreshZoomToken(refreshToken);
  }

  @HttpCode(201)
  @Post('/meeting')
  async createMeeting(@Body() meeting: zoomMeetinhCreateDto) {
    return await this.zoomService.createMeeting(meeting);
  }
}
