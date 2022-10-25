import { Router, Utils } from "@lightningjs/sdk";
import routes from "./utils/routes";

export default class App extends Router.App {
  static getFonts() {
    return [
      {
        family: "Bold",
        url: Utils.asset("fonts/LondrinaSolid-Regular.ttf"),
        descriptors: {},
      },
      {
        family: "Regular",
        url: Utils.asset("fonts/Fresca-Regular.ttf"),
        descriptors: {},
      },
    ];
  }

  _setup() {
    Router.startRouter(routes, this);
  }

  static _template() {
    return {
      ...super._template(),
    };
  }

  _handleAppClose() {
    this.application.closeApp();
  }
}
