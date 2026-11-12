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

  //5. Initialize Leaderboard Component
initLeaderboard();
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

/**
 * RACING LEADERBOARD DATA & CONTROLLER
 * Supports multiple racing series with 10 event columns each.
 */
const racingLeaderboards = {
  f1: {
    events: ['BHR', 'SAU', 'AUS', 'JPN', 'CHN', 'MIA', 'EMI', 'MON', 'CAN', 'ESP'],
    teams: [
      { name: 'McLaren F1 Team', color: '#ff8000', pts: 428, scores: ['25', '18', '25', '15', '25', '18', '25', '12', '18', '25'] },
      { name: 'Ferrari Scuderia', color: '#e80020', pts: 405, scores: ['18', '25', '15', '18', '18', '25', '15', '25', '15', '18'] },
      { name: 'Red Bull Racing', color: '#3671c6', pts: 382, scores: ['15', '15', '18', '25', '12', '15', '18', '18', '25', '15'] },
      { name: 'Mercedes-AMG F1', color: '#27f4d2', pts: 290, scores: ['12', '12', '10', '10', '15', '12', '12', '15', '12', '12'] },
      { name: 'Aston Martin F1', color: '#229971', pts: 114, scores: ['8', '10', '8', '6', '10', '8', '6', '8', '10', '6'] },
      { name: 'Alpine Racing', color: '#0093cc', pts: 65, scores: ['4', '6', '2', '4', '6', '2', '4', '6', '2', '4'] },
      { name: 'Haas F1 Team', color: '#b6babd', pts: 42, scores: ['2', '1', '4', '2', '1', '4', '2', '1', '4', '2'] },
      { name: 'Williams Racing', color: '#64c4ff', pts: 28, scores: ['1', '0', '1', '1', '0', '1', '1', '0', '1', '1'] }
    ]
  },
  wec: {
    events: ['QAT', 'IMO', 'SPA', 'LMN', 'SAO', 'COA', 'FUJ', 'BHR', 'MNZ', 'SIL'],
    teams: [
      { name: 'Porsche Penske Motorsport', color: '#d5001c', pts: 185, scores: ['25', '18', '25', '38', '18', '25', '15', '18', '25', '18'] },
      { name: 'Toyota Gazoo Racing', color: '#ffffff', pts: 172, scores: ['18', '25', '18', '30', '25', '18', '25', '15', '18', '15'] },
      { name: 'Ferrari AF Corse', color: '#c00000', pts: 160, scores: ['15', '15', '15', '50', '15', '15', '18', '25', '12', '12'] },
      { name: 'Cadillac Racing', color: '#ffc72c', pts: 94, scores: ['12', '10', '12', '18', '10', '12', '10', '10', '8', '10'] },
      { name: 'Alpine Endurance Team', color: '#0055a5', pts: 68, scores: ['8', '8', '10', '12', '8', '8', '6', '8', '6', '6'] },
      { name: 'Peugeot TotalEnergies', color: '#0bf207', pts: 52, scores: ['6', '6', '6', 'DNF', '6', '6', '8', '6', '4', '4'] }
    ]
  },
  gt3: {
    events: ['BAT', 'LEC', 'MNZ', 'SPA', 'NUR', 'VAL', 'MIS', 'HOC', 'BAR', 'KYA'],
    teams: [
      { name: 'Team WRT (BMW M4)', color: '#0066b1', pts: 210, scores: ['25', '25', '18', '25', '18', '25', '15', '18', '25', '16'] },
      { name: 'Manthey EMA (Porsche)', color: '#0bf207', pts: 195, scores: ['18', '18', '25', '18', '25', '18', '25', '25', '18', '5'] },
      { name: 'Iron Lynx (Lamborghini)', color: '#ffff00', pts: 164, scores: ['15', '15', '15', '15', '15', '15', '18', '15', '15', '25'] },
      { name: 'Winward Racing (AMG)', color: '#00a3e0', pts: 140, scores: ['12', '12', '12', '12', '12', '12', '10', '12', '12', '18'] },
      { name: 'Walkenhorst Motorsport', color: '#002f6c', pts: 89, scores: ['10', '8', '10', '8', '8', '10', '8', '8', '10', '9'] }
    ]
  },
  wrc: {
    events: ['MON', 'SWE', 'KEN', 'CRO', 'POR', 'ITA', 'POL', 'LAT', 'FIN', 'GRE'],
    teams: [
      { name: 'Toyota Gazoo WRT', color: '#e60012', pts: 380, scores: ['25', '25', '18', '25', '25', '18', '25', '18', '25', '25'] },
      { name: 'Hyundai Motorsport', color: '#002c6c', pts: 362, scores: ['18', '18', '25', '18', '18', '25', '18', '25', '18', '18'] },
      { name: 'M-Sport Ford WRT', color: '#134094', pts: 195, scores: ['15', '15', '15', '15', '15', '15', '12', '15', '12', '15'] }
    ]
  }
};

