<template>
  <div>
    <div id="nav">
      <br/>
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
      

      <h5>Users by query</h5>
      <div v-if="loadingQuery">Loading .... Please wait</div>
      <div v-if="quieryUsersComputed">
        {{quieryUsersComputed}}
      </div>

    
      <div v-if="usersComputed">
        <h5>Users by subscription</h5>
        {{usersComputed}}
      </div>
    </div>
    <router-view/>
  </div>
</template>


<script>
import gql from "graphql-tag"

export default {
  name: 'Dashboard',
  components: {

  },

  methods: {
   
    fetchUsers() {
      this.loadingQuery = true
      this.$apollo.query({
        query: gql`
          query {
            users {
              auth0_id
              avatar
              created_at
              email
              last_seen
              name
            }
          }`
      }).then(({data, loading}) => {
        this.loadingQuery = loading
        this.queryUsers = data.users
      })
    },
    // editUser() {
    //   const result = await this.$apollo.mutate({
    //       mutation: update_user_info_mutation,
    //       variables: {
    //         auth0_id: this.get_auth0_id,
    //         avatar: user.new_avatar,
    //         first_name: user.first_name,
    //         second_name: user.second_name,
    //         name: user.nickname
    //       }
    //     })

    // }
  },
  mounted(){
    this.fetchUsers()
    // this.subscribeUsers()
  },
  data () {
    return {
      usersSubscribe: [],
      queryUsers: [],
      loadingQuery: false
    }
  },
  computed: {
    usersComputed() {
      return this.usersSubscribe
    },
    quieryUsersComputed() {
      return this.queryUsers
    }
  },
  apollo: {
    $subscribe: {
      users: {
        query: gql`
          subscription {
            users {
              auth0_id
              avatar
              created_at
              last_seen
              name
            }
          }
        `,
        result ({data}) {
          // console.log(data)
          this.usersSubscribe = data.users
        },
      },
    }
  }
}
</script>
