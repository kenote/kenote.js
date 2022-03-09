<template>
  <page>
    <el-descriptions class="margin-top" title="用户信息" :column="2" :labelStyle="{ width: '10rem' }" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Username
        </template>
        {{ username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-lock"></i>
          Password
        </template>
        {{ auth.password }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          JWToken
        </template>
        {{ jwtoken }}
      </el-descriptions-item>
    </el-descriptions>
  </page>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import BaseMixin from '~/mixins/base'

@Component<CustomPage>({
  middleware: 'authenticated',
})
export default class CustomPage extends mixins(BaseMixin) {

}
</script>