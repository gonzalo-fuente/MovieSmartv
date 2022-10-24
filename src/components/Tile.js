import { Lightning } from "@lightningjs/sdk";

export class Tile extends Lightning.Component {
  static _template() {
    return {
      w: 500,
      h: 750,
      rect: true,
      Image: {
        w: (w) => w,
        h: (h) => h - 50,
      },
      smooth: { color: 0xffedf6f9 },
      Label: {
        x: 20,
        y: 705,
        color: 0xff006d77,
        text: { fontSize: 32 },
      },
    };
  }

  set item(obj) {
    const { label, src } = obj;
    this.patch({
      Image: { src },
      Label: { text: label.toString() },
    });
  }

  _focus() {
    this.patch({
      smooth: { color: 0xff006d77, scale: 1.1 },
      Label: {
        smooth: { color: 0xffedf6f9 },
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: { color: 0xffedf6f9, scale: 1.0 },
      Label: {
        smooth: { color: 0xff006d77 },
      },
    });
  }
}
