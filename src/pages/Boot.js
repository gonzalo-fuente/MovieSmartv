import { Lightning, Router } from "@lightningjs/sdk";

export default class Boot extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xff006d77,
      Header: {
        mount: 0.5,
        x: 960,
        y: 540,
        text: {
          text: "Welcome to MovieSmarTV",
          fontFace: "Bold",
          fontSize: 128,
        },
      },
      Footer: {
        Enter: {
          mountX: 0.5,
          x: 960,
          y: 980,
          text: {
            text: "press [enter] to start de Application",
            fontFace: "Regular",
          },
        },
      },
    };
  }

  _handleEnter() {
    Router.navigate("home");
  }
}
