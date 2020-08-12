<template>
   <v-form >
    <v-container>
    <v-row
            align="center"
            justify="center"
        >
            <v-col
            cols="12"
            sm="8"
            md="4"
            >
            <v-card class="elevation-12">
                <v-toolbar
                color="primary"
                dark
                flat
                >
                <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username" 
                    ></v-text-field>

                    <v-text-field
                    id="password"
                    name="password"
                    v-model="password" 
                    prepend-icon="mdi-lock"
                    type="password"
                    ></v-text-field>
                </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-form>
</template>



<script>
export default {
  data: () => {
    return {
        valid: false,
        username: '',
        password: '',
        rememberMe: true,
    }
  },
  methods: {
    login: function () {
      const username = '13162970502';//this.username;
      const password = 'test1234';//this.password;
      const rememberMe = 'true';this.rememberMe;
      this.$store.dispatch('login', { username, password, rememberMe })
        .then(() => this.$router.push('/home'))
        .catch(err => console.log(err))
    }
  }
}
</script>
