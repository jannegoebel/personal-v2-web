import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Earth() {
  const texture = useLoader(TextureLoader, "/textures/earth_december_day.jpg");

  return (
    <mesh>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
