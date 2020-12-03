import { Request } from 'express'

export function getClientIP (req: Request) {
  let headers = req.headers
  return headers['x-forwarded-for'] as string || headers['x-real-ip'] as string || req.connection.remoteAddress || req.ip
}
