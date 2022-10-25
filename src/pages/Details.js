import { Lightning, Router } from "@lightningjs/sdk";
import { fetchTMDBApi } from "../utils/Api";

export default class Details extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xffedf6f9,
      Details: {
        x: 100,
        y: 540,
        mountY: 0.5,
        flex: {},
        Image: {},
        Text: {
          x: 100,
          flex: {
            direction: "column",
          },
          Label: {
            color: 0xff006d77,
            text: { fontFace: "Regular" },
          },
          Description: {
            w: 1150,
            color: 0xffe29578,
            text: { fontFace: "Regular" },
          },
          Release: {
            color: 0xff83c5be,
            text: { fontFace: "Bold" },
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

  _active() {
    this.getSimilar(
      `https://api.themoviedb.org/3/movie/${this.movieDetails?.id}/similar?api_key=8054417482da8da17e59776388d846c8`
    );
  }

  async getSimilar(url) {
    const data = await fetchTMDBApi(url);

    console.log(data);
  }

  set params({ movie }) {
    this.movieDetails = movie;
    console.log(this.movieDetails);
    this.tag("Details").patch({
      Image: {
        src: `https://image.tmdb.org/t/p/w500/${this.movieDetails?.poster_path}`,
      },
    });
    this.tag("Details").patch({
      Text: { Label: { text: this.movieDetails?.title } },
    });
    this.tag("Details").patch({
      Text: { Description: { text: this.movieDetails?.overview } },
    });
    this.tag("Details").patch({
      Text: {
        Release: { text: `Release date: ${this.movieDetails?.release_date}` },
      },
    });
  }

  _handleBack() {
    Router.navigate("home");
  }

  pageTransition() {
    return "up";
  }
}
