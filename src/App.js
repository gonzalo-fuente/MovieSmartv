import { Lightning, Utils } from "@lightningjs/sdk";
import { Tile } from "./components/Tile";
import { fetchTMDBApi } from "./utils/Api";

export default class App extends Lightning.Component {
  page = 1;
  base_url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=8054417482da8da17e59776388d846c8";
  url = `${this.base_url}&page=${this.page}`;
  movies = [];

  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xffedf6f9,
      },
      Slider: {
        w: 1600,
        h: 350,
        x: 950,
        y: 270,
        mount: 0.5,
        color: 0xffedf6f9,
        Wrapper: {},
      },
    };
  }

  _init() {
    this.index = 0;
    this.getMovies(this.url);
  }

  async getMovies(url) {
    const data = await fetchTMDBApi(url);

    this.movies.push(...data.results);

    this.dataLength = this.movies.length + 1;
    const tiles = [];
    for (let i = 0; i < this.dataLength - 1; i++) {
      tiles.push({
        type: Tile,
        x: i * (500 + 100),
        item: {
          label: this.movies[i].title,
          src: `https://image.tmdb.org/t/p/w500/${this.movies[i].poster_path}`,
        },
      });
    }
    tiles.push({
      type: Tile,
      x: (this.dataLength - 1) * (500 + 100),
      item: {
        label: "[hit ENTER to load more]",
        src: Utils.asset("images/load_more.png"),
      },
    });
    this.tag("Wrapper").children = tiles;
  }

  repositionWrapper() {
    const wrapper = this.tag("Wrapper");
    const sliderW = this.tag("Slider").w;
    const currentWrapperX = wrapper.transition("x").targetvalue || wrapper.x;
    const currentFocus = wrapper.children[this.index];
    const currentFocusX = currentFocus.x + currentWrapperX;
    const currentFocusOuterWidth = currentFocus.x + currentFocus.w;

    if (currentFocusX < 0) {
      wrapper.setSmooth("x", -currentFocus.x);
    } else if (currentFocusOuterWidth > sliderW) {
      wrapper.setSmooth("x", sliderW - currentFocusOuterWidth);
    }
  }

  _handleEnter() {
    this.page++;
    this.url = `${this.base_url}&page=${this.page}`;
    this.getMovies(this.url);
  }

  _handleLeft() {
    if (this.index === 0) {
      this.index = this.dataLength - 1;
    } else {
      this.index -= 1;
    }
    this.repositionWrapper();
  }

  _handleRight() {
    if (this.index === this.dataLength - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }
    this.repositionWrapper();
  }

  _getFocused() {
    return this.tag("Slider.Wrapper").children[this.index];
  }
}
