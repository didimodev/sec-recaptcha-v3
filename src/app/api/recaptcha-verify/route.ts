import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

interface RecaptchaData {
  token: string
}

export async function POST(request: NextRequest) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY
  const URL = process?.env?.URL_RECAPTCHA || ''

  if (!secretKey) {
    return NextResponse.json({ success: false, error: 'Erro de configuração no servidor.' })
  }

  const { token }: RecaptchaData = await request.json()
  const formData = `secret=${secretKey}&response=${token}`

  try {
    const { data } = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (data.success && data.score > 0.7) {
      return NextResponse.json({ success: true, message: 'ReCaptcha verificado com sucesso!' })
    } else {
      return NextResponse.json({ success: false, error: 'ReCaptcha falhou na verificação!' })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro interno do servidor.' })
  }
}
