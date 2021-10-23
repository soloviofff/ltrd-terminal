<template>
  <v-card>
    <v-toolbar color="green" dark >
      <v-toolbar-title>Buy orders list</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-list two-line v-if="buy_positions.length > 0">
        <template v-for="(item, index) in buy_positions" >
          <v-list-item :key="item.id">
            <v-list-item-content>
              <v-list-item-title class="title green--text darken-1--text">{{item.price}}*{{item.amount}}={{item.total}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon @click="removeAction(index)" class="action_action">
              <v-icon color="red darken-1">mdi-delete-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider
            v-if="index + 1 < buy_positions.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
      <div v-else>Empty List</div>
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
    data: () => ({
      
    }),
    methods: {
    }
  }
</script>