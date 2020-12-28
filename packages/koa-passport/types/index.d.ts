import '@kenote/koa'
import { Middleware } from 'koa'

declare function koaPassport (): Middleware[]

export = koaPassport

declare module '@kenote/koa' {
  interface Context {
    user?: any

    login(user: any, options?: any): Promise<void>
    logIn(user: any, options?: any): Promise<void>

    logout(): void
    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }
}

declare module '@kenote/core' {
  interface Context {
    user?: any

    login(user: any, options?: any): Promise<void>
    logIn(user: any, options?: any): Promise<void>

    logout(): void
    logOut(): void

    isAuthenticated(): boolean
    isUnauthenticated(): boolean
  }
}