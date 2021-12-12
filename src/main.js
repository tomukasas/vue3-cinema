import "@/assets/style.scss";
import { createApp } from "vue";
import genres from "./util/genres";

createApp({
  methods: {
    checkFilter(checked, title) {
      if (checked) {
        this.genres.push(title);
      } else {
        this.genres = this.genres.filter(genre => genre !== title);
      }
    }
  },
  data: () => ({
    genres: []
  }),
  components: {
    "movie-list": {
      name: "MovieList",
      props: {
        genres: Array
      },
      template: `
        <div id="movie-list">
          <div v-for="movie in filteredMovies" v-bind:key="movie.id">
            {{ movie.title }}
          </div>
        </div>
      `,
      data: () => ({
        movies: [
          { title: "Pulp Fiction", id: 1, Genre: "Crime, Comedy" },
          { title: "Home Alone", id: 2, Genre: "Comedy" },
          { title: "Austin Powers", id: 3, Genre: "Comedy" }
        ]
      }),
      computed: {
        filteredMovies() {
          return this.movies.filter(movie => {
            if (!this.genres.length) {
              return true;
            } else {
              const movieGenres = movie.Genre.split(", ");
              return movieGenres.some(genre => this.genres.includes(genre));
            }
          });
        }
      }
    },
    "movie-filter": {
      name: "MovieFilter",
      emits: ["check-filter"],
      components: {
        "check-filter": {
          props: {
            title: String
          },
          emits: ["check-filter"],
          name: "CheckFilter",
          template: `
            <div 
              v-bind:class="{
                'check-filter': true, 
                'active': checked
              }" 
              v-on:click="checkFilter"
            >
              <span class="checkbox"></span>
              <span class="check-filter-title">
                {{ title }}
              </span>
            </div>
          `,
          data: () => ({
            checked: false
          }),
          methods: {
            checkFilter() {
              this.checked = !this.checked;
              this.$emit("check-filter", this.checked, this.title);
            }
          }
        }
      },
      template: `
        <div id="movie-filter">
          <h2>Filter results</h2>
          <div class="filter-group">
            <check-filter 
              v-for="genre in genres" 
              v-bind:key="genre"
              :title="genre"
              v-on:check-filter="checkFilter"
            ></check-filter>
          </div>
        </div>
      `,
      data: () => ({
        genres
      }),
      methods: {
        checkFilter(checked, title) {
          this.$emit("check-filter", checked, title);
        }
      }
    }
  }
}).mount("#app");
