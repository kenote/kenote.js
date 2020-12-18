import { Metadata } from '..'

class MetadataArgsStorge {

  /**
   * Controller MetaData
   */
  controllers: Metadata.ControllerArgs[] = []

  /**
   * Action MetaData
   */
  actions: Array<Metadata.ActionArgs | Metadata.BindActionArgs> = []

  /**
   * Middleware metaData
   */
  middlewares: Metadata.MiddlewareArgs[] = []

  /**
   * Application
   */
  application: Metadata.Application = {
    routeController: []
  }

  /**
   * 重置
   */
  reset () {
    this.controllers = []
    this.actions = []
    this.middlewares = []
    this.application = {
      routeController: []
    }
  }
}

/**
 * MetadataArgsStorage 对象
 */
export function getMetadataArgsStorage (): MetadataArgsStorge {
  if (!(global as any).controllersMetadataArgsStorage) {
    (global as any).controllersMetadataArgsStorage = new MetadataArgsStorge()
  }
  return (global as any).controllersMetadataArgsStorage
}