<template>
  <v-app>
    <!-- Side navbar -->
    <v-navigation-drawer v-model="sideNav" app temporary fixed>
      <v-list dense>
        <v-list-item
          link
          v-for="item in sideNavbarItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- signout button -->
        <v-list-item v-if="user" @click="signout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal navbar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleSideNav" />
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

        <v-btn text v-if="user" to="/profile">
          <v-icon left class="hidden-sm-only"
            >mdi-account-circle-outline</v-icon
          >
          <v-badge right color="secondary">
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>

        <v-btn text v-if="user" @click="signout"
          ><v-icon left class="hidden-sm-only">mdi-logout-variant</v-icon
          >Signout</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>

    <!-- Main content -->
    <v-content>
      <transition name="fade">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    horizontalNavbarItems() {
      let items = [
        { icon: "mdi-chat-outline", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open-outline", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [{ icon: "mdi-chat-outline", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavbarItems() {
      let items = [
        { icon: "mdi-chat-outline", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open-outline", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "mdi-chat-outline", title: "Posts", link: "/posts" },
          {
            icon: "mdi-file-star-outline",
            title: "Add Post",
            link: "/post/add"
          },
          {
            icon: "mdi-account-circle-outline",
            title: "Profile",
            link: "/profile"
          }
        ];
      }
      return items;
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    signout() {
      this.$store.dispatch("signoutUser");
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
