export async function getTopStories(): Promise<Array<Number>> {
  return fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
    next: { revalidate: 60 }, // 1分経過するとキャッシュを破棄する
  }).then((res) => {
    return res.json();
  });
}

// @see https://github.com/HackerNews/API#items
type Item = {
  id: Number;
  deleted?: Boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: String;
  time: Number;
  text?: String;
  dead?: Boolean;
  parent?: Number;
  poll?: Number;
  kids?: Array<Number>;
  url?: String;
  score?: Number;
  title?: String;
  parts?: Array<Number>;
  descendants?: Number;
};

/**
 * 記事のデータを取得する
 */
export async function getItem(id: Number): Promise<Item> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
    (res) => {
      return res.json();
    }
  );
}
