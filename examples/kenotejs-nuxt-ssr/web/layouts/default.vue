<template>
  <div>
    <header>
      <div class="header-wrapper">
        <div class="header-logo">
          <n-link to="/">
            <img src="/logo.png" class="x-logo" />
          </n-link>
        </div>
        <nav class="header-main">
          <n-link to="/">Home</n-link>
          <n-link to="/docs">Docs</n-link>
          <n-link to="/api">API</n-link>
          <n-link to="/examples">Examples</n-link>
          <n-link to="/blog">Blog</n-link>
          <n-link to="/showcase">Showcase</n-link>
          <a v-if="auth" @click="handleLogout">Logout</a>
          <n-link v-else to="/login">Login</n-link>
        </nav>
      </div>
    </header>
    <nuxt></nuxt>
    <footer>

    </footer>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import BaseMixin from '~/mixins/base'
import '~/assets/less/layout/default.less'
import { HttpResult } from '@/types/client'
import { Types } from '~/store'

@Component<DefaultLayout>({
  /**
   * 设置页面头信息
   */
  head: {
    title: 'kenotejs-nuxt-ssr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
})
export default class DefaultLayout extends mixins(BaseMixin) {

  handleLogout () {
    setTimeout(async () => {
      try {
        let result = await this.$httpClient({ token: this.jwtoken }).get<HttpResult<{ result: boolean }>>('/logout')
        if (result?.data?.result) {
          this.$store.commit(Types.auth.SETAUTH, null)
          this.$router.push(`/login?url_callback=${this.$route.path}`)
          return
        }
      } catch (error) {
        this.$message.error((<Error>error).message)
      }
    }, 300)
  }
}
</script>