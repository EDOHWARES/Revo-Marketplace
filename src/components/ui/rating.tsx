import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

export function Rating({ value, max = 5, readOnly = false, onChange }: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = value >= i + 1;
    const half = value >= i + 0.5 && value < i + 1;

    return (
      <button
        key={i}
        className={`text-yellow-400 ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => !readOnly && onChange?.(i + 1)}
        disabled={readOnly}
      >
        {filled ? (
          <Star className="w-4 h-4 fill-current" />
        ) : half ? (
          <StarHalf className="w-4 h-4 fill-current" />
        ) : (
          null
        )}
      </button>
    );
  });

  return <div className="flex gap-0.5">{stars}</div>;
} 