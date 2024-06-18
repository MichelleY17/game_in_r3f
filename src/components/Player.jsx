import * as THREE from "three";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import {useState, useEffect, useRef } from "react";
import useGame from "../stores/useGame";

THREE.ColorManagement.legacyMode = false;
const playerForm = new THREE.IcosahedronGeometry(0.3, 1, 8);
const playerColor = new THREE.MeshStandardMaterial({
  color: "violet",
  flatShading: true,
});

export default function Player() {
  const body = useRef()
  // this hook will return an array of two things
  // fuction to subscribe to key changes (press jump key)
  // function to get the current state of the keys(when wasd are being pressed)
  const [subscribeKeys, getKeys] = useKeyboardControls();
  // console.log(subscribeKeys);
  const {rapier, world} = useRapier()
  const rapierWorld = world
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3())


  const start = useGame((state) => state.start)
  const end = useGame((state) => state.end)
  const restart = useGame((state) => state.restart)
  const blocksCount = useGame((state) => state.blocksCount)

  const  jump = () =>{
    // console.log('jump', 'weee!')
    const origin = body.current.translation()
    origin.y -= .31
    const direction = {x:0, y: -1, z:0}
    const ray = new rapier.Ray(origin, direction)
    const hit = rapierWorld.castRay(ray, 10, true)
    if(hit.toi < .15)
      body.current.applyImpulse({x:0, y:.5, z:0})
  }
  // reset remove physics form the player

  const reset = () =>{
    body.current.setTranslation({x:0, y:1, z:0})
    body.current.setLinvel({x:0, y:0, z:0})
    body.current.setAngvel({x:0, y:0, z:0})
  }


  // jump key
  useEffect(() => {

     const unsubscribeReset = useGame.subscribe(
      (state) =>state.phase,
      (value ) => {
        if(value === 'ready'){
          reset()
        }
      },
    )

    const unsubscribeJump = subscribeKeys(
      (state) =>state.jump,
      // jump when press no when release
      (value)=>{
        if(value)
            jump()
      }) 
      const unsubscribeAny = subscribeKeys(
        () => {
          start()
      })
      return () => {
        unsubscribeJump()
        unsubscribeAny()
        unsubscribeReset()
      }
  }, [] )
  useFrame((state, delta) => {
   

    // controls
    const { forward, backward, leftward, rightward } = getKeys();
    console.log(forward, backward, leftward, rightward);
    //to make the ball roll i use aplyTorqueImpulse
    // to push the ball aplayImpulse
    const impulse = {x:0, y:0, z:0}
    const torque = {x: 0, y:0, z:0}

    const impulseStrength = .5 * delta
    const torqueStrength = .2 * delta 
    // move forward
    if(forward){
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }
    // move  backward
    if(backward){
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }
    // move leftward
    if(leftward){
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }
    // move rigthward
    if(rightward){
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    body.current.applyImpulse(impulse)
    body.current.applyTorqueImpulse(torque)


    // camera
     const bodyPosition = body.current.translation()

     const cameraPosition = new THREE.Vector3()
     cameraPosition.copy(bodyPosition)
     cameraPosition.z += 2.25
     cameraPosition.y += .65

     const cameraTarget = new THREE.Vector3()
     cameraTarget.copy(bodyPosition)
     cameraTarget.y += .25

     smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
     smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

     state.camera.position.copy(smoothedCameraPosition)
     state.camera.lookAt(smoothedCameraTarget)


    //  phases

    if(bodyPosition.z < -(blocksCount *4 + 2))
      end()

    if(bodyPosition.y <- 4)
      restart()
  });

  return (
    <>
      <RigidBody
        ref={body}
        canSleep={false}
        type="dynamic"
        colliders="ball"
        restitution={0.2}
        linearDamping={.5}
        angularDamping={.5}
        friction={1}
        position={[0, 0.5, 0]}
      >
        <mesh geometry={playerForm} material={playerColor} castShadow />
      </RigidBody>
    </>
  );
}
