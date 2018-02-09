var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(10, 10, 0);
camera.lookAt(new THREE.Vector3(0,0,0));

var objects = [];

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

var gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );

var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.update();

var dragControls = new THREE.DragControls( objects, camera, renderer.domElement, controls );

// LIGHTS
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.8 );
dirLight.position.set( -1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('models/');
mtlLoader.load('potions.mtl', function (materials) {

  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load('potions.obj', function (object) {

    scene.add(object);
    objects.push(object.children[0]);
    objects.push(object.children[1]);
    objects.push(object.children[2]);
    objects.push(object.children[3]);
    console.log(objects);
    object.position.y = 1;

  })
})

// Add 10 random objects (spheres)
var object, material, radius;
var objGeometry = new THREE.SphereGeometry(1, 24, 24);
for (var i = 0; i < 10; i++) {
  material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
  material.transparent = true;
  object = new THREE.Mesh(objGeometry.clone(), material);
  objects.push(object);

  radius = Math.random() * 0.5 + 0.3;
  object.scale.x = radius;
  object.scale.y = radius;
  object.scale.z = radius;

  object.position.x = Math.random() * 5 - 2;
  object.position.y = Math.random() * 5;
  object.position.z = Math.random() * 5 - 2;

  scene.add(object);
}
