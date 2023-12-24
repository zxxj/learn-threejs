import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 设置物体旋转

// 1.创建场景
const scene = new THREE.Scene();

/* 
	2.创建相机
	fov — 摄像机视锥体垂直视野角度
	aspect — 摄像机视锥体长宽比
	near — 摄像机视锥体近端面
	far — 摄像机视锥体远端面
*/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置 x轴,y轴,z轴
camera.position.set(0, 0, 10);

// 将相机添加到场景当中
scene.add(camera);

// 3.添加物体

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// 添加材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff4045 });

// 根据几何体与材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将创建好的几何体添加到场景中
scene.add(cube);

// 将物体x轴旋转为45度
cube.rotation.set(Math.PI / 4, 0, 0, 'XYZ');
// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;
// cube.rotation.z = Math.PI / 4;
console.log(cube);
// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer); // 此时会生成一个canvas
// 将渲染器生成的canvas添加到body
document.body.appendChild(renderer.domElement);

// 5.使用渲染器, 通过相机将场景渲染进来
// renderer.render(scene, camera);

// 6.添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 7.添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const render = () => {
  // 如果物体的x轴距离小于5,每次刷新帧率时就加0.1,到5就归零,反复循环
  if (cube.position.x < 5) {
    cube.position.x += 0.1;
    cube.rotation.x += 0.1;
  } else {
    cube.position.x = 0;
    cube.rotation.x = 0;
  }
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

render();
