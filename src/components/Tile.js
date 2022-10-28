import { Lightning } from "@lightningjs/sdk";

export class Tile extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      Image: {
        w: (w) => w,
        h: (h) => h - 50,
      },
      smooth: { color: 0xffedf6f9 },
      Label: {
        x: 5,
        y: (h) => h - 50,
        color: 0xffe29578,
        text: {
          fontFace: "Regular",
        },
      },
    };
  }

  _init() {
    this.tag("Label").patch({
      text: {
        w: this.w - 5,
      },
    });
  }

  set item({ label, src, fontSz }) {
    this.patch({
      Image: { src },
      Label: { text: { text: label.toString(), fontSize: fontSz } },
    });
  }

  _focus() {
    this.patch({
      smooth: { scale: 1.1 },
      Label: {
        smooth: { color: 0xff006d77 },
        text: {
          fontFace: "Bold",
        },
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: { scale: 1.0 },
      Label: {
        smooth: { color: 0xffe29578 },
        text: {
          fontFace: "Regular",
        },
      },
    });
  }
}
