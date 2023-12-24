import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import * as dat from 'dat.gui';

// 通过gui来调试threejs

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff4045 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// GUI
const gui = new dat.GUI();

const params = {
  color: '#f00',
  move: () => {
    gsap.to(cube.position, { x: 5, yoyo: true, repeat: -1, duration: 2 });
  },
};

// 创建文件夹
const folder = gui.addFolder('调试立方体');

// 移动x轴
folder
  .add(cube.position, 'x')
  .name('移动x轴')
  .min(0.01)
  .max(5)
  .step(0.01)
  .onChange((value) => {
    console.log('位置改变:', value);
  })
  .onFinishChange((value) => {
    console.log('鼠标抬起(最终位置):', value);
  });

// 改变物体颜色
folder.addColor(params, 'color').onChange((value) => {
  cube.material.color.set(value);
});

// 设置选项框
folder.add(cube, 'visible').name('是否显示物体');

// 点击按钮触发某个事件
folder.add(params, 'move').name('立方体运动');

// 将物体设置为线框
folder.add(cube.material, 'wireframe').name('将立方体设置为线框');

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
