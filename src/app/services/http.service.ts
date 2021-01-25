import { Post } from "../models/model";

export const getPosts = (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "http://localhost:3004/posts";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          console.log(JSON.parse(xhr.responseText));
          resolve(JSON.parse(xhr.responseText));
          // console.log(xhr.responseText);
          // resolve(xhr.responseText);
        } else {
          console.error(JSON.parse(xhr.responseText));
          reject(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.send();
  });
};

export const addTestData = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const method = "POST";
    const url = "http://localhost:3004/posts";

    xhr.open(method, url, true);

    // application/jsonは？
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // console.log(xhr.responseText);
          resolve(xhr.responseText);
        } else {
          console.error(JSON.parse(xhr.responseText));
          reject(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.send(
      "data=じゅげむ じゅげむ ごこうのすりきれ かいじゃりすいぎょの すいぎょうまつ うんらいまつ ふうらいまつ くうねるところに すむところ やぶらこうじの ぶらこうじ パイポパイポ パイポのシューリンガン シューリンガンのグーリンダイ グーリンダイのポンポコピーのポンポコナーの ちょうきゅうめいのちょうすけ"
    );
    xhr.abort();
  });
};
