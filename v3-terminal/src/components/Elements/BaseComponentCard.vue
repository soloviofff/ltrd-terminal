<template>
  <q-card class="my-card" flat bordered>
    <slot name="header"></slot>

    <q-card-section>
      <slot></slot>
    </q-card-section>

    <q-card-actions>
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<style>
</style>

<script>
// https://apexcharts.com/vue-chart-demos/candlestick-charts/
export default {
  name: 'BaseComponentCard',
  data(){
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 200px
</style>
