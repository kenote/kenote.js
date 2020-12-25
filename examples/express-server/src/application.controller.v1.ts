import { Module } from '@kenote/core'
import UserController from './controller/v1/user'

@Module({
  path: '/v1',
  controller: [ UserController ],
  options: {
    
  }
})
export default class ControllerV1Module {}