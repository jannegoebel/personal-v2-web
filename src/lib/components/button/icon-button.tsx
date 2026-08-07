import type { PropsWithChildren } from "react";
import { cn } from "../_shared/styling";
import { buttonStyle } from "./_styles";

type Props = {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function IconButton({
  className,
  children,
  onClick,
  disabled = false,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(buttonStyle, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
