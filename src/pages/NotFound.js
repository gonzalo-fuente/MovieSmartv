import { Lightning, Router, Utils } from "@lightningjs/sdk";

export default class NotFound extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xee006d77,
        src: Utils.asset("images/Background.jpeg"),
      },
      Header: {
        mount: 0.5,
        x: 960,
        y: 540,
        text: {
          text: "Sorry, Page Not Found",
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
            text: "press [Back] to go to main page",
            fontFace: "Regular",
          },
        },
      },
    };
  }

  _handleBack() {
    Router.navigate("home");
  }

  pageTransition() {
    return "right";
  }
}
