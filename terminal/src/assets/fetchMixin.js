export default {

  data () {
    return {
      fetchInterval: null
    }
  },
  methods: {
    startFetch() {
      this.fetchInterval = setInterval(() => {
        // console.log('startFetch')
        Store.fetchCandles()
        Store.fetchOrderbook()
        Store.fetchJournal()
        Store.fetchAccounting()
      }, 5000)
    }
  },
  beforeDestroy () {
    clearInterval(this.fetchInterval)
  },
  created () {
    this.startFetch()
  }
}
