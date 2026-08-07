import type { ReactElement } from "react";
import { buttonStyle, labelStyle } from "./_styles";
import { cn } from "../_shared/styling";

type Props = {
  className?: string;
  classNameLabel?: string;
  label: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  className,
  classNameLabel,
  label,
  leftIcon,
  rightIcon,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      className={cn(buttonStyle, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon}
      <p className={cn(labelStyle, classNameLabel)}>{label}</p>
      {rightIcon}
    </button>
  );
}
