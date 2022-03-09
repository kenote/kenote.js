import { Component, Vue } from 'nuxt-property-decorator'
import { Store } from '~/store'
import type { User } from '@/src/entities'

@Component<BaseMixin>({
  name: 'base-mixin'
})
export default class BaseMixin extends Vue {

  @Store.Auth.State
  auth!: User | null

  @Store.Auth.Getter
  username!: string

  @Store.Auth.Getter
  jwtoken!: string

}