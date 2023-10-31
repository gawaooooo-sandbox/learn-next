import { getItem } from "@/app/_utils/hackerNews";

type Params = {
  id: number;
};

export default async function Top20IdPage({ params }: { params: Params }) {
  const { id } = params;
  const item = await getItem(id);

  return (
    <article>
      <h1 className="text-xl">{item.title}</h1>
      <p className="py-2">
        by {item.by} on {new Date(item.time * 1000).toLocaleString()}
      </p>
      <p>
        <a href={item.url} className="underline">{item.url}</a>
      </p>
    </article>
  );
}
