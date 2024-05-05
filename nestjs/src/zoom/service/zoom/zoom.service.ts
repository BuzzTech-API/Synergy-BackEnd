/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { lastValueFrom } from 'rxjs';


// garantir a Chamada do .env

@Injectable()
export class ZoomService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
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
    try {
      // Configurações para o basic auth
      const credentials = `${this.clientId}:${this.clientSecret}`
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      const basicAuthHeader = `Basic ${encodedCredentials}`;

      // Parametros da rota
      const data = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri
      }
    
      // Enviando a requisição POST para obter o token de acesso
      const response = this.httpService.post(`https://zoom.us/oauth/token`, data, {
        headers: {
          Authorization: basicAuthHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      
      // Aguardando a conclusão da requisição e obtendo os dados da resposta
      return (await lastValueFrom(response)).data

    } catch (error) {
      console.error("Erro da API do Zoom:", error.response ? error.response.data : error.message);

      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST)
    }
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
