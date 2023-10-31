import { getItem, getTopStories } from "@/app/_utils/hackerNews";
import Link from "next/link";

export default async function Top20IndexPage() {
  return (
    <article>
      <p>ここに記事が表示される</p>
      <p>左のメニューから記事を選択してください</p>
    </article>
  );
}
