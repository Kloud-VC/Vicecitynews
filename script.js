// Vice City News — hero date stamp, GSAP scroll reveals, and the Three.js hero scene.

document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('hero-date');
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).toUpperCase();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- GSAP scroll reveals ----------
  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.dispatch-card', {
      scrollTrigger: { trigger: '.dispatch-grid', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
    });
    gsap.from('.leonida-card', {
      scrollTrigger: { trigger: '.leonida-grid', start: 'top 85%' },
      y: 25, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    });
    gsap.from('.release-item', {
      scrollTrigger: { trigger: '.release-grid', start: 'top 85%' },
      y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
    });
    gsap.from('.about-inner', {
      scrollTrigger: { trigger: '.about', start: 'top 85%' },
      opacity: 0, duration: 0.6, ease: 'power1.out',
    });
  }

  // ---------- Three.js hero scene ----------
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || prefersReducedMotion || !window.THREE) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return; // no WebGL support — canvas just stays empty, background gradient still shows via CSS fallback
  }

  const heroSection = canvas.closest('.hero');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, heroSection.clientWidth / heroSection.clientHeight, 0.1, 1000);
  camera.position.set(0, 6, 22);

  function resize() {
    const w = heroSection.clientWidth;
    const h = heroSection.clientHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Neon wireframe skyline
  const buildingGroup = new THREE.Group();
  const pink = new THREE.Color(0xff2bd6);
  const cyan = new THREE.Color(0x00e5ff);
  const purple = new THREE.Color(0xa24bff);
  const palette = [pink, cyan, purple];

  const count = 26;
  for (let i = 0; i < count; i++) {
    const w = 0.8 + Math.random() * 1.6;
    const h = 2 + Math.random() * 9;
    const d = 0.8 + Math.random() * 1.6;
    const geo = new THREE.BoxGeometry(w, h, d);
    const edges = new THREE.EdgesGeometry(geo);
    const color = palette[i % palette.length];
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 });
    const mesh = new THREE.LineSegments(edges, mat);

    const angle = (i / count) * Math.PI * 2;
    const radius = 10 + Math.random() * 9;
    mesh.position.set(
      Math.cos(angle) * radius,
      h / 2 - 4,
      Math.sin(angle) * radius - 6
    );
    buildingGroup.add(mesh);
  }
  scene.add(buildingGroup);

  // Floor grid
  const grid = new THREE.GridHelper(60, 30, 0xff2bd6, 0x2a0a3f);
  grid.position.y = -4;
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  scene.add(grid);

  // Floating particles (neon dust / rain)
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = Math.random() * 20 - 4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.06, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Mouse parallax
  let targetX = 0, targetY = 0;
  window.addEventListener('pointermove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = x * 2.5;
    targetY = y * 1.2;
  });

  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    buildingGroup.rotation.y += 0.0009;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (6 - targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 1, -6);

    const pos = particles.geometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      pos.array[i * 3 + 1] -= 0.03;
      if (pos.array[i * 3 + 1] < -4) pos.array[i * 3 + 1] = 16;
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // Pause rendering when hero scrolls out of view — saves battery/CPU on long scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!raf) animate();
        } else {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    }, { threshold: 0 });
    io.observe(heroSection);
  }
});
