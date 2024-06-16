/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { CreateMeeting } from 'src/common/utils/types'


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

  private generateBasicAuthHeader(): string {
    const credentials = `${this.clientId}:${this.clientSecret}`
    const encodedCredentials = Buffer.from(credentials).toString('base64')
    return `Basic ${encodedCredentials}`
  }


  async createMeeting(createMeeting: CreateMeeting) {
    const { topic, agenda, start_time, duration, meeting_invites, access_token, refresh_token } = createMeeting
    const type = 2
    try {
      const response = this.httpService.post('https://api.zoom.us/v2/users/me/meetings',
        {
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
            meeting_invites,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
        })

      return (await lastValueFrom(response)).data

    } catch (error) {
      console.error('Erro ao criar a reunião:', error.response ? error.response.data : error.message);

      try {
        const tokens = JSON.parse(await this.refreshZoomToken(refresh_token));

        const response = this.httpService.post('https://api.zoom.us/v2/users/me/meetings',
          {
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
              meeting_invites,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`
            },
          })

        return (await lastValueFrom(response)).data

      } catch (error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao criar a reunião',
        }, HttpStatus.INTERNAL_SERVER_ERROR);

      }
    }
  }


  async getToken(code: string) {
    try {
      // Configurações para o basic auth
      const basicAuthHeader = this.generateBasicAuthHeader()

      // Parametros da rota
      const data = {
        code: code,
        grant_type: 'client_credentials',
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
      console.error("Erro da API do Zoom:", error.response ? error.response.data : error.message)

      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST)
    }
  }


  async refreshZoomToken(refreshToken: string): Promise<string> {
    try {
      const params = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
      const basicAuthHeader = this.generateBasicAuthHeader()

      const response = this.httpService.post('https://zoom.us/oauth/token', params, {
        headers: {
          Authorization: basicAuthHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })

      return (await lastValueFrom(response)).data
    } catch (error) {
      console.error("Erro da API do Zoom:", error.response ? error.response.data : error.message)

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async getMeetings(token: string) {
    try {
      const response = this.httpService.get('https://api.zoom.us/v2/users/me/meetings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      return (await lastValueFrom(response)).data
    } catch (error) {
      console.error('Erro ao obter as reuniões:', error.response ? error.response.data : error.message);

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao obter as reuniões',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
