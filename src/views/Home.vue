<template>
  <div id="overview">
    <div class="main">
      <movie-list
        v-bind:genres="genres"
        v-bind:movies="movies"
        v-bind:times="times"
        v-bind:day="day"
      ></movie-list>
      <movie-filter v-on:check-filter="checkFilter"></movie-filter>
    </div>
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";
import MovieFilter from "@/components/MovieFilter";

export default {
  name: "Home",
  props: {
    genres: Array,
    movies: Array,
    times: Array,
    day: Object
  },
  components: {
    MovieFilter,
    MovieList
  },
  emits: ["check-filter"],
  methods: {
    checkFilter(checked, title, group) {
      this.$emit("check-filter", checked, title, group);
    }
  }
};
</script>
