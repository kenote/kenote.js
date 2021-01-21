import { ChannelDataNode } from '..'

/**
 * 获取当前 Channel key
 * @param channels 
 * @param routePath 
 */
export function getChannelKey<T extends ChannelDataNode<{}>> (channels: T[], routePath: string) {
  for (let channel of channels) {
    if (routePath.replace(/^\/|\/$/g, '') === channel.label) {
      return channel.key
    }
    if (channel.children) {
      let __key = findChannelKey<T>(channel.children, channel.key, routePath)
      if (__key) {
        return __key
      }
    }
  }
  return undefined
}

function findChannelKey<T extends ChannelDataNode<{}>> (navs: T[], key: string, routePath: string) {
  let __key: string | undefined
  for (let nav of navs) {
    if (nav.children) {
      let __nav = nav.children.find( o => o.index === routePath )
      if (__nav) {
        return key
      }
      else {
        __key = findChannelKey(nav.children, key, routePath)
      }
    }
    else if (nav.route === routePath) {
      return key
    }
  }
  return __key
}