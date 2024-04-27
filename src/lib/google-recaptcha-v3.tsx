'use client'
import React from 'react'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type GoogleReCaptchaProviderProps = {
  children: React.ReactNode
}

export function GoogleRecaptchaProvider({ children }: GoogleReCaptchaProviderProps) {
  const reCaptchaKey: string | undefined = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey ?? 'NOT DEFINED'}
      container={{
        parameters: {
          badge: 'inline',
          theme: 'light',
        },
      }}>
      {children}
    </GoogleReCaptchaProvider>
  )
}
