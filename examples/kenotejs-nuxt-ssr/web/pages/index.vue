<template>
  <page>
    <el-card shadow="never" class:native="main-card">
      <h3>Home</h3>
      <span>{{ $route.path }}</span>
    </el-card>
  </page>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import BaseMixin from '~/mixins/base'

@Component<CustomPage>({
  
})
export default class CustomPage extends mixins(BaseMixin) {

}
</script>