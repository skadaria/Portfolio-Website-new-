import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'sharklasers.com', 'temp-mail.org',
  '10minutemail.com', 'throwaway.email', 'yopmail.com', 'trashmail.com',
  'mailnesia.com', 'tempmail.com', 'tempinbox.com', 'fakeinbox.com',
  'dispostable.com', 'getnada.com', 'inboxkitten.com',
])

const VALID_TLDS = new Set([
  'com', 'org', 'net', 'edu', 'gov', 'io', 'co', 'app', 'dev', 'me',
  'info', 'biz', 'pro', 'name', 'xyz', 'online', 'site', 'tech', 'store',
  'blog', 'design', 'digital', 'events', 'guru', 'life', 'live',
  'media', 'news', 'plus', 'press', 'pub', 'school', 'shop', 'social',
  'space', 'studio', 'solutions', 'systems', 'today', 'uk', 'ca', 'au',
  'de', 'fr', 'jp', 'in', 'us', 'eu', 'nl', 'br', 'es', 'it', 'se',
  'no', 'dk', 'fi', 'pl', 'cz', 'at', 'ch', 'be', 'ie', 'nz', 'sg',
  'hk', 'za', 'ae', 'sa', 'il', 'tr', 'ru', 'cn', 'kr', 'tw', 'th',
  'ph', 'my', 'id', 'vn', 'ar', 'cl', 'mx', 'ro', 'hu', 'gr', 'pt',
])

function isLikelyFake(local: string, domainName: string): boolean {
  if (local.length < 2) return true
  if (/^[0-9]+$/.test(local)) return true
  if (/^(.)\1{3,}$/.test(local)) return true
  if (local.length > 48) return true

  const name = domainName.split('.')[0]
  if (name.length < 3) return true
  if (/^(.)\1{3,}$/.test(name)) return true
  if (/^[aeiou]+$/i.test(name)) return true

  const consonantRatio = (name.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length / name.length
  if (name.length >= 5 && consonantRatio > 0.75) return true

  return false
}

function isValidFormat(email: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)
}

async function validateDomain(domain: string): Promise<{ valid: boolean; reason?: string }> {
  const tld = domain.split('.').pop()?.toLowerCase()
  if (!tld || !VALID_TLDS.has(tld)) {
    return { valid: false, reason: 'Email domain does not exist' }
  }
  return { valid: true }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, projectType, message } = body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isValidFormat(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const domain = email.split('@')[1]
    const local = email.split('@')[0]

    if (isLikelyFake(local, domain)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (DISPOSABLE_DOMAINS.has(domain.toLowerCase())) {
      return NextResponse.json({ error: 'Temporary email addresses are not allowed' }, { status: 400 })
    }

    const domainCheck = await validateDomain(domain)
    if (!domainCheck.valid) {
      return NextResponse.json({ error: domainCheck.reason }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact — ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="margin:0 0 16px">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap;color:#666"><strong>Name</strong></td><td style="padding:6px 0">${name}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap;color:#666"><strong>Email</strong></td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap;color:#666"><strong>Subject</strong></td><td style="padding:6px 0">${subject}</td></tr>
            ${projectType ? `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap;color:#666"><strong>Project Type</strong></td><td style="padding:6px 0">${projectType}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="margin:0;white-space:pre-wrap">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
