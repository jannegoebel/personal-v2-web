import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { buttonStyle, labelStyle } from "./_styles";
import { cn } from "../_shared/styling";

type Props = {
  className?: string;
  classNameLabel?: string;
  label: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  destination: string;
};

export default function LinkButton({
  className,
  classNameLabel,
  label,
  leftIcon,
  rightIcon,
  destination,
}: Props) {
  return (
    <Link className={cn(buttonStyle, className)} to={destination}>
      {leftIcon}
      <p className={cn(labelStyle, classNameLabel)}>{label}</p>
      {rightIcon}
    </Link>
  );
}
