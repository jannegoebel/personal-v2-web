type Props = {
  className?: string;
};

export default function GermanyFlagIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 1000 600">
      <rect width="1000" height="600" fill="#000000" />
      <rect y="200" width="1000" height="200" fill="#DD0000" />
      <rect y="400" width="1000" height="200" fill="#FFCE00" />
      <rect
        x="4"
        y="4"
        width="992"
        height="592"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="8"
      />
    </svg>
  );
}
