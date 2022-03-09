import Redis from 'ioredis'

export declare interface ServerConfigure {
  /**
   * 名称
   */
  name                 : string
  /**
   * 服务器IP
   */
  host                 : string
  /**
   * 服务器端口
   */
  port                 : number
  /**
   * secret
   */
  secretKey            : string
  /**
   * Redis 配置
   */
  redisOpts           ?: Redis.RedisOptions
  /**
   * 生产环境下使用 ts-node 运行
   */
  tsnode              ?: true
}