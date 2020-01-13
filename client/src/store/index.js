import Vue from 'vue'
import Vuex from 'vuex'

import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from '@/main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      // use ApolloClient to fire get posts query
      apolloClient
        .query({
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
          `
        }).then(({ data: { getPosts } }) => {
          commit('setPosts', getPosts);
          console.log(getPosts);
        }).catch(err => {
          console.error(err);
        })
    }
  },
  modules: {
  },
  getters: {
    posts: state => state.posts
  }
})
