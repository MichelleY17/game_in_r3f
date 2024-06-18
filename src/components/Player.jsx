import  * as THREE from 'three'
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
// import { useKeyboardControls } from '@react-three/drei';

THREE.ColorManagement.legacyMode = false;
const playerForm = new THREE.IcosahedronGeometry(.3, 1, 8)
const playerColor = new THREE.MeshStandardMaterial({color: "violet", flatShading: true})

export default function Player(){
    
    // this hook will return an array of two things 
    // fuction to subscribe to key changes (press jump key)
    // function to get the current state of the keys(when wasd are being pressed)
    // const [subscribeKeys, getKeys]= useKeyboardControls()
    // console.log(subscribeKeys)
    // console.log(getKeys)

    // useFrame(()=>{
    //     const {forward, backward, leftward, rightward}= getKeys()
    //     console.log(forward, backward, leftward, rightward)
    // })

    return<>
        <RigidBody canSleep={false} type="dynamic" colliders="ball" restitution={.2} friction={1} position={[0, 0.5, 0]}>
            <mesh
                geometry={playerForm}
                material={playerColor}
                castShadow/>
        </RigidBody>
    </>

}
