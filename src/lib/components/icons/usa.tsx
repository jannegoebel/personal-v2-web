type Props = {
  className?: string;
};

export default function UsaFlagIcon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 1000 600">
      <rect width="1000" height="600" fill="#FFFFFF" />

      <g fill="#B22234">
        <rect y="0" width="1000" height="46.154" />
        <rect y="92.308" width="1000" height="46.154" />
        <rect y="184.615" width="1000" height="46.154" />
        <rect y="276.923" width="1000" height="46.154" />
        <rect y="369.231" width="1000" height="46.154" />
        <rect y="461.538" width="1000" height="46.154" />
        <rect y="553.846" width="1000" height="46.154" />
      </g>

      <rect width="400" height="323.08" fill="#3C3B6E" />

      <defs>
        <symbol id="star" viewBox="-50 -50 100 100">
          <polygon
            fill="#FFF"
            points="0,-50 14,-15 47,-15 23,7 31,40 0,21 -31,40 -23,7 -47,-15 -14,-15"
          />
        </symbol>
      </defs>

      <g>
        <g id="r6">
          <use href="#star" x="39" y="30" width="18" height="18" />
          <use href="#star" x="101" y="30" width="18" height="18" />
          <use href="#star" x="163" y="30" width="18" height="18" />
          <use href="#star" x="225" y="30" width="18" height="18" />
          <use href="#star" x="287" y="30" width="18" height="18" />
          <use href="#star" x="349" y="30" width="18" height="18" />
        </g>

        <g id="r5">
          <use href="#star" x="70" y="60" width="18" height="18" />
          <use href="#star" x="132" y="60" width="18" height="18" />
          <use href="#star" x="194" y="60" width="18" height="18" />
          <use href="#star" x="256" y="60" width="18" height="18" />
          <use href="#star" x="318" y="60" width="18" height="18" />
        </g>

        <use href="#r6" />
        <use href="#r5" />
        <use href="#r6" transform="translate(0,60)" />
        <use href="#r5" transform="translate(0,60)" />
        <use href="#r6" transform="translate(0,120)" />
        <use href="#r5" transform="translate(0,120)" />
        <use href="#r6" transform="translate(0,180)" />
        <use href="#r5" transform="translate(0,180)" />
        <use href="#r6" transform="translate(0,240)" />
      </g>

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
