import '@kenote/express'
import { RequestHandler } from 'express'

declare function expressPassport (): RequestHandler[]

export = expressPassport

interface AuthInfo {}
interface User {}

declare module '@kenote/express' {
  interface Context {
    authInfo?: AuthInfo
    user?: User

    login(user: User, options?: any): Promise<void>
    logIn(user: User, options?: any): Promise<void>

    logout(): void
    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }
}

declare module '@kenote/core' {
  interface Context {
    authInfo?: AuthInfo
    user?: User

    login(user: User, options?: any): Promise<void>
    logIn(user: User, options?: any): Promise<void>

    logout(): void
    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }
}