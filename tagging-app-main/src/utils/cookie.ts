import { userData } from '@/types'
import { signToken, verifyToken } from '@/services/jwt'
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'USER_DATA'

export async function getUser() {
  const data = cookies().get(COOKIE_NAME)
  if (data) {
    return await verifyToken(data.value.replace('"', ''))
  }
  return null
}

export async function setUser(userData: userData, response?: NextResponse) {
  const data = JSON.stringify(await signToken(userData))
  const cookie: ResponseCookie = {
    name: COOKIE_NAME,
    value: data,
    expires: Date.now() + 1209600000,
    httpOnly: true,
    sameSite: 'strict',
    secure: false
  }
  if (response) {
    response.cookies.set(cookie)
    return response
  }
  return cookies().set(cookie)
}
