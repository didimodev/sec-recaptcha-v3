'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import PATTERNS from '~/shared/patterns'
import axios from 'axios'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const FormSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido.')
    .regex(PATTERNS.EMAIL, {
      message: 'Informe um e-mail válido.',
    })
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(8, {
      message: 'Senha deve conter no mínimo 8 caracteres.',
    })
    .max(35, {
      message: 'Senha deve conter no máximo 35 caracteres.',
    })
    .regex(PATTERNS.PASSWORD, {
      message: 'Informe uma senha válida forte, caracteres especiais, letras e números.',
    }),
})

export default function LoginReCaptchaPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors } = form.formState
  const { executeRecaptcha } = useGoogleReCaptcha()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!executeRecaptcha) {
      toast.error('Erro ao verificar ReCaptcha.')
      return
    }
    const token = await executeRecaptcha('loginSubmit')

    const response = await axios({
      method: 'post',
      url: '/api/recaptcha-verify',
      data: {
        token,
      },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.error)
    }
  }

  return (
    <main className="bg-black w-screen h-screen">
      <Image
        src="/ellipse-one.png"
        alt="Next.js logo"
        width={1000}
        height={1000}
        className="absolute top-0 left-0"
      />
      <Image
        src="/ellipse-two.png"
        alt="Next.js logo"
        width={1000}
        height={1000}
        className="absolute bottom-0 right-0"
      />

      <div className="flex justify-center items-center w-full h-full">
        <Card className="w-[90%] sm:w-[697px] h-[620px] justify-center items-center bg-white/5 border-[0] rounded-[50px] z-10 ">
          <CardHeader className="flex flex-col justify-end h-[30%]">
            <CardTitle className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-2xl sm:text-[36px] text-center">
              Acesso com reCaptcha
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm text-white">
              Preencha as informações corretamente para se autenticar na plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[70%] justify-center items-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] sm:w-2/3 space-y-7">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="*E-mail"
                          {...field}
                          className="text-slate-50 h-11 sm:h-[50px] rounded-[15px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*Senha"
                          {...field}
                          className="text-slate-50 h-11 sm:h-[50px] rounded-[15px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={Object.keys(errors).length > 0}
                  className="w-full mt-[47px] bg-white/20 h-10 sm:h-[55px] rounded-[12px] text-[20px] text-[#C4C4C4] border-[1px] border-white/20 border-solid hover:bg-white/30 hover:text-white transition-all duration-300 ease-in-out"
                  type="submit">
                  Entrar
                </Button>
              </form>
            </Form>
            <hr className="w-[90%] sm:w-2/3 bg-white/80 h-[1px] mt-[45px] mb-[30px]" />
            <p className="w-[90%] sm:w-2/3 text-white text-center font-light text-xs sm:text-sm">
              {' '}
              Este site é protegido por reCAPTCHA e a{' '}
              <Link
                className="font-bold"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer">
                Política de Privacidade
              </Link>{' '}
              e{' '}
              <Link
                className="font-bold"
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer">
                Termos de Serviço
              </Link>{' '}
              do Google se aplicam.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
