import { cn } from "../../../lib/components/_shared/styling";

type Props = {
  className?: string;
};

export default function MapControl({ className }: Props) {
  return (
    <div
      className={cn(
        "w-full grid place-items-center gap-1 px-0.5 overflow-hidden",
        className,
      )}
    >
      <div className="w-full max-w-[80ch] flex flex-row justify-between gap-1 px-0.5 overflow-hidden">
        <p className="text-xs text-white/50">
          <a href="https://maplibre.org/">MapLibre</a>
        </p>
        <p className="flex flex-row gap-0.5 text-xs text-nowrap text-white/50">
          <a href="https://openfreemap.org/">OpenFreeMap</a>
          <a href="https://www.openmaptiles.org/">© OpenMapTiles</a>
          <a href="https://www.openstreetmap.org/copyright">
            Data From OpenStreetMap
          </a>
        </p>
      </div>
    </div>
  );
}
