import { Controller, Get, Query, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ZoomService } from 'src/zoom/service/zoom/zoom.service';
@Controller('zoom')
export class ZoomController {

    constructor(private zoomService: ZoomService) {}



    @Get('/token')
    async getToken(code: string) {
        try {
          this.zoomService.getToken(code)
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
        throw new HttpException('Error refreshing token', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

