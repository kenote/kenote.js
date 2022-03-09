<template>
  <page>
    <el-card shadow="never" class:native="main-card">
      <h3>User Login</h3>
      <el-form ref="loginForm" :model="values" :rules="rules" @submit.native.prevent="handleSubmit" label-width="6rem">
        <el-form-item label="Username" prop="username" :rules="rules.username">
          <el-input v-model="values.username" placeholder="Please enter Username" />
        </el-form-item>
        <el-form-item label="Password" prop="password" :rules="rules.password">
          <el-input v-model="values.password" type="password" placeholder="Please enter Password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Login In</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </page>
</template>

<script lang="ts">
import { Component, mixins, Provide, Ref, Watch } from 'nuxt-property-decorator'
import BaseMixin from '~/mixins/base'
import { FilterData } from 'parse-string'
import { Form as ElForm } from 'element-ui'
import { HttpResult } from '@/types/client'
import { Types } from '~/store'
import type { User } from '@/src/entities'

interface FormData {
  username   ?: string
  password   ?: string
}

@Component<CustomPage>({
  middleware: 'unauthenticated',
})
export default class CustomPage extends mixins(BaseMixin) {

  @Provide()
  values: FormData = {}

  @Provide()
  rules: Partial<Record<keyof FormData, FilterData.rule[]>> = {
    username: [
      { required: true, message: 'Please enter Username' }
    ],
    password: [
      { required: true, message: 'Please enter Password' }
    ]
  }

  @Ref()
  readonly loginForm!: ElForm

  @Watch('auth')
  onAuthChange (val: User, oldVal: User) {
    if (val === oldVal) return
    if (val) {
      let { url_callback } = this.$route.query
      this.$router.push(<string>url_callback ?? '/')
    }
  }

  handleSubmit () {
    this.loginForm.validate(async valid => {
      if (valid) {
        try {
          let result = await this.$httpClient().post<HttpResult<User>>('/login', this.values)
          if (result?.error) {
            this.$message.error(result.error)
          }
          else {
            this.$store.commit(Types.auth.SETAUTH, result?.data)
          }
        } catch (error) {
          this.$message.error((<Error>error).message)
        }
      }
      return false
    })
  }

}
</script>