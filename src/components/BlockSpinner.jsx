import  * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
// for animation i use useRef
import { useState, useRef } from 'react'
//  useFrame animation for each frame/ i adding different obstacles so i will use a random speed and multiply the time by it and the useState 
import { useFrame } from '@react-three/fiber'
import { AxesHelper } from "three"; // Import AxesHelper


THREE.ColorManagement.legacyMode= false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor2Material = new THREE.MeshStandardMaterial({color:"green"})
const obstacleMaterial = new THREE.MeshStandardMaterial({color:"red"})

 export  function BlockSpinner({position = [0, 0, 0]}){

    const obstacle = useRef()
    //  to avoid th speed of been too slow i add 0.2
    // to change the direction of the speed i'm using another Math.random() if the value in below 0.5 it is multiply by -1 if not by 1 it will be half half
    const [speed] = useState(() => (Math.random()+ 0.2)* (Math.random() < 0.5 ? -1 : 1))
    // console.log(speed)

    useFrame((state) => {
            const time = state.clock.getElapsedTime()
            // console.log("here is time")
            //setNextKinematicRotation to rotate the spinner  it use a quaternion , three.js will be use to create a quaternarion from a Euler
            const rotation = new THREE.Quaternion()
            rotation.setFromEuler( new THREE.Euler(0, time * speed, 0)) 
            obstacle.current.setNextKinematicRotation(rotation);
        

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
        // type="kinematicPosition"  will do same  rotation as the floor spinner and it won't slow down if something blocks it.it will always turn at the same speed also the rigid body want fall
        type = "kinematicPosition"
        position = {[0, 0.3, 0]} 
        //restitution and friction gives little bounce 
        restitution = {0.2 } 
        friction = {0}
        >    
            <mesh 
            geometry = {boxGeometry}
            material = {obstacleMaterial}
            scale = {[3.5, 0.3, 0.3]} castShadow receiveShadow/>
       </RigidBody>
    </group>
}
