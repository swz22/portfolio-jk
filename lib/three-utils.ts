import * as THREE from 'three';

export function createGradientTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (!context) return null;

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );

  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.2, '#aaaaaa');
  gradient.addColorStop(0.4, '#555555');
  gradient.addColorStop(1, '#000000');

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

export function getDevicePerformance() {
  const gpu = (navigator as any).gpu;
  const memory = (performance as any).memory;

  if (memory && memory.jsHeapSizeLimit < 1073741824) {
    return 'low';
  }

  if (gpu) {
    return 'high';
  }

  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (renderer.toLowerCase().includes('intel')) {
        return 'medium';
      }
    }
  }

  return 'medium';
}
