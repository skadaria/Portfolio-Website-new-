'use client';
import './index.css';
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = '/assets/kartu.glb';
const CARD_FACE_PATH = '/assets/sk.png';

useGLTF.preload(GLTF_PATH);
useTexture.preload(CARD_FACE_PATH);

function createStrapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 64px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Srijal', canvas.width / 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export default function App({ cardReveal, visible = true }) {
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="responsive-wrapper"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <Canvas
        frameloop="demand"
        gl={{ alpha: true, powerPreference: 'low-power' }}
        dpr={isMobile ? 1 : [1, 2]}
        camera={{ position: [0, 0, 13], fov: 25 }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <ambientLight intensity={isMobile ? Math.PI * 1.6 : Math.PI} />
        {!isMobile && <hemisphereLight args={[0xffffff, 0x444444, 0.6]} />}

        <Scene key={isMobile ? 'mobile' : 'desktop'} isMobile={isMobile} cardReveal={cardReveal} />

        {!isMobile && (
        <Environment blur={0.75}>
          <Lightformer
            intensity={1.2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={1.8}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={1.8}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={6}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
        )}
      </Canvas>
    </div>
  );
}

function Scene({ isMobile, cardReveal }) {
  return (
    <Physics
      interpolate={!isMobile}
      gravity={isMobile ? [0, -25, 0] : [0, -40, 0]}
      timeStep={isMobile ? 1 / 30 : 1 / 60}
    >
      <Band isMobile={isMobile} cardReveal={cardReveal} />
    </Physics>
  );
}

