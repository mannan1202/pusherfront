<template>
  <div class="container mx-auto min-h-screen">
    <div class="pl-4 pt-4 text-3xl">
      <h1>Posts</h1>
    </div>
    <div class="flex lg:flex-row flex-col justify-around p-4">
      <div
        v-for="post in postslist"
        :key="post.id"
        class="flex flex-col border rounded-sm border-gray-300 mb-2"
      >
        <div class>
          <img :src="post.link" alt="food" />
        </div>
        <div class="bg-white flex h-10 p-2">
          <div>
            <button @click="addLike(post.id)">
              <svg
                class="fill-current h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2zm2 0v15l6-3 6 3V2H4z"
                />
              </svg>
            </button>
          </div>
          <div class="text-lg ml-2" v-text="post.count"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js"; // import Pusher

export default {
  name: "Posts",
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.subscribe();
  },
  computed: {
    postslist() {
      return window._.orderBy(this.posts, "count", "desc");
    }
  },
  methods: {
    subscribe() {
      Pusher.logToConsole = true;
      let pusher = new Pusher("8676a0fb270d2fd80070", { cluster: "ap2" });
      pusher.subscribe("pusherlikes");
      pusher.bind("likes", data => {
        let post = window._.find(this.posts, function(p) {
          return p.id === parseInt(data.id, 10);
        });
        this.$set(post, "count", parseInt(data.count, 10));
      });
    },
    async addLike(id) {
      await window.axios
        .get(`posts/${id}/like`)
        .then(reponse => {
          alert(reponse.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  async mounted() {
    await window.axios
      .get("posts")
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
