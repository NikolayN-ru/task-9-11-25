// components/LikeButton.tsx
"use client";

import { useCounterStore } from "@/store/store";

interface LikeButtonProps {
  characterId: string;
  characterName: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function LikeButton({ characterId, characterName, size = "md", showCount = false }: LikeButtonProps) {
    // console.log(characterId, 'characterId')
  const { toggleLike, isLiked, likedCharacters, likedCharacters2, toggleLike2 } = useCounterStore();

  const liked = isLiked(characterId);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // toggleLike(characterId);
    toggleLike2(characterId);
  };



  const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.includes('apple'));    // true


const INC =()=> {

return likedCharacters2.includes(characterId)
}

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className={`
          flex items-center justify-center rounded-full transition-all
          hover:scale-110 active:scale-95
          ${sizeClasses[size]}
          ${liked ? "bg-red-500 text-white shadow-lg" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}
        `}
        aria-label={liked ? `Убрать лайк ${characterName}` : `Лайкнуть ${characterName}`}
        title={INC() ? "Убрать лайк" : "Лайкнуть"}
      >
        <svg className={`${size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"}`} fill={INC() ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={INC() ? 0 : 2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {showCount && <span className="text-sm text-gray-600 font-medium">{likedCharacters.length}</span>}
    </div>
  );
}
