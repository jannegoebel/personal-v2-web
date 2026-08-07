import { TriangleAlert } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "../_shared/styling";
import Skeleton from "../skeleton/skeleton";

type Props = {
  className?: string;
  classNameImage?: string;
  placeholder?: ReactNode;
  url: string | undefined;
  noSkeleton?: boolean;
};

export default function Image({
  className,
  classNameImage,
  placeholder,
  url,
  noSkeleton = false,
}: Props) {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(false);

  const errorComponent = placeholder ?? (
    <div className="absolute inset-0 z-0 grid place-items-center bg-secondary">
      <TriangleAlert className="w-[60%] h-[60%] text-secondary-foreground" />
    </div>
  );

  return (
    <div
      className={cn(
        "relative h-20 w-20 grid place-items-center overflow-hidden",
        className,
      )}
    >
      {!initialized && !noSkeleton && (
        <Skeleton className="absolute inset-0 z-1" />
      )}
      {error && errorComponent}
      {!error && (
        <img
          className={cn(
            "absolute inset-0 z-2 h-full w-full object-contain object-center",
            classNameImage,
          )}
          loading="lazy"
          src={url}
          onLoad={() => setInitialized(true)}
          onError={() => {
            setError(true);
            setInitialized(true);
          }}
        />
      )}
    </div>
  );
}
