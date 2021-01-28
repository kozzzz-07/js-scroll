import { getPosts } from "./app/services/http.service";
import "./style.css";

const contentsEl = document.getElementById("contents");

getPosts()
  .then((res) => {
    res.forEach((element) => {
      contentsEl?.insertAdjacentHTML(
        "beforeend",
        `<div class="item" data-index-number="${element.id}">${element.id}: ${element.data}</div>`
      );
    });
    return Promise.resolve();
  })
  .then(() => {
    const targets = document.querySelectorAll(".item");

    const options: IntersectionObserverInit = {
      root: contentsEl,
      rootMargin: "400px 0px 300px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      // 検知し多分格納されてくる。初回はn個、次回以降は閾値を超えた要素
      entries.forEach((entry) => {
        if (state.isFirstView()) {
          // 要素を隠す
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-not-scrolling");
          } else {
            entry.target.classList.add("is-not-scrolling");
          }
        } else {
          if (entry.isIntersecting) {
            const lastIndexNumberIn = parseInt(
              (entry.target as HTMLElement).dataset.indexNumber!,
              10
            );
            state.setLastIndexNumberIn(lastIndexNumberIn);

            const previousElement = entry.target.previousElementSibling;

            // console.log(
            //   "in - ",
            //   (entry.target as HTMLElement).dataset.indexNumber!
            // );

            if (previousElement == null) {
              return;
            }

            const nextElement = entry.target.nextElementSibling;

            if (nextElement == null) {
              return;
            }

            if (previousElement.classList.contains("is-not-scrolling")) {
              previousElement.classList.remove("is-not-scrolling");
            } else if (nextElement.classList.contains("is-not-scrolling")) {
              nextElement.classList.remove("is-not-scrolling");
            }
          } else {
            const lastIndexNumberOut = parseInt(
              (entry.target as HTMLElement).dataset.indexNumber!,
              10
            );
            state.setLastIndexNumberOut(lastIndexNumberOut);

            const previousElement = entry.target.previousElementSibling;

            // console.log(
            //   "out - ",
            //   (entry.target as HTMLElement).dataset.indexNumber!
            // );

            if (previousElement == null) {
              return;
            }

            const nextElement = entry.target.nextElementSibling;

            if (nextElement == null) {
              return;
            }

            const targetNumber = parseInt(
              (entry.target as HTMLElement).dataset.indexNumber!,
              10
            );

            const previousElementNumber = parseInt(
              (previousElement as HTMLElement).dataset.indexNumber!,
              10
            );

            if (
              !previousElement.classList.contains("is-not-scrolling") &&
              state.getLastIndexNumberIn() > state.getLastIndexNumberOut()
            ) {
              previousElement.classList.add("is-not-scrolling");
            } else if (!nextElement.classList.contains("is-not-scrolling")) {
              nextElement.classList.add("is-not-scrolling");
            }
          }
        }
      });

      if (state.isFirstView()) {
        const itemsEl = contentsEl?.querySelectorAll(":not(.is-not-scrolling)");
        const lastItemEl = itemsEl![itemsEl!.length - 1];

        // イベントを発火させるために余分に多く表示させる
        lastItemEl.nextElementSibling?.classList.remove("is-not-scrolling");

        state.setLastIndexNumberIn(0);
        state.setLastIndexNumberOut(0);

        state.setRange(itemsEl?.length!);
        state.setFirstView(false);
        console.log("ready!!");
      }
    }, options);

    targets.forEach((target) => {
      observer.observe(target);
    });
  });

const state = (() => {
  let range = 0;
  let firstView = true;
  let lastIndexNumberIn = 0;
  let lastIndexNumberOut = 0;
  let lastShowOut = 0;

  return {
    setLastIndexNumberIn: (currentIndexNumberIn: number) => {
      lastIndexNumberIn = currentIndexNumberIn;
    },

    setLastIndexNumberOut: (currentIndexNumberOut: number) => {
      lastIndexNumberOut = currentIndexNumberOut;
    },

    setLastShowOut: (currentIndexNumberOut: number) => {
      lastShowOut = currentIndexNumberOut;
    },

    getLastIndexNumberIn: () => lastIndexNumberIn,

    getLastIndexNumberOut: () => lastIndexNumberOut,

    getLastShowOut: () => lastShowOut,

    setFirstView: (isFirst: boolean) => {
      firstView = isFirst;
    },

    isFirstView: () => {
      return firstView === true;
    },

    setRange: (length: number) => {
      range = length;
    },

    getRange: () => range,
  };
})();
