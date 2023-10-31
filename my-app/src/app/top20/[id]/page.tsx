import { getItem } from "@/app/_utils/hackerNews";

type Params = {
  id: number;
};

export default async function Top20IdPage({ params }: { params: Params }) {
  const { id } = params;
  const item = await getItem(id);

  // 記事データ内に含まれるコメントIDを1件ずつ取得する
  const kids = item.kids
    ? await Promise.all(item.kids.map((kidsItem) => getItem(kidsItem)))
    : [];

  return (
    <article>
      <h1 className="text-2xl">{item.title}</h1>
      <p className="py-2">
        by {item.by} on {new Date(item.time * 1000).toLocaleString()}
      </p>
      <p className="pt-2 pb-4">
        <a href={item.url} className="underline">
          {item.url}
        </a>
      </p>
      <h2 className="text-xl">Comments</h2>
      {kids.map((kidsItem) => (
        <div
          key={String(kidsItem.id)}
          className="py-2 border-b-2 border-gray-400"
        >
          <h3 className="text-lg">by: {kidsItem.by}</h3>
          <p className="py-2">{kidsItem.text}</p>
          <p>{new Date(kidsItem.time * 1000).toLocaleString()}</p>
        </div>
      ))}
    </article>
  );
}
