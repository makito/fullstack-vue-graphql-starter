import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from '@/main';

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from '@/queries';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit('setLoading', false);
        // Add user data to state
        commit('setUser', data.getCurrentUser);
      })
      .catch(err => {
        commit('setLoading', false);
        console.error(err);
      });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS
        }).then(({ data: { getPosts } }) => {
          commit('setPosts', getPosts);
          commit('setLoading', false);
        }).catch(err => {
          commit('setLoading', false);
          console.error(err);
        });
    },
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signinUser.token);
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  modules: {
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user
  }
})
