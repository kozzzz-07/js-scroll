import { getPosts } from "../../../services/http.service";
import "./style.css";

const contentsEl = document.getElementById("contents");

getPosts()
  .then((res) => {
    res.forEach((element) => {
      contentsEl?.insertAdjacentHTML(
        "beforeend",
        `<div class="item">${element.data}</div>`
      );
    });
    return Promise.resolve();
  })
  .then(() => {
    const targets = document.querySelectorAll(".item");

    const options: IntersectionObserverInit = {
      root: contentsEl,
      rootMargin: "500px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      // 検知し多分格納されてくる。初回はn個、次回以降は閾値を超えた要素
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          console.log("in");
          entry.target.classList.remove("is-not-scrolling");
        } else {
          console.log("out");
          entry.target.classList.add("is-not-scrolling");
        }
      });
    });

    targets.forEach((target) => {
      observer.observe(target);
    });
  });
