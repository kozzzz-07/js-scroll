import { getPosts } from "../../services/http.service";
import "./style.css";

getPosts().then((res) => {
  res.forEach((element) => {
    return contentsEl?.insertAdjacentHTML(
      "beforeend",
      `<div class="item">${element.data}</div>`
    );
  });
});

const contentsEl = document.getElementById("contents");
