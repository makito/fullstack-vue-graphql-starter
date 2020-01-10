<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon />
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-text-field
        flat
        hide-details
        prepend-icon="mdi-magnify"
        placeholder="Search posts"
        color="accent"
        single-line
      />

      <v-spacer />

      <!-- Horizontal navbar links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in horizontalNavbarItems"
          :key="item.title"
          :to="item.link"
          ><v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    horizontalNavbarItems() {
      return [
        { icon: "mdi-chat-outline", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open-outline", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
    }
  }
};
</script>
