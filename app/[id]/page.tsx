// components/CharacterDetail.tsx
'use client';
import { useParams } from "next/navigation";

import { useEffect } from 'react';
import { useCounterStore } from '@/store/store';
import Link from 'next/link';

interface CharacterDetailProps {
  characterId: string;
}

export default function CharacterDetail({ characterId }: CharacterDetailProps) {
      const params: any = useParams<{ tag: string; item: string }>();
  const idMAIN: string = params.id;

  const { 
    character, 
    characterLoading, 
    characterError, 
    fetchCharacterById,
    clearCharacter
  } = useCounterStore();

  useEffect(() => {
    if (idMAIN) {
      fetchCharacterById(idMAIN);
    }

    // Очищаем при размонтировании
    // return () => {
    //   clearCharacter();
    // };
  }, [idMAIN, fetchCharacterById, clearCharacter]);

  console.log(idMAIN, 'character')

  if (characterLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Загрузка персонажа...</p>
      </div>
    );
  }

  if (characterError) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Ошибка: {characterError}</p>
        <Link 
          href="/"
          className="inline-block mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Назад к списку
        </Link>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="p-4 text-center">
        <p>Персонаж не найден</p>
        <Link 
          href="/"
          className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link 
        href="/"
        className="inline-block mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Назад к списку
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Изображение */}
          <div className="md:w-1/3">
            <div className="h-80 md:h-full bg-gray-200 flex items-center justify-center">
              {character.image ? (
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <p>No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Информация */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
            
            {character.alternate_names.length > 0 && (
              <p className="text-gray-600 mb-4">
                Также известен как: {character.alternate_names.join(', ')}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Основная информация</h3>
                <InfoRow label="Дом" value={character.house} />
                <InfoRow label="Пол" value={character.gender} />
                <InfoRow label="Вид" value={character.species} />
                <InfoRow label="Происхождение" value={character.ancestry} />
                <InfoRow label="Дата рождения" value={character.dateOfBirth} />
                <InfoRow label="Волшебник" value={character.wizard ? 'Да' : 'Нет'} />
                <InfoRow label="Статус" value={character.alive ? 'Жив' : 'Мертв'} />
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Внешность и способности</h3>
                <InfoRow label="Цвет глаз" value={character.eyeColour} />
                <InfoRow label="Цвет волос" value={character.hairColour} />
                <InfoRow label="Патронус" value={character.patronus || 'Неизвестно'} />

                {character.wand.wood && (
                  <>
                    <h3 className="font-semibold text-lg mt-4 mb-3">Палочка</h3>
                    <InfoRow label="Дерево" value={character.wand.wood} />
                    <InfoRow label="Сердцевина" value={character.wand.core} />
                    <InfoRow label="Длина" value={`${character.wand.length} см`} />
                  </>
                )}

                <h3 className="font-semibold text-lg mt-4 mb-3">Хогвартс</h3>
                <InfoRow label="Студент" value={character.hogwartsStudent ? 'Да' : 'Нет'} />
                <InfoRow label="Преподаватель" value={character.hogwartsStaff ? 'Да' : 'Нет'} />
              </div>
            </div>

            {character.actor && (
              <div className="mt-6 p-4 bg-gray-100 rounded">
                <p className="font-semibold">Актер: {character.actor}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательный компонент
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-right">{value || 'Неизвестно'}</span>
    </div>
  );
}

// 'use client'
// import { useParams } from "next/navigation";

// const Page = () => {
//   const params: any = useParams<{ tag: string; item: string }>();
//   const id: string = params.id;
    
//   return (
//     <div>Page = {id}</div>
//   )
// }

// export default Page