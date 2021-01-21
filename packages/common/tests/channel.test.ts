
import { getChannelKey } from '../src'
import { ChannelDataNode } from '..'

const channels: Array<ChannelDataNode<{}>> = [
  {
    key: '1',
    name: '我的帐户',
    label: 'account',
    children: [
      {
        key: '1-1',
        name: '帐户管理',
        children: [
          {
            key: '1-1-1',
            name: '基本资料',
            route: '/account/baseinfo'
          },
          {
            key: '1-1-2',
            name: '安全设置',
            route: '/account/security'
          },
          {
            key: '1-1-3',
            name: '我的收藏',
            route: '/account/collect'
          },
        ]
      },
      {
        key: '1-2',
        name: '消息中心',
        children: [
          {
            key: '1-2-1',
            name: '全部消息',
            route: '/account/notification/all'
          },
          {
            key: '1-2-2',
            name: '未读消息',
            route: '/account/notification/unread'
          },
          {
            key: '1-2-3',
            name: '已读消息',
            route: '/account/notification/read'
          },
        ]
      },
    ]
  },
  {
    key: '2',
    name: '用户中心',
    label: 'ucenter',
    children: [
      {
        key: '2-1',
        name: '用户管理',
        children: [
          {
            key: '2-1-1',
            name: '用户组',
            route: '/ucenter/group'
          },
          {
            key: '2-1-2',
            name: '查询用户',
            route: '/ucenter/user'
          },
          {
            key: '2-1-3',
            name: '注册邀请',
            route: '/ucenter/ticket'
          },
          {
            key: '2-1-4',
            name: '团队',
            route: '/ucenter/team'
          }
        ]
      }
    ]
  },
]

describe('\nTests ChannelDataNode', () => {

  test('getChannelKey', () => {
    let key = getChannelKey(channels, '/ucenter/user')
    expect(key).toEqual('2')
  })
})