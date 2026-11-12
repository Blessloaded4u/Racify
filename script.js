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

  // 6. Initialize Events Section Module
initEventsSection();
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

/* ==========================================================
   4. EVENTS SECTION CONTROLLER & 40+ RACING CATALOG
   ========================================================== */

// 10 Events for each series (F1, WEC, GT3, WRC)
// The first item of each series is flagged as isLive: true
const allEventsCatalog = [
  // --- FORMULA 1 ---
  {
    id: 'f1-live',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: true,
    name: 'Monza Grand Prix',
    circuit: 'Autodromo Nazionale Monza • Italy',
    image: 'Assets/Events/event1.jfif',
    date: 'LIVE NOW',
    length: '53 Laps (306.72 KM)',
    currentLeader: 'L. Norris (McLaren)',
    timeRemaining: '18 LAPS REMAINING',
    fastestLap: '1:21.432 (M. Verstappen)',
    podium: ['1. L. Norris', '2. C. Leclerc', '3. O. Piastri'],
    technical: 'Downforce: Low • Top Speed: 352 KM/H'
  },
  {
    id: 'f1-2',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Singapore Grand Prix',
    circuit: 'Marina Bay Street Circuit',
    image: 'Assets/Events/event2.jfif',
    date: 'Sep 20 - 22',
    length: '62 Laps (306.14 KM)',
    countdown: '6 DAYS REMAINING',
    fastestLap: '1:35.867 (K. Magnussen)',
    technical: '61 Laps Under Lights • High Humidity'
  },
  {
    id: 'f1-3',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'United States Grand Prix',
    circuit: 'Circuit of the Americas • Austin',
    image: 'Assets/Events/event3.jfif',
    date: 'Oct 18 - 20',
    length: '56 Laps (308.40 KM)',
    countdown: '21 DAYS REMAINING',
    technical: 'Turn 1 Elevation Delta: 41 Meters'
  },
  {
    id: 'f1-4',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Mexico City Grand Prix',
    circuit: 'Autódromo Hermanos Rodríguez',
    image: 'Assets/Events/event4.jfif',
    date: 'Oct 25 - 27',
    length: '71 Laps (305.35 KM)',
    countdown: '28 DAYS REMAINING',
    technical: 'High Altitude: 2,285m Above Sea Level'
  },
  {
    id: 'f1-5',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'São Paulo Grand Prix',
    circuit: 'Autódromo de Interlagos • Brazil',
    image: 'Assets/Events/event5.jfif',
    date: 'Nov 01 - 03',
    length: '71 Laps (305.90 KM)',
    countdown: '35 DAYS REMAINING',
    technical: 'Anti-Clockwise Classic Circuit'
  },
  {
    id: 'f1-6',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Las Vegas Grand Prix',
    circuit: 'Las Vegas Strip Circuit • USA',
    image: 'Assets/Events/event2.jfif',
    date: 'Nov 21 - 23',
    length: '50 Laps (309.95 KM)',
    countdown: '55 DAYS REMAINING',
    technical: 'Top Speed Sector on Strip: 345+ KM/H'
  },
  {
    id: 'f1-7',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Qatar Grand Prix',
    circuit: 'Lusail International Circuit',
    image: 'Assets/Events/event1.jfif',
    date: 'Nov 29 - Dec 01',
    length: '57 Laps (308.61 KM)',
    countdown: '63 DAYS REMAINING',
    technical: 'Medium-High Downforce Flowing Layout'
  },
  {
    id: 'f1-8',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Abu Dhabi Grand Prix',
    circuit: 'Yas Marina Circuit • UAE',
    image: 'Assets/Events/event3.jfif',
    date: 'Dec 06 - 08',
    length: '58 Laps (306.18 KM)',
    countdown: '70 DAYS REMAINING',
    technical: 'Season Finale Twilight Transition'
  },
  {
    id: 'f1-9',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Bahrain Grand Prix 2027',
    circuit: 'Bahrain International Circuit',
    image: 'Assets/Events/event1.jfif',
    date: 'Feb 28 - Mar 02',
    length: '57 Laps (308.23 KM)',
    countdown: '112 DAYS REMAINING',
    technical: 'Tire Degradation Track Benchmark'
  },
  {
    id: 'f1-10',
    series: 'f1',
    seriesName: 'Formula 1',
    isLive: false,
    name: 'Australian Grand Prix',
    circuit: 'Albert Park Circuit • Melbourne',
    image: 'Assets/Events/event2.jfif',
    date: 'Mar 14 - 16',
    length: '58 Laps (306.12 KM)',
    countdown: '126 DAYS REMAINING',
    technical: 'High-Speed Street Hybrid Circuit'
  },

  // --- FIA WEC ---
  {
    id: 'wec-live',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: true,
    name: '6 Hours of Fuji',
    circuit: 'Fuji Speedway • Japan',
    image: 'Assets/Events/event5.jfif',
    date: 'LIVE NOW',
    length: '6 Hours Endurance',
    currentLeader: 'Porsche Penske #6',
    timeRemaining: '1h : 42m REMAINING',
    fastestLap: '1:29.845 (Toyota #8)',
    podium: ['1. Porsche #6', '2. Toyota #7', '3. Ferrari #50'],
    technical: '1.475 KM Main Straight with Mount Fuji view'
  },
  {
    id: 'wec-2',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '8 Hours of Bahrain',
    circuit: 'Bahrain International Circuit',
    image: 'Assets/Events/event4.jfif',
    date: 'Nov 02',
    length: '8 Hours Endurance',
    countdown: '14 DAYS REMAINING',
    technical: 'Day-into-Night Endurance Season Climax'
  },
  {
    id: 'wec-3',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: 'Qatar 1812 KM',
    circuit: 'Lusail International Circuit',
    image: 'Assets/Events/event3.jfif',
    date: 'Feb 28',
    length: '1,812 KM (10 Hours Max)',
    countdown: '108 DAYS REMAINING',
    technical: 'Season Opener honoring Qatar National Day'
  },
  {
    id: 'wec-4',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '6 Hours of Imola',
    circuit: 'Autodromo Enzo e Dino Ferrari',
    image: 'Assets/Events/event4.jfif',
    date: 'Apr 20',
    length: '6 Hours Endurance',
    countdown: '160 DAYS REMAINING',
    technical: 'Historic Italian undulating layout'
  },
  {
    id: 'wec-5',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '6 Hours of Spa-Francorchamps',
    circuit: 'Circuit de Spa • Belgium',
    image: 'Assets/Events/event2.jfif',
    date: 'May 10',
    length: '6 Hours Endurance',
    countdown: '180 DAYS REMAINING',
    technical: 'Official Le Mans rehearsal round'
  },
  {
    id: 'wec-6',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '24 Hours of Le Mans',
    circuit: 'Circuit de la Sarthe • France',
    image: 'Assets/Events/event1.jfif',
    date: 'Jun 14 - 15',
    length: '24 Hours Classic',
    countdown: '215 DAYS REMAINING',
    technical: 'The Pinnacle of World Motorsport Endurance'
  },
  {
    id: 'wec-7',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '6 Hours of São Paulo',
    circuit: 'Autódromo de Interlagos',
    image: 'Assets/Events/event3.jfif',
    date: 'Jul 13',
    length: '6 Hours Endurance',
    countdown: '244 DAYS REMAINING',
    technical: 'High tire wear South American round'
  },
  {
    id: 'wec-8',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: 'Lone Star Le Mans (COTA)',
    circuit: 'Circuit of the Americas • Texas',
    image: 'Assets/Events/event3.jfif',
    date: 'Sep 07',
    length: '6 Hours Endurance',
    countdown: '300 DAYS REMAINING',
    technical: 'Extreme ambient heat endurance battle'
  },
  {
    id: 'wec-9',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '6 Hours of Monza',
    circuit: 'Autodromo Nazionale Monza',
    image: 'Assets/Events/event2.jfif',
    date: 'Oct 04',
    length: '6 Hours Endurance',
    countdown: '327 DAYS REMAINING',
    technical: 'Chicane braking stability focus'
  },
  {
    id: 'wec-10',
    series: 'wec',
    seriesName: 'FIA WEC',
    isLive: false,
    name: '1000 Miles of Sebring',
    circuit: 'Sebring International Raceway',
    image: 'Assets/Events/event2.jfif',
    date: 'Nov 18',
    length: '1,000 Miles (or 8h)',
    countdown: '372 DAYS REMAINING',
    technical: 'Famous concrete slabs & brutal bump surface'
  },

  // --- GT WORLD CHALLENGE (GT3) ---
  {
    id: 'gt3-live',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: true,
    name: '3 Hours of Monza',
    circuit: 'Monza Circuit • GT3 Endurance',
    image: 'Assets/Events/event1.jfif',
    date: 'LIVE NOW',
    length: '3 Hours Cup',
    currentLeader: 'Team WRT BMW M4 #46',
    timeRemaining: '44 MINS REMAINING',
    fastestLap: '1:46.912 (Manthey #911)',
    podium: ['1. Team WRT #46', '2. Manthey #911', '3. Iron Lynx #63'],
    technical: 'Over 55 GT3 Cars on grid simultaneously'
  },
  {
    id: 'gt3-2',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Barcelona Sprint Cup',
    circuit: 'Circuit de Barcelona-Catalunya',
    image: 'Assets/Events/event4.jfif',
    date: 'Oct 11 - 13',
    length: '2x 60 Min Sprints',
    countdown: '18 DAYS REMAINING',
    technical: 'Twin driver mandatory pit-window sprint'
  },
  {
    id: 'gt3-3',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Bathurst 12 Hour',
    circuit: 'Mount Panorama • Australia',
    image: 'Assets/Events/event1.jfif',
    date: 'Feb 16 - 18',
    length: '12 Hours Endurance',
    countdown: '95 DAYS REMAINING',
    technical: 'The Mountain: 174m elevation variation'
  },
  {
    id: 'gt3-4',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Paul Ricard 1000 KM',
    circuit: 'Circuit Paul Ricard • France',
    image: 'Assets/Events/event5.jfif',
    date: 'Apr 11 - 13',
    length: '1,000 KM (6 Hours)',
    countdown: '150 DAYS REMAINING',
    technical: 'Mistral Straight 300+ KM/H slipstream'
  },
  {
    id: 'gt3-5',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'CrowdStrike 24 Hours of Spa',
    circuit: 'Spa-Francorchamps • Belgium',
    image: 'Assets/Events/event5.jfif',
    date: 'Jun 26 - 29',
    length: '24 Hours GT3 Classic',
    countdown: '226 DAYS REMAINING',
    technical: 'World Largest GT3 only 24-hour enduro'
  },
  {
    id: 'gt3-6',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Nürburgring 3 Hours',
    circuit: 'Nürburgring GP Track • Germany',
    image: 'Assets/Events/event2.jfif',
    date: 'Aug 29 - 31',
    length: '3 Hours Endurance',
    countdown: '290 DAYS REMAINING',
    technical: 'Technical Eifel weather transitions'
  },
  {
    id: 'gt3-7',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Misano Sprint Under Lights',
    circuit: 'Misano World Circuit • Italy',
    image: 'Assets/Events/event3.jfif',
    date: 'Jul 18 - 20',
    length: '2x 60 Min Night Sprints',
    countdown: '250 DAYS REMAINING',
    technical: 'Night race under full Adriatic floodlights'
  },
  {
    id: 'gt3-8',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Brands Hatch Sprint',
    circuit: 'Brands Hatch Grand Prix • UK',
    image: 'Assets/Events/event1.jfif',
    date: 'May 03 - 04',
    length: '2x 60 Min Sprints',
    countdown: '172 DAYS REMAINING',
    technical: 'Paddock Hill bend high commitment dip'
  },
  {
    id: 'gt3-9',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Kyalami 9 Hour',
    circuit: 'Kyalami Grand Prix Circuit • South Africa',
    image: 'Assets/Events/event4.jfif',
    date: 'Nov 27 - 29',
    length: '9 Hours Endurance',
    countdown: '380 DAYS REMAINING',
    technical: 'Intercontinental GT Challenge showdown'
  },
  {
    id: 'gt3-10',
    series: 'gt3',
    seriesName: 'GT World',
    isLive: false,
    name: 'Indianapolis 8 Hour',
    circuit: 'Indianapolis Motor Speedway Road Course',
    image: 'Assets/Events/event5.jfif',
    date: 'Oct 03 - 05',
    length: '8 Hours Endurance',
    countdown: '325 DAYS REMAINING',
    technical: 'Brickyard road course combined endurance'
  },

  // --- WRC RALLY ---
  {
    id: 'wrc-live',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: true,
    name: 'Acropolis Rally Greece',
    circuit: 'Lamia Mountains • Rough Gravel',
    image: 'Assets/Events/event2.jfif',
    date: 'LIVE NOW',
    length: '15 Special Stages (305 KM)',
    currentLeader: 'T. Neuville (Hyundai)',
    timeRemaining: 'SS14 IN PROGRESS',
    fastestLap: 'Stage 12: S. Ogier (Toyota)',
    podium: ['1. T. Neuville', '2. S. Ogier', '3. O. Tänak'],
    technical: 'Rally of Gods: Extreme rocky heat and chassis shock'
  },
  {
    id: 'wrc-2',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Rally Chile Bio Bío',
    circuit: 'Concepción Forest Gravel',
    image: 'Assets/Events/event1.jfif',
    date: 'Sep 26 - 29',
    length: '16 Special Stages (306.76 KM)',
    countdown: '12 DAYS REMAINING',
    technical: 'Cambered fast flowing forest trails'
  },
  {
    id: 'wrc-3',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Central European Rally',
    circuit: 'Czechia • Austria • Germany Asphalt',
    image: 'Assets/Events/event2.jfif',
    date: 'Oct 17 - 20',
    length: '18 Stages (302.51 KM)',
    countdown: '33 DAYS REMAINING',
    technical: 'Cross-border tarmac with damp autumn leaves'
  },
  {
    id: 'wrc-4',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Rally Japan',
    circuit: 'Aichi / Gifu Mountain Tarmac',
    image: 'Assets/Events/event2.jfif',
    date: 'Nov 21 - 24',
    length: '21 Stages (302.59 KM)',
    countdown: '68 DAYS REMAINING',
    technical: 'Tight technical tunnels and slippery asphalt'
  },
  {
    id: 'wrc-5',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Rallye Monte-Carlo 2027',
    circuit: 'French Alps / Monaco Asphalt & Ice',
    image: 'Assets/Events/event1.jfif',
    date: 'Jan 23 - 26',
    length: '17 Stages (320.40 KM)',
    countdown: '130 DAYS REMAINING',
    technical: 'Legendary Col de Turini ice patches'
  },
  {
    id: 'wrc-6',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Rally Sweden',
    circuit: 'Umeå Full Snow & Studded Tires',
    image: 'Assets/Events/event3.jfif',
    date: 'Feb 13 - 16',
    length: '18 Stages (300.10 KM)',
    countdown: '151 DAYS REMAINING',
    technical: 'Sub-zero temperatures and snowbank leans'
  },
  {
    id: 'wrc-7',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Safari Rally Kenya',
    circuit: 'Naivasha Rift Valley Rough Dirt',
    image: 'Assets/Events/event3.jfif',
    date: 'Mar 27 - 30',
    length: '19 Stages (356.98 KM)',
    countdown: '194 DAYS REMAINING',
    technical: 'Fesh-fesh sand and deep water crossings'
  },
  {
    id: 'wrc-8',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Rally Islas Canarias',
    circuit: 'Gran Canaria Mountain Tarmac',
    image: 'Assets/Events/event4.jfif',
    date: 'Apr 24 - 27',
    length: '18 Stages (301.20 KM)',
    countdown: '222 DAYS REMAINING',
    technical: 'Abrasive asphalt with hairpin sequences'
  },
  {
    id: 'wrc-9',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Rally Portugal',
    circuit: 'Matosinhos Sandy Gravel',
    image: 'Assets/Events/event5.jfif',
    date: 'May 15 - 18',
    length: '22 Stages (337.04 KM)',
    countdown: '243 DAYS REMAINING',
    technical: 'Fafe jump crowds and heavy ruts'
  },
  {
    id: 'wrc-10',
    series: 'wrc',
    seriesName: 'WRC Rally',
    isLive: false,
    name: 'Secto Rally Finland',
    circuit: 'Jyväskylä High-Speed Gravel & Jumps',
    image: 'Assets/Events/event5.jfif',
    date: 'Jul 31 - Aug 03',
    length: '20 Stages (305.20 KM)',
    countdown: '320 DAYS REMAINING',
    technical: 'Gravel Grand Prix: average speed over 125 KM/H'
  }
];

