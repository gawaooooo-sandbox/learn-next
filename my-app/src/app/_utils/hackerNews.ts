export async function getTopStories(): Promise<Array<number>> {
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
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: Array<number>;
  url?: string;
  score?: number;
  title?: string;
  parts?: Array<number>;
  descendants?: number;
};

/**
 * 記事のデータを取得する
 */
export async function getItem(id: number): Promise<Item> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
    (res) => {
      return res.json();
    }
  );
}
