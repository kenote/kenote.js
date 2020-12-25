import session from 'express-session'
import { RequestHandler } from 'express'

declare function expressSession (options?: session.SessionOptions): RequestHandler[]

export = expressSession

declare module '@kenote/express' {
  interface Context {
    session: session.Session & Partial<session.SessionData> & { [key: string]: any }
    sessionID: string
  }
}