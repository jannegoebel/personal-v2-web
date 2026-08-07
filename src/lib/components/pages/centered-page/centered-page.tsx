import type { PropsWithChildren } from "react";
import { cn } from "../../_shared/styling";

type Props = {
  className?: string;
};

export default function CenteredPage({
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "w-full grid place-items-center overflow-hidden p-4 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
