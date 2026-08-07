type Props = {
  className?: string;
};

export default function MailIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 30 30">
      <g transform="scale(1.25)">
        <path d="M22 4H2.01L2 20h20V4zm-2 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
      </g>
    </svg>
  );
}
