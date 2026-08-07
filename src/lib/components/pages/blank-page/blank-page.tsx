import type { PropsWithChildren } from "react";
import { cn } from "../../_shared/styling";

type Props = {
  className?: string;
};

export default function BlankPage({
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-hidden overflow-y-auto p-4 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