function Band({ isMobile, maxSpeed = 50, minSpeed = 10, cardReveal }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const cardGroupRef = useRef();
  const isDraggingRef = useRef(false);
  const swingEndRef = useRef(0);
  const dragActiveRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const settlingRef = useRef(false);
  const DRAG_THRESHOLD = 10;

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const attachOffset = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: isMobile ? 1 : 1.5,
    linearDamping: 2.5,
  };

  const { nodes, materials } = useGLTF(GLTF_PATH);
  const cardFace = useTexture(CARD_FACE_PATH);
  cardFace.flipY = false;
  cardFace.repeat.set(2.008, 1.3);
  cardFace.offset.set(-0.0016, 0);
  cardFace.wrapS = cardFace.wrapT = THREE.ClampToEdgeWrapping;
  const cardFaceBack = cardFace.clone();
  cardFaceBack.repeat.set(1.0024, 1.3245);
  cardFaceBack.offset.set(-0.0024, -0.0029);
  const { camera, invalidate } = useThree();
  const { width, height } = useThree((state) => state.size);

  const [strapTexture] = useState(() => createStrapTexture());

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const frameCount = useRef(0);
  const [dragged, drag] = useState(false);
  const canDrag = true;
  const [hooked, setHooked] = useState(false);
  const hookedRef = useRef(false);
  const hookTargetRef = useRef({ x: 4, y: 1, z: 0 });

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  const setCursor = (type) => {
    document.body.style.cursor = type;
  };

  useEffect(() => {
    const onTouchStart = (e) => {
      if (isDraggingRef.current) {
        e.preventDefault();
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    return () => window.removeEventListener('touchstart', onTouchStart);
  }, []);

  useEffect(() => {
    if (cardReveal) {
      swingEndRef.current = performance.now() + (isMobile ? 600 : 12000);
      invalidate();
    }
  }, [cardReveal]);

  useEffect(() => {
    const reset = () => {
      if (hookedRef.current) {
        hookedRef.current = false;
        setHooked(false);
        invalidate();
        return;
      }
      drag(false);
      isDraggingRef.current = false;
      dragActiveRef.current = false;
      swingEndRef.current = performance.now() + (isMobile ? 1000 : 2000);
      setCursor('auto');

      settlingRef.current = true;

      [fixed, j1, j2, j3, card].forEach((ref) => {
        if (ref.current) {
          ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          ref.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      });

      frameCount.current = 0;

      [j1, j2, j3].forEach((ref) => {
        if (ref.current?.lerped) {
          ref.current.lerped.copy(ref.current.translation());
        }
      });

      if (card.current) {
        const pos = card.current.translation();
        card.current.setTranslation({ x: pos.x + (isMobile ? 1 : 2), y: pos.y, z: pos.z }, true);
        card.current.setLinvel({ x: isMobile ? -2 : -3, y: isMobile ? 1 : 2, z: 0 }, true);
      }

      requestAnimationFrame(() => {
        settlingRef.current = false;
        invalidate();
      });
    };

    window.addEventListener('band-reset', reset);
    return () => window.removeEventListener('band-reset', reset);
  }, [isMobile]);

  useEffect(() => {
    const hook = () => {
      if (!card.current) return;
      const targetX = isMobile ? 4 : 7;
      const targetY = isMobile ? 1 : 1.5;
      const target = { x: targetX, y: targetY, z: 0 };
      hookTargetRef.current = target;
      hookedRef.current = true;
      setHooked(true);
      swingEndRef.current = 0;
      [card, j1, j2, j3].forEach((ref) => {
        if (ref.current) {
          ref.current.wakeUp();
          ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          ref.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      });
      j3.current?.setTranslation({ x: target.x, y: target.y - 0.6, z: 0 }, true);
      j2.current?.setTranslation({ x: target.x, y: target.y - 1.2, z: 0 }, true);
      j1.current?.setTranslation({ x: target.x, y: target.y - 2, z: 0 }, true);
      [j1, j2, j3].forEach((ref) => {
        if (ref.current?.lerped) {
          ref.current.lerped.copy(ref.current.translation());
        }
      });
      frameCount.current = 0;
      invalidate();
    };
    window.addEventListener('band-hook', hook);
    return () => window.removeEventListener('band-hook', hook);
  }, [isMobile]);

  useFrame((state, delta) => {
    if (isMobile) {
      frameCount.current++
    }

    if (dragged || swingEndRef.current > performance.now()) {
      invalidate();
    }

    if (hookedRef.current && card.current) {
      const target = hookTargetRef.current;
      card.current.setNextKinematicTranslation({ x: target.x, y: target.y, z: target.z });
    }

    if (!settlingRef.current && dragged && card.current && canDrag) {
      if (!dragActiveRef.current) {
        const dx = state.pointer.x * (window.innerWidth / 2) - dragStartRef.current.x;
        const dy = -state.pointer.y * (window.innerHeight / 2) - dragStartRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
        dragActiveRef.current = true;
      }
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());

      const newX = vec.x - dragged.x;
      let newY = vec.y - dragged.y;
      const newZ = vec.z - dragged.z;

      const screenY = state.pointer.y;
      const limit = isMobile ? -0.1 : -0.2;

      if (screenY < limit) newY = card.current.translation().y;

      card.current.setNextKinematicTranslation({ x: newX, y: newY, z: newZ });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2, j3].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }

        const d = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );

        ref.current.lerped.lerp(
          ref.current.translation(),
          Math.min(delta, 0.05) * (minSpeed + d * (maxSpeed - minSpeed))
        );
      });

      const cr = card.current.rotation();
      q.set(cr.x, cr.y, cr.z, cr.w);
      attachOffset.set(0, 1.45, 0).applyQuaternion(q);
      curve.points[0].copy(card.current.translation()).add(attachOffset);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current?.geometry) {
        if (!isMobile || frameCount.current % 3 === 0) {
          band.current.geometry.setPoints(curve.getPoints(isMobile ? 8 : 32));
        }
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={isMobile ? [0.5, 5, 0] : [2.7, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -0.3, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0, -0.8, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0, -1.5, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>

        <RigidBody
          position={[1.5, -2.95, 0]}
          ref={card}
          {...segmentProps}
          type={dragged || hooked ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            ref={cardGroupRef}
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => { if (canDrag) setCursor('grab'); }}
            onPointerOut={() => { setCursor('auto'); }}
            onPointerUp={(e) => {
              if (!canDrag) return;
              isDraggingRef.current = false;
              swingEndRef.current = performance.now() + (dragActiveRef.current ? (isMobile ? 300 : 2000) : 0);
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              setCursor('auto');
              invalidate();
            }}
            onPointerDown={(e) => {
              if (!canDrag) return;
              swingEndRef.current = 0;
              isDraggingRef.current = true;
              dragActiveRef.current = false;
              dragStartRef.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
              e.nativeEvent.preventDefault();
              e.target.setPointerCapture(e.pointerId);
              setCursor('grabbing');
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
              invalidate();
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial {...materials.base} map={cardFace} side={THREE.FrontSide} />
            </mesh>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial {...materials.base} map={cardFaceBack} side={THREE.BackSide} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={0.9}
          color="white"
          resolution={[width, height]}
          useMap
          map={strapTexture}
          repeat={[-4, 1]}
          lineWidth={isMobile ? 0.5 : 1}
        />
      </mesh>
    </>
  );
}