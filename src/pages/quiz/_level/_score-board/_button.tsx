import type { PropsWithChildren } from "react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  onClick,
  disabled = false,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      className="cursor-pointer grid place-items-center p-1 bg-blue-600 border-2 border-blue-400 hover:bg-orange-500 hover:border-orange-300 disabled:bg-neutral-500 disabled:border-neutral-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
