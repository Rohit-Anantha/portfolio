import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'


// threejs
import * as THREE from './node_modules/three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// where stuff is?
const scene = new THREE.Scene();

// how to view the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry( 20 , 3, 16, 100);

const material = new THREE.MeshStandardMaterial( {color: 0xdf4700} );

const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xEEEEEE);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)

}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('galaxy.jpg')
scene.background = spaceTexture;

const rohitTexture = new THREE.TextureLoader().load('square.png');

const rohit = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial( { map : rohitTexture} )
);

scene.add(rohit)

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.y = t * -.03;
}

document.body.onscroll = moveCamera

function animate(){
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    rohit.rotation.x -= .01
    rohit.rotation.y -= .01
    rohit.rotation.z -= .01

    controls.update()

    requestAnimationFrame( animate );
    renderer.render(scene, camera)
}

animate();

