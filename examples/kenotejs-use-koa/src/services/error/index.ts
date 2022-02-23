import createError, { HttpError } from 'http-errors'
import { Context, NextHandler } from '@kenote/core'
import { format } from 'util'
import Code from './code'
import Message from './message'

const SYSTEM_MINSAFE_ERROR_CODE: number = process.env.SYSTEM_MINSAFE_ERROR_CODE ? Number(process.env.SYSTEM_MINSAFE_ERROR_CODE) : 1000

export function nextError (error: HttpError, ctx: Context, next: NextHandler) {
  if (error?.code >= SYSTEM_MINSAFE_ERROR_CODE) {
    ctx.api(null, error)
  } else {
    return next(error)
  }
}

export function httpError (code: number, opts?: Array<string | number | null>) {
  let message: string = ''
  for (const [key, val] of Object.entries(Code)) {
    if (code === val) {
      message = Message[key]
      break
    }
  }
  message = format(message, ...[...opts ?? []])
  return createError(500, message, { code })
}

export const ErrorCode = Code
export const ErrorMessage = Message
