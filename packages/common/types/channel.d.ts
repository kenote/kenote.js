import { CommonDataNode } from './datanode'

interface CommonChannelDataNode extends Pick<CommonDataNode, Exclude<keyof CommonDataNode, 'children' | 'maps'>> {
  /**
   * 标识
   */
  label                ?: string
  /**
   * 描述
   */
  description          ?: string
  /**
   * 默认页面
   */
  index                ?: string
  /**
   * 图标
   */
  icon                 ?: string
  /**
   * 路由
   */
  route                ?: string
  /**
   * 子集
   */
  children             ?: this[]
  /**
   * Maps
   */
  maps                 ?: Array<Pick<this, 'key' | 'name'>>
  /**
   * 选项
   */
  options              ?: Record<string, any>
}

/**
 * Channel 数据节点
 */
export declare type ChannelDataNode<T extends {}> = CommonChannelDataNode & {
  [P in keyof T]?: T[P]
}

/**
 * 获取当前 Channel key
 * @param channels 
 * @param routePath 
 */
export function getChannelKey<T extends ChannelDataNode<{}>> (channels: T[], routePath: string): string | undefined
export function getChannelKey<T extends ChannelDataNode<{}>> (channels: T[], routePath: string, name: string): string | undefined
