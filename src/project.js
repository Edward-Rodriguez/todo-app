/* eslint-disable no-param-reassign */
export default function Project(id, title, color) {
  return {
    get id() {
      return id;
    },
    get title() {
      return title;
    },
    set title(newTitle) {
      title = newTitle;
    },
    get color() {
      return color;
    },
    set color(newColor) {
      color = newColor;
    },
  };
}
