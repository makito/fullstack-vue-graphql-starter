<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Welcom Back!</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="handleSigninUser">
            <v-card-text>
              <v-text-field
                label="Username"
                prepend-icon="mdi-account-circle-outline"
                type="text"
                v-model="username"
                required
              />

              <v-text-field
                label="Password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="password"
                required
              />
            </v-card-text>
            <v-card-actions>
              <small
                >Don't have an account?
                <router-link to="/signup">Signup</router-link></small
              >
              <v-spacer />
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    user(value) {
      // if user value changes, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
