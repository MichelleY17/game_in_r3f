import  * as THREE from 'three'
import BlockLimbo from './BlockLimbo'
import BlockSpinner from './BlockSpinner'
import BlockAxe from './BlockAxe'



THREE.ColorManagement.legacyMode= false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({color:"limegreen"})

function BlockStart({position = [0, 0, 0]}){
    
    return <group position = {position}>
        {/* Starting Floor */}
        <mesh  
        geometry = {boxGeometry} 
        material = {floor1Material} 
        position = {[0, -0.1, 0]} 
        scale = {[4, 0.2, 4]} receiveShadow />
       
    </group>
}

function Level(){
    return<>
        <BlockStart position = {[0, 0, 8]} />
        <BlockLimbo position = {[0, 0, 0 ]} />
        <BlockSpinner position = {[0, 0, 4]} />
        <BlockAxe position = {[0, 0, -4]}/>

    </> 
}

export default Level