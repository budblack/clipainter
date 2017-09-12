<template>
    <div :class="$style.tp_scene_container">

    </div>
</template>
<style lang="less" module>
    .tp_scene_container {

        width: 100%;
        height: 100%;

        background-color: rgb(105, 212, 212);;
    }
</style>
<script>

  import '../three/controls/TrackballControls';
  import '../three/loaders/GLTFLoader';
  import '../three/renderers/CSS2DRenderer';

  const comm            = require('../../_comm'),
        { emitter: em } = comm;

  const THREE = require('three/build/three');
  export default {
    data () {
      return {};
    },
    eatch  : {},
    methods: {
      initThreeContainerControlPart   : function () {
        //=======================控制器========================
        let camera   = this.camera,
            renderer = this.renderer,
            scene    = this.scene;

        let controls                  = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed          = 2.0;
        controls.zoomSpeed            = 2.0;
        controls.panSpeed             = 3.0;
        controls.noZoom               = false;
        controls.noPan                = false;
        controls.staticMoving         = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys                 = [65, 83, 68]; //ASD 用于在 noRotat 模式下手动旋转
        controls.reset(new THREE.Vector3(0, 0, 0));
        eventEmitter.on('camera_target_update', function (target) {
          if (target) {
            let {
                  x = 0, y = 0, z = 0
                } = target;
            controls.reset(new THREE.Vector3(x, y, z));
          }
        });
        this.controls = trackballControl = controls;
      },
      initThreeContainerSpecialPart   : function () {
        //======================特殊对象=======================
        let geometry = new THREE.BoxGeometry(15, 20, 25);
        let material = new THREE.MeshPhongMaterial(
            {
              // wireframe:true,
              color          : 0x00ff00,
              transparent    : true,
              opacity        : 0.6,
              side           : THREE.FrontSide,
              vertexColors   : THREE.VertexColors,
              sizeAttenuation: false
            }
        );

        let cube  = new THREE.Mesh(geometry, material);
        this.cube = cube;
        this.scene.add(cube);
        this.camera.position.copy(cube.position);

      },
      initThreeContainerLightPart     : function () {
        let scene  = this.scene;
        let camera = this.camera;
        //======================灯光配置=======================
        //				// 环境光
        let ambiColor    = '#ffffff';
        let ambientLight = new THREE.AmbientLight(ambiColor);//设置颜色
        scene.add(ambientLight);
        // 天空光
        let directionalLightColor = '#ffffff';
        let directionalLight      = new THREE.DirectionalLight(directionalLightColor);
        directionalLight.position.set(-40, 60, -10);
        directionalLight.castShadow         = true;
        directionalLight.shadowCameraNear   = 2;
        directionalLight.shadowCameraFar    = 200;
        directionalLight.shadowCameraLeft   = -50;
        directionalLight.shadowCameraRight  = 50;
        directionalLight.shadowCameraTop    = 50;
        directionalLight.shadowCameraBottom = -50;
        directionalLight.distance           = 0;
        directionalLight.intensity          = 0.5;
        directionalLight.shadowMapHeight    = 1024;
        directionalLight.shadowMapWidth     = 1024;
        scene.add(directionalLight);

        // 来自镜头, 头顶一个灯泡
        var pointColor        = '#ffffff';
        let cameraLight       = new THREE.PointLight(pointColor);
        cameraLight.distance  = 500;
        cameraLight.intensity = 1;
        cameraLight.position.set(camera.position.x, camera.position.y, camera.position.z);
        scene.add(cameraLight);
        camera.position.z = 100;

        this.scene       = scene;
        this.camera      = camera;
        this.cameraLight = cameraLight;
      },
      initThreeContainerRenderPart    : function () {
        let scene         = this.scene,
            cameraLight   = this.cameraLight,
            camera        = this.camera,
            renderer      = this.renderer,
            lableRenderer = this.lableRnderer,
            cube          = this.cube,
            container     = $('#threeContainer')[0],
            controls      = this.controls,
            mouse         = this.currentMouse;
        let _this         = this;

        //===================以下是渲染方法组===================
        const resetRenderSize        = function () {
          let currentRendererSize = renderer.getSize();
          if (
              Math.abs(currentRendererSize.width - container.offsetWidth) > 2
              || Math.abs(currentRendererSize.height - container.offsetHeight) > 8
          ) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            lableRenderer.setSize(container.offsetWidth, container.offsetHeight);
          }
        };
        const updateCameraLight      = function () {
          if (cameraLight) {
            cameraLight.position.set(camera.position.x, camera.position.y, camera.position.z);
          }
        };
        const updateSpecialObject    = function () {
          if (cube) {
            cube.rotation.x += 0.002;
            cube.rotation.y += 0.002;
          }
        };
        const updateControls         = function () {
          if (controls && typeof controls.update === 'function') {
            controls.update();
          }
        };
        const updateHitestHeighlight = function () {

        };
        const updateCameraBearing    = function () {
          //					camera.up.x = 0;
          //					camera.up.y = 1;
          //					camera.up.z = 0;
        };
        const render                 = function () {
          updateSpecialObject();
          updateCameraLight();
          updateControls();
          updateHitestHeighlight();
          updateCameraBearing();

          requestAnimationFrame(render);
          renderer.render(scene, camera);
          lableRenderer.render(scene, camera);
          resetRenderSize();

          eventEmitter.emit('core/render/frameend', { scene: scene, camera: camera });
        };
        render();
        resetRenderSize();
      },
      initThreeContainerMouseEventPart: async function () {
        let container   = $('#threeContainer')[0],
            camera      = this.camera,
            renderer    = this.renderer,
            controls    = this.controls,
            INTERSECTED = null;
        scene           = this.scene;

        container.addEventListener(
            'mousemove',
            function (event) {
              event.preventDefault();
              let mouse     = new THREE.Vector3(),
                  raycaster = new THREE.Raycaster();
              mouse.x       = (
                                  event.layerX / container.offsetWidth
                              ) * 2 - 1;
              mouse.y       = -(
                  event.layerY / container.offsetHeight
              ) * 2 + 1;

              sceneControl
                  .hitest(mouse, camera)
                  .then(function (hitresult) {
                          if (hitresult) {
                            //									      toastr.success(JSON.stringify(hitresult.object.name));
                            if (hitresult.object !== INTERSECTED) {
                              if (INTERSECTED) {
                                INTERSECTED.material.color.setHex(INTERSECTED.currentColor);
                                INTERSECTED.material.opacity = INTERSECTED.currentOpacity;
                              }
                              INTERSECTED                = hitresult.object;
                              INTERSECTED.currentColor   = INTERSECTED.material.color.getHex();
                              INTERSECTED.currentOpacity = INTERSECTED.material.opacity;

                              INTERSECTED.material.color.setHex(0xffff00);
                              INTERSECTED.material.opacity   = Math.min(INTERSECTED.currentOpacity * 10, 1);
                              INTERSECTED.material.depthTest = false;

                              INTERSECTED.mouseevent = event;
                              //送出一个对象击中事件
                              eventEmitter.emit('scene/objecthit', INTERSECTED);
                              //										      toastr.info(JSON.stringify(INTERSECTED.name));
                            }

                            INTERSECTED = hitresult.object;
                          }
                          else {
                            if (INTERSECTED) {
                              INTERSECTED.material.color.setHex(INTERSECTED.currentColor);
                              INTERSECTED.material.opacity   = INTERSECTED.currentOpacity;
                              INTERSECTED.material.depthTest = (
                                  INTERSECTED.material.opacity === 1
                              );
                              eventEmitter.emit('scene/objectunhit', INTERSECTED);
                            }
                            INTERSECTED = null;
                          }
                        }
                  );
            }
        );

        container.addEventListener(
            'click',
            function (event) {
              event.preventDefault();
              let mouse = new THREE.Vector3();
              mouse.x   = (
                              event.layerX / container.offsetWidth
                          ) * 2 - 1;
              mouse.y   = -(
                  event.layerY / container.offsetHeight
              ) * 2 + 1;
              sceneControl
                  .hitest(mouse, camera)
                  .then(function (hitresult) {
                    if (hitresult) {
                      eventEmitter.emit('scene/objectclick', {
                        id   : hitresult.object.name,
                        point: hitresult.point,
                        mesh : hitresult.object
                      });
                    }
                  });
            }
        );
      },
      initThreeContainer              : async function () {
        let container = document.getElementsByClassName(this.$style.tp_scene_container)[0];
        let scene     = new THREE.Scene();
        let renderer  = new THREE.WebGLRenderer(
            {
              antialias            : true,       //是否开启反锯齿
              precision            : 'highp',    //着色精度选择
              alpha                : true,           //是否可以设置背景色透明
              premultipliedAlpha   : false,
              stencil              : false,
              preserveDrawingBuffer: true, //是否保存绘图缓冲
              maxLights            : 4           //maxLights:最大灯光数
            }
        );

        let labelRenderer                            = new THREE.CSS2DRenderer();
        labelRenderer.domElement.style.position      = 'absolute';
        labelRenderer.domElement.style.top           = '0';
        labelRenderer.domElement.style.pointerEvents = 'none';

        this.lableRnderer             = labelRenderer;
        this.renderer                 = renderer;
        this.scene                    = scene;
        renderer.localClippingEnabled = true;
        renderer.setSize(1704, 753);
        container.append(renderer.domElement);

        labelRenderer.setSize(1704, 753);
        container.append(labelRenderer.domElement);

        this.camera = camera = new THREE.PerspectiveCamera(75, 1704 / 753, 0.1, 100000);
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;

        this.initThreeContainerControlPart();
        //this.initThreeContainerSpecialPart();
        this.initThreeContainerLightPart();
        this.initThreeContainerRenderPart();
        this.initThreeContainerMouseEventPart();
        //=======================额外动作=======================
        //				let helper = new THREE.CameraHelper(camera);
        //				scene.add(helper);
        painter       = PainterClass.getInstance({ scene });
        sceneControl  = SceneClass.getInstance({ scene, camera, renderer, controls: trackballControl });
        cameraControl = CameraClass.getInstance({ camera, control: trackballControl });
        console.log('cameraControl first', cameraControl);
        window['THREE'] = THREE;
      }
    },
    mounted: async function () {
      await this.initThreeContainer();

    }
  };
</script>