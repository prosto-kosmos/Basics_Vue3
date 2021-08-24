<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      v-focus
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
        :model-value="sortedPosts"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      @remove="removePost"
      :posts="sortedAndSearchedPosts"
      v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    ...mapMutations({
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
    }),

    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },

  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
