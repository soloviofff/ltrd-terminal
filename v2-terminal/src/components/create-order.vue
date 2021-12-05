<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="800px"
    >
        <v-toolbar
          color="green"
          dark
        >

        <v-toolbar-title>Sell</v-toolbar-title>

        <v-spacer></v-spacer>

        <span>
          <v-icon>mdi-wallet</v-icon> available: 354.11461435
          <div>with leverage: 600.11461435 USDT</div>
        </span>
        <v-btn icon>
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>

        <v-text-field
          label="Units"
          :messages="['Max: 0.03']"
          class="mb-8"
        >
          <span slot="append">BTC</span>
        </v-text-field>
        <!-- <div>
          <v-btn
            text
            color="green accent-4"
          >
            Set Leverage
          </v-btn>
        </div> -->
        <div class="mb-8">
          <v-slider
            v-model="leverage_value"
            label="Leverage"
            persistent-hint
            step="1"
            :max="125"
            :thumb-size="24"
            thumb-label="always"
            ticks
            color='orange darken-3'
            hide-details="true"
          ></v-slider>
          <span class="caption">Margin: <span class="orange--text darken-3 body-1">0.03</span> BTC | <span class="orange--text darken-3 body-1">1234</span> USDT</span>
        </div>
        <div>
          <v-btn-toggle
            v-model="order_type"
            tile
            color="green accent-3"
            group
            style="width: 48%"
          >
            <v-btn value="limit" block>
              Limit
            </v-btn>
            <v-btn value="market" block>
              Market
            </v-btn>
          </v-btn-toggle>
        </div>




        <v-text-field
          label="Price"
          :messages="['Max: 0.03']"
        >
          <span slot="append" color="red">USDT</span>
        </v-text-field>

        <v-text-field
          label="Total"
          :messages="['Max: 12345 USDT']"
        >
          <span slot="append" color="red">USDT</span>
        </v-text-field>


        <div>
          <v-btn-toggle
            v-model="order_size"
            tile
            color="green accent-3"
            group
            style="width: 18%"
          >
            <v-btn value="100" block>
              100%
            </v-btn>
            <v-btn value="5" block>
              5%
            </v-btn>
            <v-btn value="10" block>
              10%
            </v-btn>
            <v-btn value="25" block>
              25%
            </v-btn>
            <v-btn value="50" block>
              50%
            </v-btn>
          </v-btn-toggle>
        </div>

      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-btn
          text
          color="success"
          block
        >
          Sell
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      type: 'sell',
      order_type: 'limit',
      order_size: '25',
      leverage_value: 1,
      // balance_base: 100,
      // balance_quote: 100,
      // balance_quote_with_leverage: 1000,
      // balance_base_with_leverage: 1000,
      // leverage_quote: 10,
      // leverage_base: 10,

    //   valid: true,
    //   name: '',
    //   nameRules: [
    //     v => !!v || 'Name is required',
    //     v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    //   ],
    //   email: '',
    //   emailRules: [
    //     v => !!v || 'E-mail is required',
    //     v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    //   ],
    //   select: null,
    //   items: [
    //     'Item 1',
    //     'Item 2',
    //     'Item 3',
    //     'Item 4',
    //   ],
    //   checkbox: false,
    }),

    // methods: {
    //   validate () {
    //     this.$refs.form.validate()
    //   },
    //   reset () {
    //     this.$refs.form.reset()
    //   },
    //   resetValidation () {
    //     this.$refs.form.resetValidation()
    //   },
    // },
  }
</script>
