<template>
  <v-container>
    <h1>Home</h1>
    <dir v-if="$apollo.loading">Loading...</dir>
    <ul v-else v-for="post in posts" :key="post._id">
      <li>
        {{post.title}}
        {{post.imageUrl}}
        {{post.description}}
      </li>
      <li>
        {{post.likes}}
      </li>
    </ul>
  </v-container>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: "home",
  data() {
    return {
      posts: []
    };
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `,
      result({ data, loading }) {
        if (!loading) {
          this.posts = data.getPosts;
        }
      }
    }
  },
};
</script>
