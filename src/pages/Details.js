import { Lightning, Router } from "@lightningjs/sdk";
import { Slider } from "../components/Slider";

const API_KEY = process.env.APP_API_KEY;
const API_ENDPOINT = process.env.APP_API_ENDPOINT;
const API_IMG_ENDPOINT = process.env.APP_API_IMG_ENDPOINT;

export default class Details extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xffedf6f9,
        src: this.bkgImg,
        shader: {
          type: Lightning.shaders.Vignette,
          magnitude: 2,
          intensity: 0.1,
        },
      },
      Details: {
        x: 100,
        y: 540,
        mountY: 0.5,
        flex: {},
        Image: {},
        Data: {
          x: 100,
          flex: {
            direction: "column",
          },
          Label: {
            color: 0xff006d77,
            text: { fontFace: "Bold", fontSize: 60 },
          },
          Description: {
            w: 1150,
            color: 0xffe29578,
            text: { fontFace: "Regular" },
          },
          Release: {
            color: 0xff83c5be,
            text: { fontFace: "Regular" },
          },
          SimilarMovies: {
            rect: true,
            color: 0x00000000,
            h: 500,
            w: 1150,
            clipping: true,
            Title: {
              x: 1150 / 2,
              mountX: 0.5,
              color: 0xff83c5be,
              text: {
                fontFace: "Regular",
                text: "Similar Movies",
              },
            },
          },
        },
      },
      Footer: {
        Enter: {
          mountX: 0.5,
          x: 960,
          y: 980,
          color: 0xff006d77,
          text: {
            text: "press [backspace] to Return",
            fontFace: "Regular",
          },
        },
      },
    };
  }

  // Receive the selected movie by props
  set params({ movie }) {
    this.movieDetails = movie;

    this.tag("Details").patch({
      Image: {
        src: `${API_IMG_ENDPOINT}/w500/${this.movieDetails?.poster_path}`,
      },
    });
    this.tag("Details").patch({
      Data: {
        Label: { text: this.movieDetails?.title },
        Description: { text: this.movieDetails?.overview },
        Release: { text: `Release date: ${this.movieDetails?.release_date}` },
      },
    });
    this.getBkgImgUrl(
      `${API_IMG_ENDPOINT}/original/${this.movieDetails?.backdrop_path}`
    );
  }

  getBkgImgUrl(url) {
    this.bkgImg = url;
    this.tag("Background").patch({
      src: this.bkgImg,
    });
  }

  _active() {
    // Fetch similar movies and display them re-using the slider component
    this.tag("SimilarMovies").patch({
      SimilarMovies: {
        Slider: {
          w: 1025,
          x: 50,
          y: 75,
          index: 0,
          type: Slider,
          url: `${API_ENDPOINT}/movie/${this.movieDetails?.id}/similar?api_key=${API_KEY}`,
          imgWidth: 500 / 2,
          imgHeight: 750 / 2,
          fontSz: 30,
        },
      },
    });
  }

  // Give focus to slider
  _getFocused() {
    return this.tag("Slider");
  }

  _handleBack() {
    Router.navigate("home");
  }

  pageTransition() {
    return "up";
  }
}
