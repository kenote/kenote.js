<template>
  <main>
    <slot></slot>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component<CustomPage>({
  name: 'page',
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 300)
    })
  }
})
export default class CustomPage extends Vue {}
</script>