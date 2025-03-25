import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface FormData {
  name: string
  email: string
  age: number
  phone: string
  occupation?: string
  location: string
  investment: string
  como_nos_conociste?: string
  why?: string
}

export async function POST (request: Request): Promise<NextResponse> {
  try {
    const formData = await request.json() as FormData

    const { name, email, age, phone, occupation, location, investment, como_nos_conociste: comoNosConociste, why } = formData

    const data = await resend.emails.send({
      from: 'Clic Pilates <onboarding@resend.dev>',
      to: ['franquicias@clicpilates.com'],
      subject: 'Nueva solicitud de franquicia',
      html: `
        <h2>Nueva solicitud de franquicia</h2>
        <p><strong>Nombre:</strong> ${String(name)}</p>
        <p><strong>Email:</strong> ${String(email)}</p>
        <p><strong>Edad:</strong> ${String(age)}</p>
        <p><strong>Teléfono:</strong> ${String(phone)}</p>
        <p><strong>Ocupación:</strong> ${occupation !== undefined ? String(occupation) : 'No especificado'}</p>
        <p><strong>Ubicación deseada:</strong> ${String(location)}</p>
        <p><strong>Inversión:</strong> ${String(investment)}</p>
        <p><strong>¿Cómo nos conociste?:</strong> ${comoNosConociste !== undefined ? String(comoNosConociste) : 'No especificado'}</p>
        <p><strong>¿Por qué quiere abrir un Clic Studio Pilates?:</strong> ${why !== undefined ? String(why) : 'No especificado'}</p>
      `
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
