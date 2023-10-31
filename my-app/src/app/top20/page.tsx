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
      <header className="py-4 px-4 border-b-2 border-gray-500">
        <h1 className="text-2xl">Hacker News Viewer</h1>
      </header>
      <div id="container" className="flex">
        <div id="sidebar" className="py-4 px-4 w-1/3">
          <h2 className="text-xl">Top 20</h2>
          <nav className="pl-4 py-2">
            <ul>
              {top20Summary.map((item) => (
                <li key={String(item.id)}>
                  {/* タイトルをリンクにする */}
                  <Link href={`/top20/${item.id}`} className="hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <main className="flex-1 py-4 px-2 w-2/3">
          <div>本文をここに表示する</div>
          {/* {children} */}
        </main>
      </div>
    </div>
  );
}
