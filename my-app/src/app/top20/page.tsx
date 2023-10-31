import Link from "next/link";
import { getItem, getTopStories } from "@/app/_utils/hackerNews";
import { title } from "process";

export default async function Top20Page() {
  // データを加工する

  // 500件のデータを取得する
  const top500Ids = await getTopStories();
  // 上位20件のIDだけに絞り込む
  const top20Ids = top500Ids.slice(0, 20);
  console.log(top20Ids);
  const top20 = await Promise.all(top20Ids.map((id) => getItem(id)));

  // 記事データのIDとタイトルだけに絞り込む
  const top20Summary = top20.map((item) => ({
    id: item.id,
    title: item.title,
  }));

  return (
    <div>
      <header>
        <h1>Hacker News Viewer</h1>
      </header>
      <div id="container">
        <div id="sidebar">
          <h2>Top 20</h2>
          <nav>
            <ul>
              {top20Summary.map((item) => (
                <li key={String(item.id)}>
                  {/* タイトルをリンクにする */}
                  <Link href={`/top20/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <main>
          <div>本文をここに表示する</div>
          {/* {children} */}
        </main>
      </div>
    </div>
  );
}
