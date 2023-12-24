import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

// 使用BufferGeometry设置定点生成酷炫三角形

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

// 创建几何体
// 创建9个
for (let i = 0; i < 50; i++) {
  // 每一个三角形都需要3个顶点, 每个顶点需要3个值
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);

  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5;
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionArray, 3)
  );

  // 随机颜色
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());

  // 设置材质
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.5,
  });

  // 创建物体
  const mesh = new THREE.Mesh(geometry, material);
  console.log(mesh);
  scene.add(mesh);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const render = () => {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

render();

// 根据尺寸的变化实现自适应画面

// 1.监听页面变化, 更新并渲染画面
window.addEventListener('resize', () => {
  console.log('变化');

  // 2.更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;

  // 3.更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  // 4.更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 5.设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
