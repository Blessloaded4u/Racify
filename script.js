/**
 * RACIFY - Core JavaScript Module
 * Built modularly so additional sections can be registered seamlessly.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize Hero Interactive 3D Tilt
  initHeroTilt();

  // 3. Initialize Mobile Navigation Toggle
  initMobileNav();

  // 4. Initialize Telemetry Live Simulation
  initTelemetrySimulator();
});

/**
 * 3D Parallax & Tilt Effect
 * Tilts the car and smooths it on mouse movement over the hero stage
 */
function initHeroTilt() {
  const stage = document.getElementById('hero-stage');
  const carWrapper = document.getElementById('car-wrapper');

  // Only run 3D perspective calculations on desktop devices
  if (!stage || !carWrapper || window.innerWidth < 768) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6; // Rotation on X axis
    const tiltY = (x / (rect.width / 2)) * 7;   // Rotation on Y axis

    carWrapper.style.transform = `perspective(1100px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1.02)`;
  });

  stage.addEventListener('mouseleave', () => {
    carWrapper.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

/**
 * Mobile Navigation Menu Toggler
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}

/**
 * Real-time Telemetry Simulator
 * Slightly fluctuates the velocity to demonstrate live website behavior
 */
function initTelemetrySimulator() {
  const speedElement = document.querySelector('.footer-highlight');
  if (!speedElement) return;

  let baseSpeed = 318.4;
  setInterval(() => {
    const delta = (Math.random() * 1.8 - 0.9).toFixed(1);
    const newSpeed = (baseSpeed + parseFloat(delta)).toFixed(1);
    speedElement.innerText = `${newSpeed} KM/H`;
  }, 2200);
}

/* =========================================================
   FUTURE FEATURES & HOOKS
   You can append new functions below (e.g., initEventsFilter(),
   initWorldMap(), initNewsLoader()) without conflicts.
   ========================================================= */