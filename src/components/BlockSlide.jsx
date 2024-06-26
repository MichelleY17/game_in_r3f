import  * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
// for animation i use useRef
import { useState, useRef } from 'react'
//  useFrame animation for each frame/ i adding different obstacles so i will use a random speed and multiply the time by it and the useState 
import { useFrame } from '@react-three/fiber'

THREE.ColorManagement.legacyMode= false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor2Material = new THREE.MeshStandardMaterial({color:"green"})
const obstacleMaterial = new THREE.MeshStandardMaterial({color:"red"})

export  function BlockSlide({position = [0, 0, 0]}){

    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random()* Math.PI * 2)
    
    useFrame((state) => {
        if (!obstacle.current) return; 

        const time = state.clock.getElapsedTime();
        const x = Math.sin(time + timeOffset) * 1.25;
        obstacle.current.setNextKinematicTranslation({
            x: position[0] + x,
            y: position[1] + 0.75,
            z: position[2]
        });
    });

    return <group position = {position}>
        {/* Floor Spinner */}
            <mesh  
            geometry = {boxGeometry} 
            material = {floor2Material} 
            position = {[0, -0.1, 0]} 
            scale = {[4, 0.2, 4]} receiveShadow />
        {/*obstacle  */}
        <RigidBody  ref = {obstacle}
        type = "kinematicPosition" 
        position = {[0, .3, 0]} 
        //restitution and friction gives little bounce 
        restitution = {0.2 } 
        friction = {0}
        >    
            <mesh 
            geometry = {boxGeometry}
            material = {obstacleMaterial}
            scale = {[1.5, 1.5, .3]} castShadow receiveShadow/>
       </RigidBody>
    </group>
}
