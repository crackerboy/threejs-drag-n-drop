var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 1;

var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

controls.update();

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
    object.position.y = 0;

  })
})

var objects = [];

// Add 100 random objects (spheres)
var object, material, radius;
var objGeometry = new THREE.SphereGeometry(1, 24, 24);
for (var i = 0; i < 50; i++) {
  material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
  material.transparent = true;
  object = new THREE.Mesh(objGeometry.clone(), material);
  objects.push(object);

  radius = Math.random() * 4 + 2;
  object.scale.x = radius;
  object.scale.y = radius;
  object.scale.z = radius;

  object.position.x = Math.random() * 50 - 25;
  object.position.y = Math.random() * 50 - 25;
  object.position.z = Math.random() * 50 - 25;

  scene.add(object);
}

var dragControls = new THREE.DragControls( objects, camera, renderer.domElement, controls );
