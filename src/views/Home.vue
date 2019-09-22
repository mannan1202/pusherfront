<template>
  <div>
    <PostsLike></PostsLike>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsLike from "@/components/PostsLike.vue";

export default {
  name: "home",
  components: {
    PostsLike
  }
};
</script>
