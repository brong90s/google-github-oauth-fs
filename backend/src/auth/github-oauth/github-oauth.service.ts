import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class GithubOauthService {
  async githubAccessToken(code) {
    if(!code) {
      throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST)
    }

    const token = await axios.post(
      'https://github.com/login/oauth/access_token', 
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code.code
      }, 
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )

    console.log('token.data', token.data)

    const userEmail = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${token.data.access_token}`
      }
    })

    console.log('email', userEmail.data)
  }
}
