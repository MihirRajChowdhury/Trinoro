// lib/freesound.ts

const FREESOUND_BASE = "https://freesound.org/apiv2";
const CLIENT_ID = process.env.NEXT_PUBLIC_FREESOUND_CLIENT_ID || ""; // <-- now from env

type Sound = {
  id: number;
  name: string;
  preview: string;
};

export async function searchAmbientSound(query: string): Promise<Sound | null> {
  try {
    const res = await fetch(`${FREESOUND_BASE}/search/text/?query=${query}&filter=duration:[5 TO 180]&fields=id,name,previews&token=${CLIENT_ID}`);
    const data = await res.json();

    if (!data.results.length) return null;

    const first = data.results[0];
    return {
      id: first.id,
      name: first.name,
      preview: first.previews["preview-lq-mp3"], // low-quality preview to stream quickly
    };
  } catch (err) {
    console.error(`Freesound search failed for "${query}"`, err);
    return null;
  }
}
