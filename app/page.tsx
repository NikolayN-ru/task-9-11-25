"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCounterStore } from "@/store/store";
import LikeButton from "../components/like";

export default function CharactersList() {
  const {
    characters,
    charactersLoading,
    charactersError,
    fetchCharacters2,
    likedCharacters,
  } = useCounterStore();

  useEffect(() => {
    fetchCharacters2();
  }, [fetchCharacters2]);

  if (charactersLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Загрузка персонажей...</p>
      </div>
    );
  }

  if (charactersError) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Ошибка: {charactersError}</p>
        <button
          onClick={() => fetchCharacters2()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Персонажи Гарри Поттера</h1>
        <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
          <span className="text-blue-800 font-semibold">❤️</span>
          <span className="text-blue-800">{likedCharacters.length} лайков</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters &&
          characters.slice(0, 20).map((character) => (
            <div
              key={character.id}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white relative"
            >
              <div className="absolute top-3 right-3 z-10">
                <LikeButton
                  characterId={character.id}
                  characterName={character.name}
                  size="sm"
                />
              </div>

              <Link href={`/${character.id}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  {character.image ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">⚡</div>
                      <p>No image</p>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{character.name}</h3>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Дом:</span>
                      <span
                        className={`font-semibold ${
                          character.house === "Gryffindor"
                            ? "text-red-600"
                            : character.house === "Slytherin"
                            ? "text-green-600"
                            : character.house === "Hufflepuff"
                            ? "text-yellow-600"
                            : character.house === "Ravenclaw"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {character.house || "Unknown"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Актер:</span>
                      <span className="text-right">{character.actor}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-blue-500 text-sm font-medium">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
