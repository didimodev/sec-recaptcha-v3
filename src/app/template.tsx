'use client'
import React from 'react'

import { GoogleRecaptchaProvider } from '~/lib/google-recaptcha-v3'
interface RootTemplateProps {
  children: React.ReactNode
}

export default function RootTemplate({ children }: RootTemplateProps) {
  return <GoogleRecaptchaProvider>{children}</GoogleRecaptchaProvider>
}
