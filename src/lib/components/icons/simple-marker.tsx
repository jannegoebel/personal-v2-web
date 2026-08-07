type Props = {
  className?: string;
  size?: number;
};

export default function SimpleMarkerIcon({ className, size = 20 }: Props) {
  return (
    <svg className={className} height={size} viewBox="0 0 30 30">
      <polygon points="0,2.01 30,2.01 15,27.99" fill="currentColor" />
    </svg>
  );
}
