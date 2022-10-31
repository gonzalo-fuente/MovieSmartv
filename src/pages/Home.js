import { Lightning } from "@lightningjs/sdk";
import { Slider } from "../components/Slider";

const API_KEY = process.env.APP_API_KEY;
const API_ENDPOINT = process.env.APP_API_ENDPOINT;

export default class Home extends Lightning.Component {
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
          magnitude: 3,
          intensity: 0.5,
        },
      },
      Slider: {
        w: 1600,
        h: 350,
        x: 950,
        y: 270,
        mount: 0.5,
        type: Slider,
        url: `${API_ENDPOINT}/trending/movie/week?api_key=${API_KEY}`,
        imgWidth: 500,
        imgHeight: 750,
        fontSz: 40,

        // Receive the Bkg Img from the children
        signals: {
          getBkgImgUrl: true,
        },
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

  // Receive the Bkg Img from the children
  getBkgImgUrl(url) {
    this.bkgImg = url;
    this.tag("Background").patch({
      src: this.bkgImg,
    });

    // Add fade in animation between movie selection
    this.tag("Background")
      .animation({
        duration: 1.5,
        repeat: 0,
        actions: [
          {
            t: "",
            p: "alpha",
            v: {
              0: 0,
              1: 1,
            },
          },
        ],
      })
      .start();
  }

  // Give focus to slider
  _getFocused() {
    return this.tag("Slider");
  }

  _handleBack() {
    return null;
  }

  pageTransition() {
    return "down";
  }
}
