import { cn } from "../_shared/styling";

type Props = {
  className?: string;
};

export default function Skeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-200 dark:bg-neutral-800",
        className,
      )}
    />
  );
}
