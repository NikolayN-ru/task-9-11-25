import { create } from "zustand";
import HarryPotterCharacter from "./interface.store";
import { persist, createJSONStorage } from "zustand/middleware";

const URL: string = "https://jsonplaceholder.typicode.com";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  posts: [],
  photos: [],
  characters: [],
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  //id
  character: null,
  characterLoading: false,
  characterError: null,

  //Likes
  likedCharacters: [],

  likedCharacters2: [],

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(URL + "/posts");
      const posts = await response.json();
      set({ posts, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },

  fetchCharacters2: async () => {
    set({ loading: true, error: null });
    try {
      // const response = await fetch(URL+'/photos');
      const response = await fetch("https://hp-api.onrender.com/api/characters");
      // console.log(characters, 'characters')
      const characters = await response.json();
      set({ characters, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },

  // Получить персонажа по ID
  fetchCharacterById: async (id: string) => {
    set({ characterLoading: true, characterError: null });

    try {
      const response = await fetch(`https://hp-api.onrender.com/api/character/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const characterData = await response.json();

      // API возвращает массив с одним элементом
      if (characterData && characterData.length > 0) {
        set({ character: characterData[0], characterLoading: false });
      } else {
        throw new Error("Персонаж не найден");
      }
    } catch (error) {
      set({
        characterError: error instanceof Error ? error.message : "Ошибка загрузки персонажа",
        characterLoading: false,
      });
    }
  },

  //likes//
toggleLike2: (characterId: string) => {
  set((state) => {
    const isLiked = state.likedCharacters2.includes(characterId);
    
    if (isLiked) {
      // Удаляем из массива
      console.log('Удаляем лайк:', characterId);
      return {
        likedCharacters2: state.likedCharacters2.filter(id => id !== characterId)
      };
    } else {
      // Добавляем в массив
      console.log('Добавляем лайк:', characterId);
      return {
        likedCharacters2: [...state.likedCharacters2, characterId]
      };
    }
  });
},


  toggleLike: (characterId: string) => {
    const { likedCharacters } = get();

    if (likedCharacters.includes(characterId)) {
      // Удаляем лайк
      set({
        likedCharacters: likedCharacters.filter((id) => id !== characterId),
      });
    } else {
      // Добавляем лайк
      set({
        likedCharacters: [...likedCharacters, characterId],
      });
    }
  },

  // Проверить, лайкнут ли персонаж
  isLiked: (characterId: string) => {
    // const state = get();
    // return state.likedCharacters.includes(characterId);
    return []
  },

  // // Очистить данные одного персонажа
  // clearCharacter: () => set({ character: null, characterError: null }),

  // // Очистить все ошибки
  // clearErrors: () => set({ charactersError: null, characterError: null }),

  reset: () => set({ count: 0 }),
}));
