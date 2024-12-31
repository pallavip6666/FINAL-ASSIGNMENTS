import { userData } from '@/types'
import { CompactSign, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.SECRET)

export async function signToken (data: object) {
  const jwt = await new CompactSign(
    new TextEncoder().encode(JSON.stringify(data))
  )
    .setProtectedHeader({ alg: 'HS256' })
    .sign(SECRET)
  return jwt
}
export async function verifyToken (token: string): Promise<userData | null> {
  const result = await jwtVerify(token, SECRET)
  return result.payload as userData
}
