import CharacterDetailClient from "./CharacterDetailClient";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const response = await fetch(
      "https://hp-api.onrender.com/api/characters",
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      return [];
    }
    const characters = await response.json();
    return characters.slice(0, 20).map((character: { id: string }) => ({
      id: character.id,
    }));
  } catch {
    return [];
  }
}

export default function CharacterDetail() {
  return <CharacterDetailClient />;
}
