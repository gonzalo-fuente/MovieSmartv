import { Lightning, Router } from "@lightningjs/sdk";
import { Tile } from "./Tile";
import { fetchTMDBApi } from "../utils/api";

const API_IMG_ENDPOINT = process.env.APP_API_IMG_ENDPOINT;

export class Slider extends Lightning.Component {
  static _template() {
    return {
      Slider: {
        Wrapper: {},
      },
    };
  }

  _init() {
    this.index = 0;
    this.page = 1;
    this.tag("Slider").patch({
      w: this.w,
      h: this.h,
    });
  }

  // Fetch movies when active
  _active() {
    const newUrl = `${this.url}&page=${this.page}`;
    this.getMovies(newUrl);
  }

  async getMovies(url) {
    const data = await fetchTMDBApi(url);
    this.movies = data.results;

    this.dataLength = this.movies.length;
    const tiles = [];
    for (let i = 0; i < this.dataLength; i++) {
      tiles.push({
        type: Tile,
        x: i * (this.imgWidth + this.imgWidth / 5),
        w: this.imgWidth,
        h: this.imgHeight,
        item: {
          label: this.movies[i].title,
          src:
            this.movies[i].poster_path &&
            `${API_IMG_ENDPOINT}/w500/${this.movies[i].poster_path}`,
          fontSz: this.fontSz,
        },
      });
    }
    // Send the Bkg img to the parent throw signals
    this.handleBkgImg();
    this.tag("Wrapper").children = tiles;
  }

  repositionWrapper() {
    const wrapper = this.tag("Wrapper");
    const sliderW = this.tag("Slider").w;
    const currentWrapperX = wrapper.transition("x").targetvalue || wrapper.x;
    const currentFocus = wrapper.children[this.index];
    const currentFocusX = currentFocus.x + currentWrapperX;
    const currentFocusOuterWidth = currentFocus.x + currentFocus.w;

    // Send the Bkg img to the parent throw signals
    this.handleBkgImg();

    if (currentFocusX < 0) {
      wrapper.setSmooth("x", -currentFocus.x);
    } else if (currentFocusOuterWidth > sliderW) {
      wrapper.setSmooth("x", sliderW - currentFocusOuterWidth);
    }
  }

  // Send the Bkg Img to the parent throw signals
  handleBkgImg() {
    this.bkgImgUrl = `${API_IMG_ENDPOINT}/original/${
      this.movies[this.index].backdrop_path
    }`;
    this.signal("getBkgImgUrl", this.bkgImgUrl);
  }

  // Select the movie and get more details
  _handleEnter() {
    Router.navigate("details", { movie: this.movies[this.index] });
  }

  // Navigate through movies
  _handleLeft() {
    if (this.index === 0) {
      this.index = this.dataLength - 1;
    } else {
      this.index -= 1;
    }
    this.repositionWrapper();
  }

  // Navigate through movies
  _handleRight() {
    if (this.index === this.dataLength - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }
    this.repositionWrapper();
  }

  // Go to the next page
  _handleDown() {
    this.page++;
    this.index = 0;
    this.repositionWrapper();
    const newUrl = `${this.url}&page=${this.page}`;
    this.getMovies(newUrl);
  }

  // Go to the previous page
  _handleUp() {
    if (this.page !== 1) {
      this.page--;
      const newUrl = `${this.url}&page=${this.page}`;
      this.getMovies(newUrl);
    }
  }

  _getFocused() {
    return this.tag("Slider.Wrapper").children[this.index];
  }

  pageTransition() {
    return "down";
  }
}
