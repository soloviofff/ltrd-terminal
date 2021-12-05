<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'MainFile',
  inject:  ['Auth'],
  components: {
    MainLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>