// Controller State
let activeFilter = 'all';
let visibleCount = 15; // Max cards shown before "See More"

function initEventsSection() {
  const filterButtons = document.querySelectorAll('.events-filter-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const quickSeeMoreBtn = document.getElementById('quick-see-more-btn');

  // Initial Render with Default ALL
  renderFilteredEvents();

  // Filter Buttons Click
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = btn.getAttribute('data-series');
      visibleCount = 15; // Reset pagination upon series switch
      renderFilteredEvents();
    });
  });

  // Load More Button Actions
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 15;
      renderFilteredEvents();
    });
  }

  if (quickSeeMoreBtn) {
    quickSeeMoreBtn.addEventListener('click', () => {
      visibleCount += 15;
      renderFilteredEvents();
      document.getElementById('events-grid-container').scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }
}

/**
 * Filters, sorts, and renders the cards according to rule:
 * In 'ALL', live events come first, followed by upcoming events ordered by date/readiness.
 */
/**
 * Renders events and binds click-to-expand with smart right-edge detection
 */
function renderFilteredEvents() {
  const container = document.getElementById('events-grid-container');
  const countDisplay = document.getElementById('events-count-display');
  const seeMoreWrapper = document.getElementById('see-more-wrapper');

  if (!container) return;

  // 1. Filter by Series
  let list = allEventsCatalog.filter((ev) => {
    return activeFilter === 'all' ? true : ev.series === activeFilter;
  });

  // 2. Sort: LIVE events strictly first
  list.sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return 0;
  });

  // 3. Paginate
  const displayList = list.slice(0, visibleCount);

  if (countDisplay) {
    countDisplay.innerText = `Showing ${displayList.length} of ${list.length} Events`;
  }
  if (seeMoreWrapper) {
    if (displayList.length >= list.length) {
      seeMoreWrapper.classList.add('hidden-btn');
    } else {
      seeMoreWrapper.classList.remove('hidden-btn');
    }
  }

  // 4. Build Cards HTML
  let cardsHTML = '';

  displayList.forEach((ev) => {
    const liveClass = ev.isLive ? 'is-live' : '';
    const badgeHTML = ev.isLive
      ? `<span class="event-badge-overlay badge-live"><span class="pulse-indicator"></span> LIVE NOW</span>`
      : `<span class="event-badge-overlay badge-upcoming"><i data-lucide="calendar" style="width:12px;height:12px;"></i> UPCOMING</span>`;

    let highlightHTML = '';
    if (ev.isLive) {
      highlightHTML = `
        <div class="event-status-block">
          <span class="status-label">Current Race Leader</span>
          <div class="status-value-bold live-green-text">${ev.currentLeader}</div>
          <span class="text-muted" style="font-size:0.7rem;">${ev.timeRemaining}</span>
        </div>
      `;
    } else {
      highlightHTML = `
        <div class="event-status-block">
          <span class="status-label">Countdown</span>
          <div class="status-value-bold text-green">${ev.countdown}</div>
        </div>
      `;
    }

    let extraDetailsHTML = '';
    if (ev.isLive) {
      extraDetailsHTML = `
        <div class="event-extended-details">
          <div class="telemetry-row">
            <span class="telemetry-key">Fastest Lap:</span>
            <span class="telemetry-val text-green">${ev.fastestLap}</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-key">Circuit Setup:</span>
            <span class="telemetry-val">${ev.technical}</span>
          </div>
          <span class="telemetry-key" style="display:block; margin-top:0.4rem;">Top 3 Podium Order:</span>
          <div class="podium-mini-grid">
            <div class="podium-slot">
              <span class="podium-rank">P1</span>
              <span class="podium-driver">${ev.podium[0]}</span>
            </div>
            <div class="podium-slot">
              <span class="podium-rank">P2</span>
              <span class="podium-driver">${ev.podium[1]}</span>
            </div>
            <div class="podium-slot">
              <span class="podium-rank">P3</span>
              <span class="podium-driver">${ev.podium[2]}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      extraDetailsHTML = `
        <div class="event-extended-details">
          <div class="telemetry-row">
            <span class="telemetry-key">Full Length:</span>
            <span class="telemetry-val">${ev.length}</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-key">Paddock Spec:</span>
            <span class="telemetry-val">${ev.technical}</span>
          </div>
          <div class="telemetry-row" style="margin-top:0.5rem;">
            <span class="telemetry-key">Telemetry Status:</span>
            <span class="telemetry-val text-green">Sensors Calibrated</span>
          </div>
        </div>
      `;
    }

    cardsHTML += `
      <article class="event-card-item ${liveClass}" data-event-id="${ev.id}">
        <!-- Top Image (Moves to Left side on Click) -->
        <div class="event-img-box">
          <img 
            src="${ev.image}" 
            alt="${ev.name}" 
            class="event-photo" 
            loading="lazy" 
            onerror="this.src='Assets/Events/event2.jfif'"
          />
          ${badgeHTML}
          <span class="event-series-chip">${ev.seriesName}</span>
        </div>

        <!-- Details Container (Right side on Click) -->
        <div class="event-info-box">
          <div class="event-meta-line">
            <span class="event-meta-item">
              <i data-lucide="map-pin" style="width:13px;height:13px;" class="text-green"></i>
              <span>${ev.circuit}</span>
            </span>
            <span class="event-meta-item">
              <i data-lucide="clock" style="width:13px;height:13px;"></i>
              <span>${ev.date}</span>
            </span>
          </div>

          <h3 class="event-name">${ev.name}</h3>
          
          <div class="event-meta-line">
            <span class="circuit-name"><i data-lucide="route" style="width:12px;height:12px;display:inline;"></i> ${ev.length}</span>
          </div>

          ${highlightHTML}
          ${extraDetailsHTML}

          <!-- Visual Toggle Icon (Plus / Cross) -->
          <div class="card-toggle-icon" title="Click to expand/collapse">
            <i data-lucide="plus" style="width:14px;height:14px;"></i>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = cardsHTML;

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Bind the Click-to-Expand functionality
  setupCardClickExpansion();
}

/**
 * Handles Click-To-Expand & Right-Edge Auto Detection
 */
function setupCardClickExpansion() {
  const cards = document.querySelectorAll('.event-card-item');
  const container = document.getElementById('events-grid-container');

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Check if this card is already open
      const isAlreadyExpanded = card.classList.contains('is-expanded');

      // 1. Collapse any currently opened card first
      cards.forEach((c) => {
        c.classList.remove('is-expanded', 'expand-left');
      });

      // If user clicked an open card, collapse it and stop
      if (isAlreadyExpanded) {
        return;
      }

      // 2. Desktop edge calculation
      if (window.innerWidth >= 992) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Check if card is sitting near the right boundary (rightmost column)
        const isRightEdge = (containerRect.right - cardRect.right) < 70;

        if (isRightEdge) {
          // If on right edge, mark for leftward styling and shift position before previous sibling
          card.classList.add('expand-left');
          const previousSibling = card.previousElementSibling;
          if (previousSibling) {
            container.insertBefore(card, previousSibling);
          }
        }
      }

      // 3. Expand the clicked card
      card.classList.add('is-expanded');

      // Smoothly bring expanded card into view if needed
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}