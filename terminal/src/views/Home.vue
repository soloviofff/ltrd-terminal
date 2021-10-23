<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Multiposition/>
  </div>
</template>

<script>
// @ is an alias to /src
import Multiposition from '@/components/Multiposition.vue'

export default {
  name: 'Home',
  components: {
    Multiposition
  }
}
</script>
