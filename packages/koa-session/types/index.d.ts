import session from 'koa-generic-session'
import koaSession from '../src'

export default koaSession

declare module '@kenote/koa' {
  interface Context {
    session: session.Session | null
    sessionSave: boolean | null
    regenerateSession(): Generator
  }
}