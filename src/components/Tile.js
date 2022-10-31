import { Lightning } from "@lightningjs/sdk";

export class Tile extends Lightning.Component {
  static _template() {
    return {
      Image: {
        w: (w) => w,
        h: (h) => h - 50,
      },
      Label: {
        x: 5,
        y: (h) => h - 50,
        color: 0x00000000,
        smooth: { color: 0xffe29578 },
        text: {
          fontFace: "Regular",
        },
      },
    };
  }

  // Receive movie img and title through props
  set item({ label, src, fontSz }) {
    this.patch({
      Image: { src },
      Label: { text: { text: label.toString(), fontSize: fontSz } },
    });
  }

  _init() {
    this.tag("Label").patch({
      text: {
        w: this.w - 5,
      },
    });
  }

  // Change the size and font color when focused
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
