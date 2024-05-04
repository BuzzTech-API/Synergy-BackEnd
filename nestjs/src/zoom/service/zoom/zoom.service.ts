/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';



// garantir a Chamada do .env

@Injectable()
export class ZoomService {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  private clientId: string = this.configService.get<string>('CLIENT_ID')
  private clientSecret: string = this.configService.get<string>('CLIENT_SECRET')
  private redirectUri: string = this.configService.get<string>('REDIRECT_URI')



  async createMeeting(token: string, topic: string, start_time: string, duration: number, agenda: string, meeting_invitees: string[]) {
    const type = 2
    try {
      const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
        //assunto
        topic,
        //Descrição
        agenda,
        //constante -> Reunião marcada
        type,
        //yyyy-MM-ddTHH:mm:ssZ date-time format. For example, 2020-03-31T12:02:00Z
        start_time,
        //Em minutos
        duration,

        settings: {
          //video
          host_video: true,
          participant_video: true,
          //isso deixa o convidado entrar sem o host presente
          join_before_host: true,
          //muta essa porr*
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: 'both',
          auto_recording: 'none',
          meeting_invitees,
        },

      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const body = response.data;
      return body;

    } catch (error) {
      console.error('Error', error);
    }
  }


  async getToken(code: string) {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return (response);
  }


  async refreshZoomToken(refreshToken: string): Promise<string> {
    try {
      const response = await axios.post('https://zoom.us/oauth/token', null, {
        params: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${this.clientId}:${this.clientSecret}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw new HttpException('Error refreshing token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getMeetings(token: string) {
    try {
      const response = axios.get('https://api.zoom.us/v2/users/me/meetings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      console.error('Error', error);
    }
  }


}
