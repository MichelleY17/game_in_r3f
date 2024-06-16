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
const wallMaterial = new THREE.MeshStandardMaterial({color:"slategrey"})

export  function BlockSlide({position = [0, 0, 0]}){

    const obstacle = useRef()
    // same spedd off set in time radom per Math.PI
    const [timeOffset] = useState(() => Math.random()* Math.PI * 2)
    

    useFrame((state) => {
            const time = state.clock.getElapsedTime()
            //the obstacle moves side to side by multiplying it by 1.25
            const x = Math.sin(time + timeOffset) * 1.2
            // kinematicPosition  gives problems in this case how to fix? prop in setKinematicTraslation
            obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y:position[1]+.75 , z: position[2]})
        

    }
    )

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