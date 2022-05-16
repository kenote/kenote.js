import type { Method, FilterQuery } from '@kenote/common'
import type { Context } from '@kenote/core'
import type { FilterData, ParseData } from 'parse-string'
import type { HttpRequest } from './http'
import { TCPSocket } from '@kenote/protobuf'
import { Socket } from './socket'

export declare namespace APIProxy {

  /**
   * 入口配置
   */
  interface Entrance {
    /**
     * 入口名称
     */
    name                 : string
    /**
     * 简介描述
     */
    description         ?: string
    /**
     * 路由配置
     */
    router               : Router[]
    /**
     * 设置白名单
     */
    whitelist           ?: string[]
    /**
     * 鉴权配置
     */
    authentication      ?: Authentication[]
    /**
     * 请求验证器
     */
    payload             ?: FilterData.options[]
    /**
     * 参数映射
     */
    props               ?: Record<string, string> 
    /**
     * 内部服务代理
     */
    service             ?: ServiceProxy
    /**
     * HTTP代理
     */
    httpProxy           ?: HttpRequest
    /**
     * Socket代理
     */
    socketProxy         ?: Socket.Request
    /**
     * 数据解析器
     */
    parse               ?: ParseOptions
    /**
     * 指定解析字段
     */
    parseField          ?: string
    /**
     * 使用原生模式
     */
    native              ?: boolean | 'json'
    /**
     * 频道路径
     */
    channelPath         ?: string
  }

  /**
   * 数据解析选项
   */
  interface ParseOptions {
    /**
     * 需要解析的字段路径
     */
    path                ?: string
    /**
     * 解析设置
     */
    options             ?: ParseData.parse | ParseData.parse[]
    /**
     * 默认值
     */
    defaultValues       ?: any
    /**
     * 处理函数
     */
    exec                ?: string
  }

  /**
   * 入口选项
   */
  interface EntranceOptions<T> {
    /**
     * 频道标签
     */
    channel              : string
    /**
     * 路径标签
     */
    pathLabel            : string
    /**
     * 自定义函数集
     */
    customize           ?: Record<string, Function>
    /**
     * 获取当前用户函数
     */
    getUser              : () => Promise<T> | T
    /**
     * 定义沙盒对象
     */
    sandbox             ?: Record<string, unknown>
  }
  
  /**
   * 路由配置
   */
  interface Router {
    /**
     * 请求方式
     */
    method               : Method
    /**
    * 请求路径
    */
    path                 : string
  }

  /**
   * 频道配置
   */
  interface ChannelSetting extends Partial<Socket.Configure> {
    /**
     * 设置白名单
     */
    whitelist           ?: string[]
    /**
     * Js 映射表
     */
    jsAlias             ?: Record<string, string>
  }

  /**
   * 模块选项
   */
  interface ModuleOptions {
    /**
     * 工作路径
     */
    cwd                 ?: string
    /**
     * 模块映射表
     */
    alias               ?: Record<string, string>
    /**
     * 沙盒对象
     */
    sandbox             ?: Record<string, unknown>
  }

  /**
   * 代理层选项
   */
  interface ProxyOptions {
    /**
     * 频道配置
     */
    setting             ?: ChannelSetting
    /**
     * 服务模块
     */
    serviceModules      ?: Record<string, any>
    /**
     * 日志函数对象
     */
    logger              ?: TCPSocket.Logger
    /**
     * 控制器上下文
     */
    ctx                 : Context
  }

  /**
   * 内部服务代理
   */
  interface ServiceProxy {
    /**
     * 名称
     */
    name                 : string
    /**
     * 选项
     */
    args                ?: any[]
  }

  /**
   * 鉴权配置
   */
  interface Authentication {
    /**
     * 类型
     */
    type                 : 'jwt' | 'sign'
    /**
     * JWT选项
     */
    jwt                 ?: FilterQuery<any>
    /**
     * 验签选项
     */
    sign                ?: SignOptions
  }

  /**
   * 验签选项
   */
  interface SignOptions {
    /**
     * 验签密钥
     */
    token               ?: string | TokenOptions[]
    /**
     * 验签格式
     */
    md5                  : string
    /**
     * 验签字段名称；默认 sign
     */
    field               ?: string
    /**
     * 调试模式
     */
    debug               ?: boolean
  }

  /**
   * 密钥选项
   */
  interface TokenOptions {
    /**
     * 密钥 Key
     */
    key                  : string
    /**
     * 密钥名称
     */
    name                 : string
    /**
     * 关联 Tag
     */
    tags                 : string[]
  }

  /**
   * 入口信息
   */
  interface EntranceState {
    /**
     * 没有找到入口
     */
    notFound            ?: boolean
    /**
     * 是否登录用户
     */
    isUser              ?: boolean | 'Unauthorized'
    /**
     * 鉴权配置
     */
    authenticationState ?: APIProxy.Authentication | null
    /**
     * 入口配置
     */
    entrance            ?: APIProxy.Entrance
    /**
     * 频道配置
     */
    setting             ?: APIProxy.ChannelSetting
    /**
     * 服务模块集
     */
    serviceModules      ?: Record<string, any>
    /**
     * 经过过滤的提交数据
     */
    payload             ?: any
    /**
     * 频道路径
     */
    channelPath         ?: string
  }


  type EntranceResult = [ string, any ]
}

/**
 * 映射对象
 * @param props 
 */
export declare function parseProps (): (data: Record<string, any>) => Record<string, any>
export declare function parseProps (): (data: Record<string, any>, tag: string) => Record<string, any>
export declare function parseProps (props: Record<string, string>): (data: Record<string, any>) => Record<string, any>
export declare function parseProps (props: Record<string, string>): (data: Record<string, any>, tag: string) => Record<string, any>

/**
 * 获取入口信息
 * @param options 
 * @returns 
 */
export declare function getEntrance<T> (options: APIProxy.EntranceOptions<T>): (ctx: Context, pathname: string) => Promise<APIProxy.EntranceState>

/**
 * 获取代理返回数据
 * @param entrance 
 * @param payload 
 * @returns 
 */
export declare function getProxyResponse (entrance: APIProxy.Entrance | undefined, payload: any): (options: APIProxy.ProxyOptions) => Promise<APIProxy.EntranceResult>