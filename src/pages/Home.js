import { Lightning } from "@lightningjs/sdk";
import { Slider } from "../components/Slider";

export default class Home extends Lightning.Component {
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
        type: Slider,
        url: "https://api.themoviedb.org/3/trending/movie/week?api_key=8054417482da8da17e59776388d846c8",
        imgWidth: 500,
        imgHeight: 750,
        fontSz: 40,
      },
      Footer: {
        mountX: 0.5,
        x: 960,
        y: 950,
        flex: {
          direction: "column",
          alignItems: "center",
        },
        Enter: {
          color: 0xff006d77,
          text: {
            text: "press [enter] to get More Details",
            fontFace: "Regular",
          },
        },
        UpDown: {
          color: 0xff006d77,
          text: {
            text: "use the ↔️ to navigate between movies and the ↕️ to navigate between pages",
            fontFace: "Regular",
          },
        },
      },
    };
  }

  _getFocused() {
    return this.tag("Slider");
  }
}
