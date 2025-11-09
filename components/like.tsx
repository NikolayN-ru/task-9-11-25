"use client";
import { useCounterStore } from "@/store/store";

interface LikeButtonProps {
  characterId: string;
  characterName: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const LikeButton = ({
  characterId,
  characterName,
  size = "lg",
  showCount = false,
}: Readonly<LikeButtonProps>) => {
  const { likedCharacters2, toggleLike2, likedCharacters } = useCounterStore();

  const isLiked = likedCharacters2.includes(characterId);

  const sizeClasses: Record<"sm" | "md" | "lg", string> = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-20 h-20",
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike2(characterId);
  };

  const iconSizeClasses: Record<"sm" | "md" | "lg", string> = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className={`
          flex items-center justify-center rounded-full transition-all
          hover:scale-110 active:scale-95
          ${sizeClasses[size]}
          ${
            isLiked
              ? "bg-red-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300"
          }
        `}
        aria-label={
          isLiked
            ? `Убрать лайк ${characterName}`
            : `Лайкнуть ${characterName}`
        }
        title={isLiked ? "Убрать лайк" : "Лайкнуть"}
      >
        <svg
          className={iconSizeClasses[size]}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={isLiked ? 0 : 2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {showCount && (
        <span className="text-sm text-gray-600 font-medium">
          {likedCharacters.length}
        </span>
      )}
    </div>
  );
};

export default LikeButton;