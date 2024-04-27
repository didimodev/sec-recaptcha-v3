import { NextResponse } from 'next/server'

import axios from 'axios'

export async function POST(request: Request) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY
  const URL = process?.env?.URL_RECAPTCHA || ''
  const { token } = await request.json()

  let res: any
  const formData = `secret=${secretKey}&response=${token}`

  try {
    res = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, isRobot: true, isChecked: false })
  }

  if (res && res.data?.success && res.data?.score > 0.7) {
    return NextResponse.json({
      success: true,
      isRobot: false,
      isChecked: true,
    })
  } else {
    return NextResponse.json({ success: false, isRobot: false, isChecked: true })
  }
}
