import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
// Clock: 该对象用于跟踪时间

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
// cube.rotation.set(Math.PI / 4, 0, 0, 'XYZ');
// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;
// cube.rotation.z = Math.PI / 4;

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
// 为轨道控制器添加启用阻尼,看起来更真实,具有惯性
controls.enableDamping = true;

// 7.添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let animate = gsap.to(cube.position, {
  // 设置动画移动方向
  x: 5,

  // 设置动画执行时间
  duration: 5,

  // 设置动画执行速度
  ease: 'power1.out',

  // 设置动画延迟执行的时间,单位秒
  delay: 3,

  // 设置动画执行次数, -1为无限次
  repeat: -1,

  // 设置动画是否进行往返运动
  yoyo: true,
  // 动画执行完毕的回调
  onComplete: () => {
    console.log('动画执行完毕回调');
  },

  // 动画开始执行的回调
  onStart: () => {
    console.log('动画开始执行回调');
  },
}); // x轴动画
gsap.to(cube.rotation, { x: Math.PI * 2, duration: 5, ease: 'power1.out' }); // 旋转360度

window.addEventListener('dblclick', () => {
  console.log(animate.isActive());
  console.log(animate);

  // 双击暂停动画与双击恢复动画
  // isActive(): 检查动画是否在进行中, 进行中为true
  if (animate.isActive()) {
    // 暂停
    animate.pause();
  } else {
    // 恢复
    animate.resume();
  }
});

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
