<template>
  <q-layout view="lHh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-tabs align="left">
          <q-route-tab to="/instance/1" label="Main Instance" />
          <q-route-tab to="/page2" label="Bot One" />
          <q-route-tab to="/page3" label="Create new bot" />
        </q-tabs>
      </q-toolbar>
      
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <div class="q-pa-md aside" style="max-width: 350px">
        <q-list bordered separator>
          <q-item clickable v-ripple to="/instance/1"> 
            <q-item-section>Instances List</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/instance/2">
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>Create Instance Button</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- <q-btn v-if="isAuthenticatedComputed" flat style="color: #FF0080" @click="logout">Logout</q-btn>
        <q-btn v-else flat style="color: #FF0080" @click="login">Log In</q-btn> -->
      </div>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style lang="sass" scoped>
  .aside
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: inherit
    min-height: 100vh
    padding: 0

</style>
