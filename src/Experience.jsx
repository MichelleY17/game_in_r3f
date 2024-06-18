import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import Player from "./components/Player.jsx";
import useGame from "./stores/useGame.jsx";

export default function Experience() {

  const blocksCount = useGame((state) => state.blocksCount)
  // console.log(blocksCount)
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Physics debug={false} />
        <Lights />
        <Level count={blocksCount}/>
        <Player />
      </Physics>
    </>
  );
}
