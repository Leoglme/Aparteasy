// Create an instance of Notyf
import { Notyf } from "notyf";

export const notify = new Notyf({
  dismissible: true,
  position: {
    x: "center",
    y: "top"
  }
});
