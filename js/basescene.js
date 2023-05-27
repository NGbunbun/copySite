//===============================================================
// Import Library
//===============================================================
import * as THREE from './lib/three.module.js';

//===============================================================
// Base scene
//===============================================================
let scene,camera,container,renderer;

init();

function init(){
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000);
    camera.position.set(0,0,7);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xfcf4e0));

    container = document.querySelector('#canvas_vr');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize',function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
    },false);
}

export {scene, camera, container, renderer}