import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

const FEED_URL = "https://social.isalman.dev/users/hothead/feed.atom";

export default async function () {
  try {
    const response = await fetch(FEED_URL);
    const xml = await response.text();
    const parsed = await parseStringPromise(xml);

    const entries = parsed.feed.entry || [];

    return entries.map((entry) => ({
      id: entry.id[0],
      title: entry.title[0],
      content: entry.content?.[0]._ || '',
      published: entry.published?.[0],
      slug: entry.id[0].split("/").pop()
    }));
  } catch (e) {
    console.error("Error loading Akkoma feed:", e);
    return [];
  }
}
