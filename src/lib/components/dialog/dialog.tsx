import type { PropsWithChildren } from "react";
import { cn } from "../_shared/styling";

type Props = {
  className?: string;
  onClose: () => void;
};

export default function Dialog({
  className,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 backdrop-blur-sm bg-neutral-500/25 grid place-items-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className={cn("relative z-51", className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
