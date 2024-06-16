import  * as THREE from 'three'
import { RigidBody } from '@react-three/rapier';

THREE.ColorManagement.legacyMode = false;
const playerForm = new THREE.IcosahedronGeometry(.3, 1, 8)
const playerColor = new THREE.MeshStandardMaterial({color: "violet", flatShading: true})

export default function Player(){

    return<>
        <RigidBody  type="dynamic" colliders="ball" position={[0, 0.5, 0]}>
            <mesh
                geometry={playerForm}
                material={playerColor}
                castShadow
            
            />
        </RigidBody>
    </>

}
