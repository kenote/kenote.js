import '@kenote/express'
import { RequestHandler } from 'express'

declare function expressPassport (): RequestHandler[]

export = expressPassport

declare module '@kenote/express' {
  interface Context {
    authInfo?: Express.AuthInfo
    user?: Express.User

    login(user: Express.User, options?: any): Promise<void>
    logIn(user: Express.User, options?: any): Promise<void>

    logout(): void
    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }
}

declare module '@kenote/core' {
  interface Context {
    authInfo?: Express.AuthInfo
    user?: Express.User

    login(user: Express.User, options?: any): Promise<void>
    logIn(user: Express.User, options?: any): Promise<void>

    logout(): void
    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }
}