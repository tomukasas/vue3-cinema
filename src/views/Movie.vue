<template>
  <div id="detail">
    <movie-item
      v-if="movie"
      :movie="movie"
      :day="day"
      :times="times"
    >
      <div class="movie-details">
        <p class="movie-genre">{{ movie.movie.Genre }}</p>
        <p class="movie-plot">{{ movie.movie.Plot }}</p>
        <table>
          <tr>
            <td>Released date:</td>
            <td>{{ movie.movie.Released }}</td>
          </tr>
          <tr>
            <td>Running time:</td>
            <td>{{ movie.movie.Runtime }}</td>
          </tr>
          <tr>
            <td>Director:</td>
            <td>{{ movie.movie.Director }}</td>
          </tr>
          <tr>
            <td>Cast:</td>
            <td>{{ movie.movie.Actors }}</td>
          </tr>
        </table>
      </div>
    </movie-item>
    <div class="home">
      <router-link :to="{ name: 'home' }">
        Back to results
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieItem from "@/components/MovieItem";

export default {
  name: "Movie",
  components: { MovieItem },
  props: {
    day: Object,
    times: Array
  },
  data: () => ({
    movie: null
  }),
  async beforeRouteEnter(to, from, next) {
    const { data } = await axios.get("/api");
    const movie = data.find(movie => movie.id === to.params.id);

    if (!movie) {
      next({ name: "home" });
    } else {
      next(vm => {
        vm.movie = movie;
        return true;
      });
    }
  }
};
</script>
