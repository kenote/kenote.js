import type { FilterQuery } from '@kenote/common'
import type { FilterData } from 'parse-string'
import { APIProxy } from './api-proxy'
import { Socket } from './socket'
import type { HttpRequest } from './http'
import Pubsub from './pubsub'
import { TCPSocket } from '@kenote/protobuf'

export declare namespace NodeProxy {

  /**
   * 代理选项
   */
  interface Options {
    /**
     * 路径名称
     */
    pathname   : string
    /**
     * 前缀字符
     */
    prefix               : string
    /**
     * 订阅发布器
     */
    pubsub               : Pubsub
    /**
     * 验证 Token
     */
    verifyToken          : (token?: string[]) => Promise<any>
    /**
     * 日志函数对象
     */
    logger              ?: TCPSocket.Logger
  }

  /**
   * 入口选项
   */
  interface EntranceOptions {
    /**
     * 频道标签
     */
    channel              : string
    /**
     * 路径标签
     */
    pathLabel            : string
    /**
     * 定义沙盒对象
     */
    sandbox             ?: Record<string, unknown>
  }

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
     * 设置白名单
     */
    whitelist           ?: string[]
    /**
     * 过滤鉴权用户
     */
    filterAuth          ?: FilterQuery<any>
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
    service             ?: APIProxy.ServiceProxy
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
    parse               ?: APIProxy.ParseOptions
    /**
     * 指定解析字段
     */
    parseField          ?: string
  }

  /**
   * 请求参数
   */
  interface Request {
    /**
     * 频道
     */
    channel              : string
    /**
     * 接口名
     */
    pathLabel            : string
    /**
     * 客户端 IP
     */
    clientIP            ?: string
    /**
     * 请求 Body
     */
    body                ?: Record<string, any>
    /**
     * 鉴权用户
     */
    auth                ?: any
  }

  /**
   * 返回数据
   */
  interface Response {
    /**
     * 路径
     */
    path                 : string
    /**
     * 时间戳
     */
    timestamp            : number
    /**
     * 返回数据
     */
    data                ?: any
    /**
     * 错误
     */
    error               ?: string
  }

  /**
   * 代理层选项
   */
  interface ProxyOptions {
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
    // ctx                 : Request
    /**
     * 频道配置
     */
    setting             ?: APIProxy.ChannelSetting
  }


  /**
   * 入口信息
   */
  interface EntranceState {
    /**
     * 入口配置
     */
    entrance            ?: NodeProxy.Entrance
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
  }

  type EntranceResult = [ string, any ]
}

/**
 * 获取 Websocket 入口信息
 * @param options 
 * @returns 
 */
export declare function getNodeEntrance(options: NodeProxy.EntranceOptions): (ctx: NodeProxy.Request, pathname: string) => Promise<NodeProxy.EntranceState>

/**
 * 获取代理返回数据
 * @param ctx 
 * @returns 
 */
export declare function getNodeResponse(entrance: NodeProxy.Entrance | undefined, payload: any): (options: NodeProxy.ProxyOptions) => Promise<NodeProxy.EntranceResult>

/**
 * 转换返回结果
 * @param path 
 * @param data 
 * @returns 
 */
export declare function toResponseResult(path: string, data: any): string
export declare function toResponseResult(path: string, data: any, type: string): string