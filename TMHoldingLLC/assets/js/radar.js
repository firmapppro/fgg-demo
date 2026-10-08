/**
 * TM HOLDING LLC — Global Asset Telemetry & Radar Canvas
 * Renders atmospheric flight and maritime corridors between global hubs
 */

(function () {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animFrameId;

  // Key Strategic Hubs (Normalized Coordinates roughly mapped to world projection)
  const hubs = [
    { name: 'DOHA (HQ)', x: 0.62, y: 0.46, isHQ: true },
    { name: 'DUBAI', x: 0.64, y: 0.45 },
    { name: 'LONDON', x: 0.48, y: 0.30 },
    { name: 'NICE/MONACO', x: 0.51, y: 0.35 },
    { name: 'GENEVA', x: 0.50, y: 0.33 },
    { name: 'SINGAPORE', x: 0.78, y: 0.58 },
    { name: 'NEW YORK', x: 0.28, y: 0.35 }
  ];

  // Corridors connecting Doha HQ to world centers
  const routes = [
    { from: 0, to: 1, type: 'air', progress: 0.15, speed: 0.0025 },
    { from: 0, to: 2, type: 'air', progress: 0.42, speed: 0.0012 },
    { from: 0, to: 3, type: 'marine', progress: 0.70, speed: 0.0009 },
    { from: 0, to: 4, type: 'air', progress: 0.33, speed: 0.0014 },
    { from: 0, to: 5, type: 'air', progress: 0.85, speed: 0.0011 },
    { from: 2, to: 6, type: 'air', progress: 0.60, speed: 0.0008 },
    { from: 3, to: 1, type: 'marine', progress: 0.20, speed: 0.0007 }
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function drawBezier(p1, p2, bend) {
    const cx = (p1.x + p2.x) / 2;
    const cy = (p1.y + p2.y) / 2 - bend;
    ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
  }

  function getBezierPoint(p1, p2, bend, t) {
    const cx = (p1.x + p2.x) / 2;
    const cy = (p1.y + p2.y) / 2 - bend;
    const inv = 1 - t;
    const x = inv * inv * p1.x + 2 * inv * t * cx + t * t * p2.x;
    const y = inv * inv * p1.y + 2 * inv * t * cy + t * t * p2.y;
    return { x, y };
  }

  let time = 0;

  function render() {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    // Compute pixel positions for hubs
    const hubPts = hubs.map(h => ({
      x: h.x * width,
      y: h.y * height,
      isHQ: h.isHQ,
      name: h.name
    }));

    // Draw connecting routes
    routes.forEach((route, idx) => {
      const p1 = hubPts[route.from];
      const p2 = hubPts[route.to];
      const bend = Math.sin((route.from + route.to) * 1.5) * (height * 0.08);

      // Draw faint trajectory arc
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      drawBezier(p1, p2, bend);
      ctx.strokeStyle = route.type === 'air' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(100, 160, 240, 0.1)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update moving asset telemetry pulse
      route.progress = (route.progress + route.speed) % 1;
      const pulsePt = getBezierPoint(p1, p2, bend, route.progress);

      // Draw moving asset dot
      ctx.beginPath();
      ctx.arc(pulsePt.x, pulsePt.y, route.type === 'air' ? 2.5 : 2, 0, Math.PI * 2);
      ctx.fillStyle = route.type === 'air' ? '#F7E7C4' : '#88C0D0';
      ctx.shadowColor = route.type === 'air' ? 'rgba(212, 175, 55, 0.8)' : 'rgba(100, 180, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw hubs & pulses
    hubPts.forEach((hub, idx) => {
      const isHQ = hub.isHQ;
      const radius = isHQ ? 4 : 2.5;

      // Pulse ring for HQ
      if (isHQ) {
        const pulseR = 4 + (Math.sin(time) + 1) * 8;
        const pulseAlpha = 0.5 - (pulseR / 20) * 0.4;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0, pulseAlpha)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Hub dot
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isHQ ? '#D4AF37' : 'rgba(255, 255, 255, 0.6)';
      ctx.shadowColor = isHQ ? 'rgba(212, 175, 55, 0.9)' : 'rgba(255, 255, 255, 0.3)';
      ctx.shadowBlur = isHQ ? 10 : 4;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Small hub label
      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isHQ ? 'rgba(229, 197, 131, 0.75)' : 'rgba(163, 179, 200, 0.4)';
      ctx.letterSpacing = '1px';
      ctx.fillText(hub.name, hub.x + 8, hub.y + 3);
    });

    animFrameId = requestAnimationFrame(render);
  }

  render();
})();
