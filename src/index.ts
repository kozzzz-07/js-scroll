import { getPosts } from "./app/services/http.service";
import "./style.css";

getPosts().then((res: any) => {
  res.forEach((element: { data: any }) => {
    return contentsEl?.insertAdjacentHTML(
      "beforeend",
      `<div class="item">${element.data}</div>`
    );
  });
});

const contentsEl = document.getElementById("contents");
