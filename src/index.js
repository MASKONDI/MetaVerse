import keyInput  from "./KeyInput.js";
import connect from "./connect.js";
// import * as THREE from '../three.js-master/build/three.module.js'
import { GLTFLoader } from '../GLTFLoader.js';

connect.then(() => {});
//const canvas = document.querySelector('.wbgl');
const ratio = window.innerWidth/ window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 ); //.1-clipping start , 1000-clipping end

const renderer = new THREE.WebGLRenderer(); //what people should see
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0x404040);
const dLight = new THREE.DirectionalLight(0xffffff,0.5); //.5 is brightnees

light.add(dLight)
;
scene.add(light);
const loader =new  GLTFLoader();
console.log(loader);

loader.load( '../dist/assets/ranbir/model.glb', function ( gltf ) {
    gltf.scene.scale.set(7,7,7);
    gltf.scene.position.set(1,0,8);
    function animate() {
       // gltf.scene.rotation.y += 0.01;
        //gltf.scene.rotation.z += 0.01;
         requestAnimationFrame( animate ); //w -forward
         if(keyInput.isPressed(87)){
            gltf.scene.position.z -=0.05;
           // gltf.scene.rotation.y = -460;
           
        }
        if(keyInput.isPressed(83)){ //s --backword
            //  gltf.scene.position.y -= 0.05;
           
            gltf.scene.position.z +=0.05;
            gltf.scene.rotation.y +=0.1 ;
           
        }
        if(keyInput.isPressed(65)){  //a --left
            //  gltf.scene.position.y -= 0.05;
             
             gltf.scene.position.x -=0.05;
             //gltf.scene.rotation.y = -360;
        }
        if(keyInput.isPressed(68)){  //d --right
            //  gltf.scene.position.y += 0.05;
           
            gltf.scene.position.x +=0.05;
            //gltf.scene.rotation.y = 360;
           
           
        }
        camera.lookAt(ground.position);
        renderer.render( scene, camera );
     }
   
	scene.add( gltf.scene );
    animate();
}, undefined, function ( error ) {

	console.error( error );

} );
loader.load( '../dist/assets/alia/alia2/model.glb', function ( gltf ) {
    gltf.scene.scale.set(7,7,7);
    gltf.scene.position.set(3,0,4);
    function animate() {
       // gltf.scene.rotation.y += 0.01;
        //gltf.scene.rotation.z += 0.01;
         requestAnimationFrame( animate ); //w -forward
         if(keyInput.isPressed(73)){
            gltf.scene.position.z -=0.05;
           // gltf.scene.rotation.y = -460;
           
        }
        if(keyInput.isPressed(75)){ //s --backword
            //  gltf.scene.position.y -= 0.05;
           
            gltf.scene.position.z +=0.05;
            gltf.scene.rotation.y +=0.1 ;
           
        }
        if(keyInput.isPressed(74)){  //a --left
            //  gltf.scene.position.y -= 0.05;
             
             gltf.scene.position.x -=0.05;
             //gltf.scene.rotation.y = -360;
        }
        if(keyInput.isPressed(76)){  //d --right
            //  gltf.scene.position.y += 0.05;
           
            gltf.scene.position.x +=0.05;
            //gltf.scene.rotation.y = 360;
           
           
        }
        camera.lookAt(ground.position);
        renderer.render( scene, camera );
     }
   
	scene.add( gltf.scene );
    animate();
}, undefined, function ( error ) {

	console.error( error );

} );

// loader.load( '../assets/head1.2/model.obj', function ( gltf ) {
//     gltf.scene.scale.set(7,7,7);
//     gltf.scene.position.set(9,0,10);
// 	scene.add( gltf.scene );
//     //animate();
// }, undefined, function ( error ) {

// 	console.error( error );

// } );



const geometry = new THREE.BoxGeometry(50,0.1,50); //width height depth
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
const ground = new THREE.Mesh( geometry, material );

scene.add( ground );
camera.position.set(5,15,15);

// const boxGeometry = new THREE.BoxGeometry(2,2,2); //width height depth
// const boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// const box = new THREE.Mesh( boxGeometry, boxMaterial );
// box.position.set(-2,0,8);

// scene.add(box);

function animate() {
   // cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
   

	requestAnimationFrame( animate );
    if(keyInput.isPressed(38)){
        camera.position.y += 0.05;
        camera.position.x +=0.05;
    }
    if(keyInput.isPressed(40)){
        camera.position.y -= 0.05;
        camera.position.x -=0.05;
    }
    camera.lookAt(ground.position);
	renderer.render( scene, camera );
}
animate();
connect.then((result) => {
    console.log("result is ",result);
    result.buildings.forEach((b, index) => {
        if(index <= result.supply){
            const boxGeometry = new THREE.BoxGeometry(b.w,b.h,b.d); //width height depth
            const boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
            const box = new THREE.Mesh( boxGeometry, boxMaterial );
            box.position.set(b.x,b.y,b.z);

            scene.add(box);
        }

    });
});
//renderer.render(scene,camera);