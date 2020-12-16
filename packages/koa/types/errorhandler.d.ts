import { KoaEngine } from './'

interface Options {
  log   ?: boolean
}

declare function errorhandler (options?: Options): KoaEngine.ErrorHandler

export default errorhandler