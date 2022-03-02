import { ExtractJwt, Strategy, StrategyOptions, VerifyCallbackWithRequest } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { loadConfig } from '@kenote/config'
import { ServerConfigure } from '@/types/config'
import * as service from '~/services'
import { MiddlewareFn } from 'type-graphql'
import { Context } from '@kenote/core'

const { secretKey } = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })

/**
 * JWT Payload 类型；用于存储用户标记
 */
export declare interface Jwtpayload {
  /**
   * 用户标记
   */
  id: number
}

/**
 * JWT 选项
 */
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  secretOrKey: secretKey
}

/**
 * 验证 JWT 策略
 * @param req
 * @param payload
 * @param done
 */
const strategyVerify: VerifyCallbackWithRequest = async (req, payload: Jwtpayload, done) => {
  let jwtoken = req.headers.authorization?.replace(/^(Bearer)\s{1}/, '')
  try {
    // 认证 Token
    let user = await service.db.user.findOne({ id: payload.id, jwtoken })
    if (user == null) {
      return done(null, false)
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}

/**
 * 定义 JWT 策略
 */
export const strategyJwt = new Strategy(jwtOptions, strategyVerify)

/**
 * 设置 JWT Token
 * @param payload
 * @param options
 */
export const setJwToken = (payload: Jwtpayload, options?: jwt.SignOptions) => jwt.sign(payload, <jwt.Secret>jwtOptions.secretOrKey, options)

/**
 * 验证 JWT Token
 * @param token
 * @param options
 * @returns
 */
export const verifyJwToken = (token: string, options?: jwt.VerifyOptions) => token
  ? <Jwtpayload>jwt.verify(token, <jwt.Secret>jwtOptions.secretOrKey, options)
  : null

/**
 * 判断 Authorization 中间件
 * @param context 
 * @param next 
 * @returns 
 */
export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  let { httpError, ErrorCode } = service
  let jwtoken = context.req.headers.authorization?.replace(/^(Bearer)\s{1}/, '')
  if (!jwtoken) {
    throw httpError(ErrorCode.ERROR_AUTH_FLAG_ACCESS)
  }
  try {
    context.payload = verifyJwToken(jwtoken ?? '')
  } catch (error) {
    throw httpError(ErrorCode.ERROR_AUTH_FLAG_ACCESS)
  }
  return await next()
}
