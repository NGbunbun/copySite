//===============================================================
// Import Library
//===============================================================
import * as THREE from './lib/three.module.js';
import {scene, camera, container, renderer} from './basescene.js';

//===============================================================
// Init
//===============================================================
window.addEventListener('load',function(){
    init();
});

let sphere;
const smallSpheres = []; // 小さな球体の配列

function init(){
    setLoading();
}

function setLoading(){
    threeWorld();
    setLight();
    rendering();
}

//===============================================================
// Create World
//===============================================================
function threeWorld(){
    renderer.outputEncoding = THREE.sRGBEncoding;

    // 球の作成
    const geometry = new THREE.SphereGeometry(3,128,128);
    const material = new THREE.MeshStandardMaterial({
        color: "#589e57",
        transparent: true,
        opacity: 0.8,
        emissive: "5e6e64",
    });
    sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);

    // 小さな球体の作成
    const smallSphereCount = 5; // 小さな球体の数
    const smallSphereRadius = 0.1; // 小さな球体の半径

    const smallGeometry = new THREE.SphereGeometry(smallSphereRadius, 32, 32);
    const smallMaterial = new THREE.MeshStandardMaterial({
        color: "#589e57",
        emissive: "5e6e64",
    });

    for (let i = 0; i < smallSphereCount; i++) {
        const smallSphere = new THREE.Mesh(smallGeometry, smallMaterial);
        scene.add(smallSphere);
        smallSpheres.push(smallSphere);
    }
}

function setLight(){
    const ambientlight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientlight);

    const pointLight   = new THREE.PointLight(0XFFFFFF,10,100,1);
    const pointLight2  = new THREE.PointLight(0XFFFFFF,0.05,50,1);
    pointLight.position.set(5,5,0);
    pointLight2.position.set(0,-10,0);
    scene.add(pointLight);
    scene.add(pointLight2);
}


function rendering(){
    requestAnimationFrame(rendering);

    // 球の動き
    const r = 2.5;    // 球の半径
    const k = 1;      // 球の凹凸加減

    const time      = performance.now() * 0.001;
    const positions = sphere.geometry.attributes.position.array;

    for(let i = 0; i < positions.length; i++){
        const p = new THREE.Vector3(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2]
        );

        p.normalize().multiplyScalar(r + 0.7 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));

        positions[i * 3]     = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
    }

    sphere.geometry.attributes.position.needsUpdate = true;
    sphere.geometry.computeVertexNormals();

    // 小さな球体の動き
    const smallSphereCount    = smallSpheres.length;
    const smallSphereDistance = 2;    // 小さな球体の元の球体からの距離
    const smallSphereSpeed    = 0.5;    // 小さな球体の周回速度
    
    for (let i = 0; i < smallSphereCount; i++) {
        const smallSphere = smallSpheres[i];
        const angle       = (i / smallSphereCount) * Math.PI * 2; // 角度の計算
    
        const smallSphereX = Math.cos(time * smallSphereSpeed + angle) * (r + smallSphereDistance);
        // const smallSphereY = Math.sin(time * smallSphereSpeed + angle) * (r + smallSphereDistance);
        const smallSphereZ = Math.sin(time * smallSphereSpeed + angle) * (r + smallSphereDistance);
    
        smallSphere.position.set(smallSphereX, 0, smallSphereZ);
      }
    

    renderer.render(scene,camera);
}