/**
 * RACIFY - Core JavaScript Module
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize Hero 3D Tilt Effect
  initHeroTilt();

  // 3. Initialize Mobile Navigation Toggle
  initMobileNav();

  // 4. Initialize Live Telemetry Simulator
  initTelemetrySimulator();

  // 5. Initialize Leaderboard Table & Switcher
  initLeaderboard();
});

/* ==========================================================
   1. HERO SECTION INTERACTIONS
   ========================================================== */
function initHeroTilt() {
  const stage = document.getElementById('hero-stage');
  const carWrapper = document.getElementById('car-wrapper');

  if (!stage || !carWrapper || window.innerWidth < 768) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 7;

    carWrapper.style.transform = `perspective(1100px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1.02)`;
  });

  stage.addEventListener('mouseleave', () => {
    carWrapper.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}

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

/* ==========================================================
   2. LEADERBOARD DATA (WITH CUSTOM LOGO SUPPORT)
   ========================================================== */
const racingLeaderboards = {
  f1: {
    events: ['BHR', 'SAU', 'AUS', 'JPN', 'CHN', 'MIA', 'EMI', 'MON', 'CAN', 'ESP'],
    teams: [
      { 
        name: 'McLaren F1 Team', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png.transform/2col/image.png',
        color: '#ff8000', 
        pts: 428, 
        scores: ['25', '18', '25', '15', '25', '18', '25', '12', '18', '25'] 
      },
      { 
        name: 'Ferrari Scuderia', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png',
        color: '#e80020', 
        pts: 405, 
        scores: ['18', '25', '15', '18', '18', '25', '15', '25', '15', '18'] 
      },
      { 
        name: 'Red Bull Racing', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col/image.png',
        color: '#3671c6', 
        pts: 382, 
        scores: ['15', '15', '18', '25', '12', '15', '18', '18', '25', '15'] 
      },
      { 
        name: 'Mercedes-AMG F1', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png.transform/2col/image.png',
        color: '#27f4d2', 
        pts: 290, 
        scores: ['12', '12', '10', '10', '15', '12', '12', '15', '12', '12'] 
      },
      { 
        name: 'Aston Martin F1', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png.transform/2col/image.png',
        color: '#229971', 
        pts: 114, 
        scores: ['8', '10', '8', '6', '10', '8', '6', '8', '10', '6'] 
      },
      { 
        name: 'Alpine Racing', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png.transform/2col/image.png',
        color: '#0093cc', 
        pts: 65, 
        scores: ['4', '6', '2', '4', '6', '2', '4', '6', '2', '4'] 
      },
      { 
        name: 'Haas F1 Team', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png.transform/2col/image.png',
        color: '#b6babd', 
        pts: 42, 
        scores: ['2', '1', '4', '2', '1', '4', '2', '1', '4', '2'] 
      },
      { 
        name: 'Williams Racing', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png.transform/2col/image.png',
        color: '#64c4ff', 
        pts: 28, 
        scores: ['1', '0', '1', '1', '0', '1', '1', '0', '1', '1'] 
      }
    ]
  },
  wec: {
    events: ['QAT', 'IMO', 'SPA', 'LMN', 'SAO', 'COA', 'FUJ', 'BHR', 'MNZ', 'SIL'],
    teams: [
      { 
        name: 'Porsche Penske Motorsport', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Porsche_logo.svg/300px-Porsche_logo.svg.png',
        color: '#d5001c', 
        pts: 185, 
        scores: ['25', '18', '25', '38', '18', '25', '15', '18', '25', '18'] 
      },
      { 
        name: 'Toyota Gazoo Racing', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/300px-Toyota.svg.png',
        color: '#ffffff', 
        pts: 172, 
        scores: ['18', '25', '18', '30', '25', '18', '25', '15', '18', '15'] 
      },
      { 
        name: 'Ferrari AF Corse', 
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png',
        color: '#c00000', 
        pts: 160, 
        scores: ['15', '15', '15', '50', '15', '15', '18', '25', '12', '12'] 
      },
      { 
        name: 'Cadillac Racing', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cadillac_Crest_2014.svg/300px-Cadillac_Crest_2014.svg.png',
        color: '#ffc72c', 
        pts: 94, 
        scores: ['12', '10', '12', '18', '10', '12', '10', '10', '8', '10'] 
      },
      { 
        name: 'Peugeot TotalEnergies', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Peugeot_2021_Logo.svg/240px-Peugeot_2021_Logo.svg.png',
        color: '#0bf207', 
        pts: 52, 
        scores: ['6', '6', '6', 'DNF', '6', '6', '8', '6', '4', '4'] 
      }
    ]
  },
  gt3: {
    events: ['BAT', 'LEC', 'MNZ', 'SPA', 'NUR', 'VAL', 'MIS', 'HOC', 'BAR', 'KYA'],
    teams: [
      { 
        name: 'Team WRT (BMW)', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/300px-BMW.svg.png',
        color: '#0066b1', 
        pts: 210, 
        scores: ['25', '25', '18', '25', '18', '25', '15', '18', '25', '16'] 
      },
      { 
        name: 'Manthey EMA (Porsche)', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Porsche_logo.svg/300px-Porsche_logo.svg.png',
        color: '#0bf207', 
        pts: 195, 
        scores: ['18', '18', '25', '18', '25', '18', '25', '25', '18', '5'] 
      },
      { 
        name: 'Iron Lynx (Lamborghini)', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Lamborghini_Logo.svg/300px-Lamborghini_Logo.svg.png',
        color: '#ffff00', 
        pts: 164, 
        scores: ['15', '15', '15', '15', '15', '15', '18', '15', '15', '25'] 
      },
      { 
        name: 'Winward Racing (AMG)', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/300px-Mercedes-Logo.svg.png',
        color: '#00a3e0', 
        pts: 140, 
        scores: ['12', '12', '12', '12', '12', '12', '10', '12', '12', '18'] 
      }
    ]
  },
  wrc: {
    events: ['MON', 'SWE', 'KEN', 'CRO', 'POR', 'ITA', 'POL', 'LAT', 'FIN', 'GRE'],
    teams: [
      { 
        name: 'Toyota Gazoo WRT', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/300px-Toyota.svg.png',
        color: '#e60012', 
        pts: 380, 
        scores: ['25', '25', '18', '25', '25', '18', '25', '18', '25', '25'] 
      },
      { 
        name: 'Hyundai Motorsport', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/320px-Hyundai_Motor_Company_logo.svg.png',
        color: '#002c6c', 
        pts: 362, 
        scores: ['18', '18', '25', '18', '18', '25', '18', '25', '18', '18'] 
      },
      { 
        name: 'M-Sport Ford WRT', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_motor_company_flat_logo.svg/320px-Ford_motor_company_flat_logo.svg.png',
        color: '#134094', 
        pts: 195, 
        scores: ['15', '15', '15', '15', '15', '15', '12', '15', '12', '15'] 
      }
    ]
  }
};

/* ==========================================================
   3. LEADERBOARD INITIALIZATION & TABLE RENDERING
   ========================================================== */
function initLeaderboard() {
  const buttons = document.querySelectorAll('.series-btn');
  if (!buttons.length) return;

  // Render F1 by default on load
  renderLeaderboardTable('f1');

  // Attach click listener to each series button
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const seriesKey = btn.getAttribute('data-series');
      renderLeaderboardTable(seriesKey);
    });
  });
}

function renderLeaderboardTable(seriesKey) {
  const headRow = document.getElementById('table-head-row');
  const tableBody = document.getElementById('table-body');
  const data = racingLeaderboards[seriesKey];

  if (!headRow || !tableBody || !data) return;

  // 1. Build Table Headers: Pos, Constructor Team, 10 Events, Total PTS
  let headHTML = `
    <th class="pos-cell">Pos</th>
    <th>Constructor Team</th>
  `;

  data.events.forEach((eventCode, index) => {
    headHTML += `<th class="col-event">R${index + 1}<br><span class="text-muted" style="font-size:0.65rem;">${eventCode}</span></th>`;
  });

  headHTML += `<th class="col-pts">Total PTS</th>`;
  headRow.innerHTML = headHTML;

  // 2. Sort Teams from Highest to Lowest Points
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
            
            <span class="team-logo-frame">
              <img src="${team.logo}" alt="${team.name} Logo" class="team-logo-img" onerror="this.style.display='none'" />
            </span>

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

  // Re-initialize Lucide icons in case any were rendered
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}