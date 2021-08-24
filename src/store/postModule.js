import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
    isPostLoading: false,
    selectedSort: "",
    searchQuery: "",
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По описанию" },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        commit("setPosts", response.data);
      } catch (e) {
        alert("Ошибка при обращении к серверу");
      } finally {
        commit("setLoading", false);
      }
    },
  },
  namespaced: true,
};
