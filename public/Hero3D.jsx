import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0x554422, 1.4);
    scene.add(ambient);
    const key = new THREE.PointLight(0xf5c563, 3.2, 30);
    key.position.set(4, 4, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xffe3a3, 1.6, 30);
    rim.position.set(-5, -3, -4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    // Core icosahedron - faceted gold gem
    const coreGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd9a441,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true,
      emissive: 0x2a1a06,
      emissiveIntensity: 0.4
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Wireframe outer shell
    const wireGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xf5c563, wireframe: true, transparent: true, opacity: 0.35 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);

    // Orbiting rings (torus)
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xf0b429, metalness: 0.9, roughness: 0.3, emissive: 0x3a2408, emissiveIntensity: 0.3 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.03, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    scene.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.02, 16, 100), ringMat);
    ring2.rotation.x = Math.PI / 3.2;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    // Small orbiting particles
    const particles = [];
    const particleGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const particleMat = new THREE.MeshStandardMaterial({ color: 0xffe3a3, emissive: 0xffcf5c, emissiveIntensity: 1.2, metalness: 0.6, roughness: 0.2 });
    for (let i = 0; i < 8; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      const angle = (i / 8) * Math.PI * 2;
      p.userData = { angle, radius: 3.6 + (i % 3) * 0.3, speed: 0.006 + (i % 4) * 0.002, tilt: (i % 2 ? 1 : -1) * 0.5 };
      scene.add(p);
      particles.push(p);
    }

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      core.rotation.x = t * 0.25;
      core.rotation.y = t * 0.35;
      wire.rotation.x = -t * 0.15;
      wire.rotation.y = t * 0.2;
      ring1.rotation.z = t * 0.2;
      ring2.rotation.z = -t * 0.15;
      particles.forEach(p => {
        const { angle, radius, speed, tilt } = p.userData;
        const a = angle + t * speed * 60;
        p.position.set(Math.cos(a) * radius, Math.sin(a * 0.7) * tilt, Math.sin(a) * radius);
      });
      group.rotation.y = Math.sin(t * 0.15) * 0.15;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      coreGeo.dispose(); coreMat.dispose();
      wireGeo.dispose(); wireMat.dispose();
      ringMat.dispose();
      particleGeo.dispose(); particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero3d-canvas" aria-hidden="true" />;
}