/**
 * Initializes Leaderboard Buttons and first render
 */
function initLeaderboard() {
  const buttons = document.querySelectorAll('.series-btn');
  if (!buttons.length) return;

  // Render initial F1 leaderboard
  renderLeaderboardTable('f1');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const seriesKey = btn.getAttribute('data-series');
      renderLeaderboardTable(seriesKey);
    });
  });
}

/**
 * Builds table headers and body dynamically
 */
function renderLeaderboardTable(seriesKey) {
  const headRow = document.getElementById('table-head-row');
  const tableBody = document.getElementById('table-body');
  const data = racingLeaderboards[seriesKey];

  if (!headRow || !tableBody || !data) return;

  // 1. Build Table Headers (POS, TEAM, 10 EVENTS, PTS)
  let headHTML = `
    <th class="pos-cell">Pos</th>
    <th>Constructor Team</th>
  `;

  data.events.forEach((eventCode, index) => {
    headHTML += `<th class="col-event">R${index + 1}<br><span class="text-muted" style="font-size:0.65rem;">${eventCode}</span></th>`;
  });

  headHTML += `<th class="col-pts">Total PTS</th>`;
  headRow.innerHTML = headHTML;

  // 2. Sort Teams from highest points to lowest points
  const sortedTeams = [...data.teams].sort((a, b) => b.pts - a.pts);

  // 3. Build Table Rows
  let bodyHTML = '';
  sortedTeams.forEach((team, index) => {
    const pos = index + 1;
    let posClass = '';
    if (pos === 1) posClass = 'pos-p1';
    else if (pos === 2) posClass = 'pos-p2';
    else if (pos === 3) posClass = 'pos-p3';

    bodyHTML += `
      <tr>
        <td class="pos-cell ${posClass}">${pos}</td>
        <td>
          <div class="team-cell">
            <span class="team-color-indicator" style="background-color: ${team.color}; box-shadow: 0 0 8px ${team.color};"></span>
            <span>${team.name}</span>
          </div>
        </td>
    `;

    // 10 Event score columns
    team.scores.forEach((score) => {
      let badgeClass = 'score-badge';
      if (score === '25' || score === '50' || score === '38') badgeClass += ' win';
      if (score === 'DNF') badgeClass += ' dnf';

      bodyHTML += `
        <td class="col-event">
          <span class="${badgeClass}">${score}</span>
        </td>
      `;
    });

    // Total points column
    bodyHTML += `
        <td class="col-pts">${team.pts}</td>
      </tr>
    `;
  });

  tableBody.innerHTML = bodyHTML;

  // Refresh Lucide icons if any exist in the dynamic table
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* =========================================================
   FUTURE FEATURES & HOOKS
   You can append new functions below (e.g., initEventsFilter(),
   initWorldMap(), initNewsLoader()) without conflicts.
   ========================================================= */