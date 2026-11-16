'use strict';

/*
  Racify front-end script.
  Order: helpers, nav, hero readouts, standings, events, news + popup, machines, marquee, footer.
*/

/* ---------- Helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const refreshIcons = () => window.lucide?.createIcons();

const SERIES_NAMES = { f1: 'Formula 1', wec: 'FIA WEC', gt3: 'GT World', wrc: 'WRC Rally' };

// Tab groups (series switchers / filters) all behave the same way.
function bindTabs(container, onChange) {
  container.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab || tab.classList.contains('is-active')) return;

    $$('.tab', container).forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-pressed', String(active));
    });
    onChange(tab.dataset.series);
  });
}

// Broken images: try data-fallback first, then show initials inside logo chips.
function handleBrokenImage(img) {
  const fallback = img.dataset.fallback;
  if (fallback && img.getAttribute('src') !== fallback) {
    img.src = fallback;
    return;
  }
  if (img.classList.contains('logo-img')) {
    img.parentElement.textContent = img.dataset.initials || '';
  }
}

document.addEventListener('error', (e) => {
  if (e.target instanceof HTMLImageElement) handleBrokenImage(e.target);
}, true);

// Images that already failed before this script ran
function checkBrokenImages() {
  $$('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) handleBrokenImage(img);
  });
}

/* ---------- Navigation ---------- */
function initNav() {
  const toggle = $('#nav-toggle');
  const nav = $('#site-nav');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  // Highlight the link for the section currently in view
  const links = new Map($$('a[href^="#"]', nav).map((a) => [a.getAttribute('href').slice(1), a]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link, id) => {
        if (id === entry.target.id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/* ---------- Hero readouts ---------- */
function initReadouts() {
  const speed = $('#speed-readout');
  const clock = $('#green-flag-clock');

  if (speed) {
    setInterval(() => {
      const kmh = 318.4 + (Math.random() * 1.8 - 0.9);
      speed.textContent = `${kmh.toFixed(1)} km/h`;
    }, 2200);
  }

  if (clock) {
    let seconds = 2 * 3600 + 14 * 60 + 8;
    const pad = (n) => String(n).padStart(2, '0');

    const timer = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        clearInterval(timer);
        clock.textContent = 'Green flag!';
        return;
      }
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      clock.textContent = `${h}h : ${pad(m)}m : ${pad(seconds % 60)}s`;
    }, 1000);
  }
}

/* ---------- Standings ---------- */
// null = did not finish. Totals are summed from the scores, so they can't drift out of sync.
const standings = {
  f1: {
    events: ['BHR', 'SAU', 'AUS', 'JPN', 'CHN', 'MIA', 'EMI', 'MON', 'CAN', 'ESP'],
    teams: [
      { name: 'McLaren F1 Team', color: '#ff8000', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png.transform/2col/image.png', scores: [25, 18, 25, 15, 25, 18, 25, 12, 18, 25] },
      { name: 'Ferrari Scuderia', color: '#e80020', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png', scores: [18, 25, 15, 18, 18, 25, 15, 25, 15, 18] },
      { name: 'Red Bull Racing', color: '#3671c6', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png.transform/2col/image.png', scores: [15, 15, 18, 25, 12, 15, 18, 18, 25, 15] },
      { name: 'Mercedes-AMG F1', color: '#27f4d2', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png.transform/2col/image.png', scores: [12, 12, 10, 10, 15, 12, 12, 15, 12, 12] },
      { name: 'Aston Martin F1', color: '#229971', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png.transform/2col/image.png', scores: [8, 10, 8, 6, 10, 8, 6, 8, 10, 6] },
      { name: 'Alpine Racing', color: '#0093cc', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png.transform/2col/image.png', scores: [4, 6, 2, 4, 6, 2, 4, 6, 2, 4] },
      { name: 'Haas F1 Team', color: '#b6babd', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png.transform/2col/image.png', scores: [2, 1, 4, 2, 1, 4, 2, 1, 4, 2] },
      { name: 'Williams Racing', color: '#64c4ff', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png.transform/2col/image.png', scores: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1] },
    ],
  },
  wec: {
    events: ['QAT', 'IMO', 'SPA', 'LMN', 'SAO', 'COA', 'FUJ', 'BHR', 'MNZ', 'SIL'],
    teams: [
      { name: 'Porsche Penske Motorsport', color: '#d5001c', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Porsche_logo.svg/300px-Porsche_logo.svg.png', scores: [25, 18, 25, 38, 18, 25, 15, 18, 25, 18] },
      { name: 'Toyota Gazoo Racing', color: '#ffffff', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/300px-Toyota.svg.png', scores: [18, 25, 18, 30, 25, 18, 25, 15, 18, 15] },
      { name: 'Ferrari AF Corse', color: '#c00000', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png.transform/2col/image.png', scores: [15, 15, 15, 50, 15, 15, 18, 25, 12, 12] },
      { name: 'Cadillac Racing', color: '#ffc72c', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cadillac_Crest_2014.svg/300px-Cadillac_Crest_2014.svg.png', scores: [12, 10, 12, 18, 10, 12, 10, 10, 8, 10] },
      { name: 'Peugeot TotalEnergies', color: '#0bf207', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Peugeot_2021_Logo.svg/240px-Peugeot_2021_Logo.svg.png', scores: [6, 6, 6, null, 6, 6, 8, 6, 4, 4] },
    ],
  },
  gt3: {
    events: ['BAT', 'LEC', 'MNZ', 'SPA', 'NUR', 'VAL', 'MIS', 'HOC', 'BAR', 'KYA'],
    teams: [
      { name: 'Team WRT (BMW)', color: '#0066b1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/300px-BMW.svg.png', scores: [25, 25, 18, 25, 18, 25, 15, 18, 25, 16] },
      { name: 'Manthey EMA (Porsche)', color: '#0bf207', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Porsche_logo.svg/300px-Porsche_logo.svg.png', scores: [18, 18, 25, 18, 25, 18, 25, 25, 18, 5] },
      { name: 'Iron Lynx (Lamborghini)', color: '#ffff00', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Lamborghini_Logo.svg/300px-Lamborghini_Logo.svg.png', scores: [15, 15, 15, 15, 15, 15, 18, 15, 15, 25] },
      { name: 'Winward Racing (AMG)', color: '#00a3e0', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/300px-Mercedes-Logo.svg.png', scores: [12, 12, 12, 12, 12, 12, 10, 12, 12, 18] },
    ],
  },
  wrc: {
    events: ['MON', 'SWE', 'KEN', 'CRO', 'POR', 'ITA', 'POL', 'LAT', 'FIN', 'GRE'],
    teams: [
      { name: 'Toyota Gazoo WRT', color: '#e60012', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/300px-Toyota.svg.png', scores: [25, 25, 18, 25, 25, 18, 25, 18, 25, 25] },
      { name: 'Hyundai Motorsport', color: '#002c6c', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/320px-Hyundai_Motor_Company_logo.svg.png', scores: [18, 18, 25, 18, 18, 25, 18, 25, 18, 18] },
      { name: 'M-Sport Ford WRT', color: '#134094', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_motor_company_flat_logo.svg/320px-Ford_motor_company_flat_logo.svg.png', scores: [15, 15, 15, 15, 15, 15, 12, 15, 12, 15] },
    ],
  },
};

function renderStandings(key) {
  const { events, teams } = standings[key];

  const ranked = teams
    .map((team) => ({ ...team, total: team.scores.reduce((sum, n) => sum + (n ?? 0), 0) }))
    .sort((a, b) => b.total - a.total);

  // Highest score in each round gets highlighted
  const best = events.map((_, i) => Math.max(...teams.map((t) => t.scores[i] ?? 0)));

  $('#board-head').innerHTML =
    '<th class="col-pos" scope="col">Pos</th>' +
    '<th class="col-team" scope="col">Constructor Team</th>' +
    events.map((code, i) => `<th class="col-event" scope="col">R${i + 1}<small>${code}</small></th>`).join('') +
    '<th class="col-total" scope="col">Total PTS</th>';

  $('#board-body').innerHTML = ranked.map((team, row) => {
    const initials = team.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

    const scoreCells = team.scores.map((score, col) => {
      if (score === null) return '<td class="col-event"><span class="chip is-dnf">DNF</span></td>';
      const top = score > 0 && score === best[col];
      return `<td class="col-event"><span class="chip${top ? ' is-top' : ''}">${score}</span></td>`;
    }).join('');

    return `
      <tr>
        <td class="col-pos pos-${row + 1}">${row + 1}</td>
        <th class="col-team" scope="row">
          <div class="team">
            <span class="team-bar" style="--team:${team.color}"></span>
            <span class="logo-chip logo-chip--team"><img class="logo-img" src="${team.logo}" alt="" data-initials="${initials}" /></span>
            <span>${team.name}</span>
          </div>
        </th>
        ${scoreCells}
        <td class="col-total">${team.total}</td>
      </tr>`;
  }).join('');
}

function initStandings() {
  renderStandings('f1');
  bindTabs($('#standings-tabs'), renderStandings);
}

/* ---------- Events ---------- */
const race = (series, name, circuit, img, date, length, note) =>
  ({ series, name, circuit, img, date, length, note });

const eventCatalog = [
  // Formula 1
  {
    series: 'f1', name: 'Monza Grand Prix', circuit: 'Autodromo Nazionale Monza • Italy', img: 'event1',
    length: '53 Laps (306.72 KM)', note: 'Downforce: Low • Top Speed: 352 KM/H',
    live: { leader: 'L. Norris (McLaren)', remaining: '18 laps remaining', fastest: '1:21.432 (M. Verstappen)', podium: ['L. Norris', 'C. Leclerc', 'O. Piastri'] },
  },
  race('f1', 'Singapore Grand Prix', 'Marina Bay Street Circuit', 'event2', 'Sep 20 - 22', '62 Laps (306.14 KM)', '61 Laps Under Lights • High Humidity'),
  race('f1', 'United States Grand Prix', 'Circuit of the Americas • Austin', 'event3', 'Oct 18 - 20', '56 Laps (308.40 KM)', 'Turn 1 Elevation Delta: 41 Meters'),
  race('f1', 'Mexico City Grand Prix', 'Autódromo Hermanos Rodríguez', 'event4', 'Oct 25 - 27', '71 Laps (305.35 KM)', 'High Altitude: 2,285m Above Sea Level'),
  race('f1', 'São Paulo Grand Prix', 'Autódromo de Interlagos • Brazil', 'event5', 'Nov 01 - 03', '71 Laps (305.90 KM)', 'Anti-Clockwise Classic Circuit'),
  race('f1', 'Las Vegas Grand Prix', 'Las Vegas Strip Circuit • USA', 'event2', 'Nov 21 - 23', '50 Laps (309.95 KM)', 'Top Speed Sector on Strip: 345+ KM/H'),
  race('f1', 'Qatar Grand Prix', 'Lusail International Circuit', 'event1', 'Nov 29 - Dec 01', '57 Laps (308.61 KM)', 'Medium-High Downforce Flowing Layout'),
  race('f1', 'Abu Dhabi Grand Prix', 'Yas Marina Circuit • UAE', 'event3', 'Dec 06 - 08', '58 Laps (306.18 KM)', 'Season Finale Twilight Transition'),
  race('f1', 'Bahrain Grand Prix 2027', 'Bahrain International Circuit', 'event1', 'Feb 28 - Mar 02', '57 Laps (308.23 KM)', 'Tire Degradation Track Benchmark'),
  race('f1', 'Australian Grand Prix', 'Albert Park Circuit • Melbourne', 'event2', 'Mar 14 - 16', '58 Laps (306.12 KM)', 'High-Speed Street Hybrid Circuit'),

  // FIA WEC
  {
    series: 'wec', name: '6 Hours of Fuji', circuit: 'Fuji Speedway • Japan', img: 'event5',
    length: '6 Hours Endurance', note: '1.475 KM Main Straight with Mount Fuji view',
    live: { leader: 'Porsche Penske #6', remaining: '1h : 42m remaining', fastest: '1:29.845 (Toyota #8)', podium: ['Porsche #6', 'Toyota #7', 'Ferrari #50'] },
  },
  race('wec', '8 Hours of Bahrain', 'Bahrain International Circuit', 'event4', 'Nov 02', '8 Hours Endurance', 'Day-into-Night Endurance Season Climax'),
  race('wec', 'Qatar 1812 KM', 'Lusail International Circuit', 'event3', 'Feb 28', '1,812 KM (10 Hours Max)', 'Season Opener honoring Qatar National Day'),
  race('wec', '6 Hours of Imola', 'Autodromo Enzo e Dino Ferrari', 'event4', 'Apr 20', '6 Hours Endurance', 'Historic Italian undulating layout'),
  race('wec', '6 Hours of Spa-Francorchamps', 'Circuit de Spa • Belgium', 'event2', 'May 10', '6 Hours Endurance', 'Official Le Mans rehearsal round'),
  race('wec', '24 Hours of Le Mans', 'Circuit de la Sarthe • France', 'event1', 'Jun 14 - 15', '24 Hours Classic', 'The Pinnacle of World Motorsport Endurance'),
  race('wec', '6 Hours of São Paulo', 'Autódromo de Interlagos', 'event3', 'Jul 13', '6 Hours Endurance', 'High tire wear South American round'),
  race('wec', 'Lone Star Le Mans (COTA)', 'Circuit of the Americas • Texas', 'event3', 'Sep 07', '6 Hours Endurance', 'Extreme ambient heat endurance battle'),
  race('wec', '6 Hours of Monza', 'Autodromo Nazionale Monza', 'event2', 'Oct 04', '6 Hours Endurance', 'Chicane braking stability focus'),
  race('wec', '1000 Miles of Sebring', 'Sebring International Raceway', 'event2', 'Nov 18', '1,000 Miles (or 8h)', 'Famous concrete slabs & brutal bump surface'),

  // GT World Challenge
  {
    series: 'gt3', name: '3 Hours of Monza', circuit: 'Monza Circuit • GT3 Endurance', img: 'event1',
    length: '3 Hours Cup', note: 'Over 55 GT3 Cars on grid simultaneously',
    live: { leader: 'Team WRT BMW M4 #46', remaining: '44 mins remaining', fastest: '1:46.912 (Manthey #911)', podium: ['Team WRT #46', 'Manthey #911', 'Iron Lynx #63'] },
  },
  race('gt3', 'Barcelona Sprint Cup', 'Circuit de Barcelona-Catalunya', 'event4', 'Oct 11 - 13', '2x 60 Min Sprints', 'Twin driver mandatory pit-window sprint'),
  race('gt3', 'Bathurst 12 Hour', 'Mount Panorama • Australia', 'event1', 'Feb 16 - 18', '12 Hours Endurance', 'The Mountain: 174m elevation variation'),
  race('gt3', 'Paul Ricard 1000 KM', 'Circuit Paul Ricard • France', 'event5', 'Apr 11 - 13', '1,000 KM (6 Hours)', 'Mistral Straight 300+ KM/H slipstream'),
  race('gt3', 'CrowdStrike 24 Hours of Spa', 'Spa-Francorchamps • Belgium', 'event5', 'Jun 26 - 29', '24 Hours GT3 Classic', 'World Largest GT3 only 24-hour enduro'),
  race('gt3', 'Nürburgring 3 Hours', 'Nürburgring GP Track • Germany', 'event2', 'Aug 29 - 31', '3 Hours Endurance', 'Technical Eifel weather transitions'),
  race('gt3', 'Misano Sprint Under Lights', 'Misano World Circuit • Italy', 'event3', 'Jul 18 - 20', '2x 60 Min Night Sprints', 'Night race under full Adriatic floodlights'),
  race('gt3', 'Brands Hatch Sprint', 'Brands Hatch Grand Prix • UK', 'event1', 'May 03 - 04', '2x 60 Min Sprints', 'Paddock Hill bend high commitment dip'),
  race('gt3', 'Kyalami 9 Hour', 'Kyalami Grand Prix Circuit • South Africa', 'event4', 'Nov 27 - 29', '9 Hours Endurance', 'Intercontinental GT Challenge showdown'),
  race('gt3', 'Indianapolis 8 Hour', 'Indianapolis Motor Speedway Road Course', 'event5', 'Oct 03 - 05', '8 Hours Endurance', 'Brickyard road course combined endurance'),

  // WRC
  {
    series: 'wrc', name: 'Acropolis Rally Greece', circuit: 'Lamia Mountains • Rough Gravel', img: 'event2',
    length: '15 Special Stages (305 KM)', note: 'Rally of Gods: Extreme rocky heat and chassis shock',
    live: { leader: 'T. Neuville (Hyundai)', remaining: 'SS14 in progress', fastest: 'Stage 12: S. Ogier (Toyota)', podium: ['T. Neuville', 'S. Ogier', 'O. Tänak'] },
  },
  race('wrc', 'Rally Chile Bio Bío', 'Concepción Forest Gravel', 'event1', 'Sep 26 - 29', '16 Special Stages (306.76 KM)', 'Cambered fast flowing forest trails'),
  race('wrc', 'Central European Rally', 'Czechia • Austria • Germany Asphalt', 'event2', 'Oct 17 - 20', '18 Stages (302.51 KM)', 'Cross-border tarmac with damp autumn leaves'),
  race('wrc', 'Rally Japan', 'Aichi / Gifu Mountain Tarmac', 'event2', 'Nov 21 - 24', '21 Stages (302.59 KM)', 'Tight technical tunnels and slippery asphalt'),
  race('wrc', 'Rallye Monte-Carlo 2027', 'French Alps / Monaco Asphalt & Ice', 'event1', 'Jan 23 - 26', '17 Stages (320.40 KM)', 'Legendary Col de Turini ice patches'),
  race('wrc', 'Rally Sweden', 'Umeå Full Snow & Studded Tires', 'event3', 'Feb 13 - 16', '18 Stages (300.10 KM)', 'Sub-zero temperatures and snowbank leans'),
  race('wrc', 'Safari Rally Kenya', 'Naivasha Rift Valley Rough Dirt', 'event3', 'Mar 27 - 30', '19 Stages (356.98 KM)', 'Fesh-fesh sand and deep water crossings'),
  race('wrc', 'Rally Islas Canarias', 'Gran Canaria Mountain Tarmac', 'event4', 'Apr 24 - 27', '18 Stages (301.20 KM)', 'Abrasive asphalt with hairpin sequences'),
  race('wrc', 'Rally Portugal', 'Matosinhos Sandy Gravel', 'event5', 'May 15 - 18', '22 Stages (337.04 KM)', 'Fafe jump crowds and heavy ruts'),
  race('wrc', 'Secto Rally Finland', 'Jyväskylä High-Speed Gravel & Jumps', 'event5', 'Jul 31 - Aug 03', '20 Stages (305.20 KM)', 'Gravel Grand Prix: average speed over 125 KM/H'),
];

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const DAY_MS = 86_400_000;
const EVENTS_PER_PAGE = 12;
const EVENT_FALLBACK_IMG = 'Assets/Events/event2.jfif';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// "Nov 29 - Dec 01" -> the next Nov 29 on or after today. Edit the date label and the countdown follows.
function nextStartDate(label) {
  const [month, day] = label.split(' - ')[0].trim().split(/\s+/);
  const today = startOfToday();
  const date = new Date(today.getFullYear(), MONTHS[month], Number(day));
  if (date < today) date.setFullYear(date.getFullYear() + 1);
  return date;
}

function countdownLabel(days) {
  if (days <= 0) return 'Starts today';
  if (days === 1) return 'Tomorrow';
  return `${days} days remaining`;
}

const events = eventCatalog.map((ev, i) => {
  const id = `event-${i}`;
  if (ev.live) return { ...ev, id };
  const start = nextStartDate(ev.date);
  return { ...ev, id, start, days: Math.round((start - startOfToday()) / DAY_MS) };
});

const eventState = { filter: 'all', shown: EVENTS_PER_PAGE };

function eventCard(ev) {
  const live = Boolean(ev.live);

  const badge = live
    ? '<span class="badge badge-live"><span class="dot dot-pulse"></span>Live now</span>'
    : '<span class="badge"><i data-lucide="calendar"></i>Upcoming</span>';

  const status = live
    ? `<div class="event-status">
         <span class="label">Current race leader</span>
         <strong class="value is-green">${ev.live.leader}</strong>
         <span class="note">${ev.live.remaining}</span>
       </div>`
    : `<div class="event-status">
         <span class="label">Countdown</span>
         <strong class="value">${countdownLabel(ev.days)}</strong>
       </div>`;

  const details = live
    ? `<dl class="rows">
         <div class="row"><dt>Fastest lap</dt><dd class="is-green">${ev.live.fastest}</dd></div>
         <div class="row"><dt>Circuit notes</dt><dd>${ev.note}</dd></div>
       </dl>
       <ol class="podium">
         ${ev.live.podium.map((name, i) => `<li><b>P${i + 1}</b><span>${name}</span></li>`).join('')}
       </ol>`
    : `<dl class="rows">
         <div class="row"><dt>Dates</dt><dd>${ev.date}</dd></div>
         <div class="row"><dt>Circuit notes</dt><dd>${ev.note}</dd></div>
       </dl>`;

  return `
    <article class="event${live ? ' is-live' : ''}">
      <div class="event-media">
        <img src="Assets/Events/${ev.img}.jfif" alt="" loading="lazy" data-fallback="${EVENT_FALLBACK_IMG}" />
        ${badge}
        <span class="badge badge-series">${SERIES_NAMES[ev.series]}</span>
      </div>
      <div class="event-body">
        <p class="event-meta">
          <span><i data-lucide="map-pin"></i>${ev.circuit}</span>
          <span><i data-lucide="clock"></i>${live ? 'Live now' : ev.date}</span>
        </p>
        <h3 class="event-name">${ev.name}</h3>
        <p class="event-length"><i data-lucide="route"></i>${ev.length}</p>
        ${status}
        <div class="event-more" id="${ev.id}-more">
          <div class="event-more-inner"><div class="event-details">${details}</div></div>
        </div>
        <button class="event-toggle" type="button" aria-expanded="false" aria-controls="${ev.id}-more">
          <span>Details</span><i data-lucide="plus"></i>
        </button>
      </div>
    </article>`;
}

function renderEvents() {
  const list = events
    .filter((ev) => eventState.filter === 'all' || ev.series === eventState.filter)
    // Live races first, then the soonest upcoming
    .sort((a, b) => (Boolean(b.live) - Boolean(a.live)) || ((a.start ?? 0) - (b.start ?? 0)));

  const visible = list.slice(0, eventState.shown);
  const remaining = list.length - visible.length;

  $('#event-grid').innerHTML = visible.map(eventCard).join('');
  $('#event-count').textContent = `Showing ${visible.length} of ${list.length} events`;
  $('#load-more-wrap').hidden = remaining <= 0;
  $('#load-more span').textContent = `Load More Events (${remaining} left)`;
  refreshIcons();
}

function initEvents() {
  renderEvents();

  bindTabs($('#event-filters'), (series) => {
    eventState.filter = series;
    eventState.shown = EVENTS_PER_PAGE;
    renderEvents();
  });

  $('#load-more').addEventListener('click', () => {
    eventState.shown += EVENTS_PER_PAGE;
    renderEvents();
  });

  // One listener for every card
  $('#event-grid').addEventListener('click', (e) => {
    const toggle = e.target.closest('.event-toggle');
    if (!toggle) return;

    const open = toggle.closest('.event').classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    $('span', toggle).textContent = open ? 'Hide details' : 'Details';
  });
}

/* ---------- News + popup ---------- */
const stories = [
  {
    id: 'news-1', series: 'f1', date: '2026-11-14', minutes: 3,
    title: 'FIA Finalizes 2027 Active Aerodynamics Regulations Ahead of Winter Testing',
    snippet: 'Groundbreaking CFD regulations reveal automated wing-angle overrides and reduced dirty air wake profiles for the upcoming engine formula...',
    sections: [
      ['Active Aero Regulations Confirmed for 2027', 'The FIA World Motor Sport Council has formally ratified the 2027 technical package. The highlight is the newly christened "Z-Mode" and "X-Mode" active drag configuration, allowing cars to dynamically trim downforce on straightaways without relying exclusively on manual DRS activation.'],
      ['CFD Profiles & Weight Reduction', 'Minimum vehicle weight will be trimmed down by 30kg, reversing a decade-long upward trajectory. Front and rear wing element chords have been standardized to limit outwash vortex creation, improving trailing car stability in cornering sequences by an estimated 28%.'],
      ['Constructors Weigh In', 'Team principals have expressed enthusiasm for the mechanical simplicity of the active aerodynamic servos. Pre-season wind tunnel allocation windows will expand by 40 hours in early 2027 to assist teams in validating telemetry baselines.'],
    ],
  },
  {
    id: 'news-2', series: 'wec', date: '2026-11-13', minutes: 4,
    title: 'Ferrari AF Corse Completes 36-Hour Endurance Simulation at Paul Ricard',
    snippet: 'Intensive twin-engine dyno testing and Michelin compound durability programs signal renewed confidence ahead of next season’s 24 Hours of Le Mans...',
    sections: [
      ['36-Hour Marathon Trial at Le Castellet', 'The 499P Hypercar successfully logged over 5,400 uninterrupted track kilometers across 36 hours. Testing centered on hybrid power delivery stabilization during cold night ambient drops under 8°C.'],
      ['Tire Degradation Vectors', 'Telemetry showed a 0.2-second improvement in quadruple-stint tire consistency. Brake regeneration efficiency climbed to 94.2%, reducing cooling duct drag along the 1.8km Mistral straight.'],
    ],
  },
  {
    id: 'news-3', series: 'gt3', date: '2026-11-12', minutes: 2,
    title: 'SRO Unveils Record 62-Car Entry List for 2027 CrowdStrike 24 Hours of Spa',
    snippet: 'Nine world-class manufacturers represented in Pro Cup, with BMW, Porsche, Ferrari, and Lamborghini fielding factory-backed endurance lineups...',
    sections: [
      ['Record Grid Set for Ardennes Classic', 'The centenary edition of the 24 Hours of Spa will see the largest Pro-category grid since 2019. Over twenty GT3 cars are separated by less than half a second in simulated Balance of Performance simulations.'],
      ['Superstars in Machinery', 'Leading factory aces will join forces with top junior formula stars. Extended pit stops for brake pad replacements will remain mandatory to reward well-drilled pit crews.'],
    ],
  },
  {
    id: 'news-4', series: 'wrc', date: '2026-11-11', minutes: 3,
    title: 'WRC Proposes Non-Hybrid Rally1 Chassis Regulations for Enhanced Agility',
    snippet: 'Manufacturers back simplified sustainable-fuel turbo powertrains to curb costs and attract customer teams for 2027 Monte-Carlo championship kickoff...',
    sections: [
      ['Simplified Sustainable Powertrains', 'The FIA has greenlit a streamlined powertrain architecture. By eliminating heavy auxiliary high-voltage battery modules, rally cars will shed approximately 100kg, returning to aggressive high-yaw corner transitions.'],
      ['Longer Wheel Travel for Rough Terrain', 'Teams will gain an extra 40mm of wheel articulation, enhancing jump landing dampening on grueling stages like Safari Rally Kenya and Acropolis Rally Greece.'],
    ],
  },
  {
    id: 'news-5', series: 'f1', date: '2026-11-10', minutes: 3,
    title: 'McLaren Opens Advanced High-Altitude Sim Facility to Accelerate In-Season Updates',
    snippet: 'State-of-the-art multi-axis cockpit simulator allows aerodynamicists to model tire micro-grain under severe high-speed thermal cycles...',
    sections: [
      ['Next-Gen Simulator Operational', 'Constructed at the McLaren Technology Centre in Woking, the dynamic motion rig features cryogenic cockpit conditioning and 360-degree LIDAR track mapping with sub-millimeter precision.'],
      ['Virtual Tire Correlation', 'Engineers report an unprecedented 98.4% correlation between real-world track telemetry and driver-in-the-loop virtual test runs.'],
    ],
  },
  {
    id: 'news-6', series: 'wec', date: '2026-11-09', minutes: 2,
    title: 'Aston Martin Valkyrie Hypercar Completes First High-Downforce Aero Shakedown',
    snippet: 'The atmospheric 6.5-litre V12 machine reverberates across Silverstone as factory drivers confirm structural stiffness and cooling throughput...',
    sections: [
      ['Naturally Aspirated V12 Returns', 'The Aston Martin Valkyrie Le Mans prototype turned its first high-speed laps on the Silverstone International Circuit. Chief engineers reported immaculate drivetrain cooling efficiency despite ambient temperatures reaching 30°C.'],
    ],
  },
  {
    id: 'news-7', series: 'gt3', date: '2026-11-08', minutes: 3,
    title: 'Manthey Racing Confirms 2-Car Porsche 911 GT3 R Program for Nürburgring 24h',
    snippet: 'The iconic "Grello" livery returns to the Green Hell with a star-studded driver lineup aiming for a record-extending eighth overall victory...',
    sections: [
      ['Grello Returns to Nordschleife', 'Manthey EMA will deploy twin factory-supported Porsche 911 GT3 R chassis. Focus has been placed on improving damper rebound across the Flugplatz and Karussell compression bumps.'],
    ],
  },
  {
    id: 'news-8', series: 'wrc', date: '2026-11-07', minutes: 4,
    title: 'Pirelli Develops Reinforced Studded Ice Compound for Rally Sweden 2027',
    snippet: 'New vulcanization technique locks 384 tungsten-tipped studs into the tread block, offering 15% better retention over frozen gravel banks...',
    sections: [
      ['Tungsten Stud Retention Breakthrough', 'Sub-zero testing in Swedish Lapland verified that the newly patented vulcanized stud base prevents premature stud loss when stage lines degrade down into exposed gravel ruts.'],
    ],
  },
];

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });
const formatDate = (iso) => dateFormat.format(new Date(iso));

// Read state survives a refresh
const READ_KEY = 'racify:read-stories';
const readStories = new Set((() => {
  try { return JSON.parse(localStorage.getItem(READ_KEY)) ?? []; } catch { return []; }
})());

function saveReadStories() {
  try { localStorage.setItem(READ_KEY, JSON.stringify([...readStories])); } catch { /* storage unavailable */ }
}

let newsFilter = 'all';

function renderNews() {
  const list = stories
    .filter((s) => newsFilter === 'all' || s.series === newsFilter)
    .sort((a, b) => b.date.localeCompare(a.date));

  $('#news-grid').innerHTML = list.map((s) => `
    <article class="story${readStories.has(s.id) ? ' is-read' : ''}" data-id="${s.id}">
      <div class="story-head">
        <h3><button class="story-open" type="button">${s.title}</button></h3>
        <span class="unread" title="Unread"></span>
      </div>
      <p class="story-snippet">${s.snippet}</p>
      <div class="story-foot">
        <div>
          <span class="tag">${SERIES_NAMES[s.series]}</span>
          <span>${formatDate(s.date)}</span>
        </div>
        <span class="read-pill"><i data-lucide="clock"></i>${s.minutes} min read</span>
      </div>
    </article>`).join('');

  refreshIcons();
}

function updateNewsCounts() {
  $$('[data-count]').forEach((el) => {
    const key = el.dataset.count;
    el.textContent = key === 'all' ? stories.length : stories.filter((s) => s.series === key).length;
  });
}

// Popup
let lastFocused = null;

function openStory(id) {
  const story = stories.find((s) => s.id === id);
  if (!story) return;

  readStories.add(id);
  saveReadStories();
  $(`.story[data-id="${id}"]`)?.classList.add('is-read');

  $('#modal-series').textContent = SERIES_NAMES[story.series];
  $('#modal-date').textContent = formatDate(story.date);
  $('#modal-date').setAttribute('datetime', story.date);
  $('#modal-read').textContent = `${story.minutes} min read`;

  const body = $('#modal-body');
  body.innerHTML = `
    <h2 id="modal-title">${story.title}</h2>
    <p class="lead-in">${story.snippet}</p>
    ${story.sections.map(([heading, text]) => `<h3>${heading}</h3><p>${text}</p>`).join('')}
    <blockquote>"The mechanical and aerodynamic balance achieved here establishes a strong baseline for team engineers as we head into the upcoming championship rounds."</blockquote>
    <p>Official telemetry updates, onboard audio files, and sector-by-sector driver deltas will continue to stream live directly to Racify subscribers.</p>`;
  body.scrollTop = 0;

  lastFocused = document.activeElement;
  $('#news-modal').classList.add('is-open');
  $('#news-modal').setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  $('#modal-close').focus();
}

function closeStory() {
  const modal = $('#news-modal');
  if (!modal.classList.contains('is-open')) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocused?.focus();
}

function initNews() {
  updateNewsCounts();
  renderNews();

  bindTabs($('#news-filters'), (series) => {
    newsFilter = series;
    renderNews();
  });

  $('#news-grid').addEventListener('click', (e) => {
    if (e.target.closest('.story-open')) openStory(e.target.closest('.story').dataset.id);
  });

  const modal = $('#news-modal');
  const closeBtn = $('#modal-close');
  const body = $('#modal-body');

  closeBtn.addEventListener('click', closeStory);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeStory(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeStory(); });

  // Keep Tab inside the popup while it is open
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [closeBtn, body];
    const at = items.indexOf(document.activeElement);
    const next = e.shiftKey ? (at <= 0 ? items.length - 1 : at - 1) : (at === items.length - 1 ? 0 : at + 1);
    e.preventDefault();
    items[next].focus();
  });
}

/* ---------- Machines ---------- */
const cars = {
  f1: [
    { maker: 'Formula 1 Technical Group', name: 'F1 Hybrid Regulation 2026/27', chassis: 'Carbon Composite Monocoque Gen-3', tag: 'Formula 1', image: 'Assets/F1/F1_car_e161d664.jpg', topSpeed: '358 KM/H', accel: '2.4s', weight: '768 KG', engine: '1.6L V6 Turbo + 350kW MGU-K Hybrid', downforce: '1,450 KG' },
  ],
  wec: [
    { maker: 'Porsche Motorsport', name: 'Porsche 963 LMDh', chassis: 'Multimatic Carbon Tub', tag: 'WEC Hypercar', image: 'Assets/WEC/Porsche LMP.jpg', topSpeed: '342 KM/H', accel: '2.6s', weight: '1,030 KG', engine: '4.6L Twin-Turbo V8 Hybrid', downforce: '1,680 KG' },
    { maker: 'Ferrari Scuderia', name: 'Ferrari 499P Hypercar', chassis: 'Dallara Carbon Honeycomb', tag: 'WEC Hypercar', image: 'Assets/WEC/Ferrari LMP.jpg', topSpeed: '345 KM/H', accel: '2.5s', weight: '1,030 KG', engine: '3.0L Twin-Turbo 120° V6 Hybrid', downforce: '1,720 KG' },
    { maker: 'Toyota Gazoo Racing', name: 'Toyota GR010 Hybrid', chassis: 'TGR High-Stiffness Composite', tag: 'WEC Hypercar', image: 'Assets/WEC/Toyota LMP.jpg', topSpeed: '340 KM/H', accel: '2.6s', weight: '1,040 KG', engine: '3.5L Twin-Turbo V6 AWD Hybrid', downforce: '1,690 KG' },
    { maker: 'Cadillac Racing', name: 'Cadillac V-Series.R', chassis: 'Dallara LMDh Spec', tag: 'WEC Hypercar', image: 'Assets/WEC/CdillaLMP.jpg', accel: '2.7s', weight: '1,030 KG', engine: '5.5L Naturally Aspirated V8', downforce: '1,620 KG' },
    { maker: 'Peugeot Sport', name: 'Peugeot 9X8 2026 Winged', chassis: 'Ligier Carbon Monocoque', tag: 'WEC Hypercar', image: 'Assets/WEC/Peugoet LMP.jpg', topSpeed: '339 KM/H', accel: '2.6s', weight: '1,030 KG', engine: '2.6L Twin-Turbo V6 Hybrid', downforce: '1,670 KG' },
  ],
  gt3: [
    { maker: 'BMW M Motorsport', name: 'BMW M4 GT3 EVO', chassis: 'Lightweight Welded Steel/Carbon Cell', tag: 'GT3 Pro', image: 'Assets/GT/BMW EVO.jpg', topSpeed: '305 KM/H', accel: '3.1s', weight: '1,260 KG', engine: '3.0L M TwinPower Turbo Inline-6', downforce: '1,120 KG' },
    { maker: 'Porsche Motorsport', name: 'Porsche 911 GT3 R (992)', chassis: 'Aluminum-Steel Composite Body', tag: 'GT3 Pro', image: 'Assets/GT/Porsche_911_.jpg', topSpeed: '302 KM/H', accel: '3.0s', weight: '1,250 KG', engine: '4.2L Water-Cooled Flat-6', downforce: '1,180 KG' },
    { maker: 'Mercedes-AMG', name: 'Mercedes-AMG GT3', chassis: 'Aluminum Spaceframe with Rollcage', tag: 'GT3 Pro', image: 'Assets/GT/Mercedes-AMG_GT3.jpg', topSpeed: '308 KM/H', accel: '3.2s', weight: '1,285 KG', engine: '6.2L Naturally Aspirated V8', downforce: '1,150 KG' },
    { maker: 'Lamborghini Squadra Corse', name: 'Huracán GT3 EVO2', chassis: 'Hybrid Carbon-Aluminum Skeleton', tag: 'GT3 Pro', image: 'Assets/GT/Lamborghini_Huracán_GT3.jpg', topSpeed: '306 KM/H', accel: '3.1s', weight: '1,255 KG', engine: '5.2L Naturally Aspirated V10', downforce: '1,140 KG' },
    { maker: 'Ferrari Corse Clienti', name: 'Ferrari 296 GT3', chassis: 'Aluminum Monocoque Architecture', tag: 'GT3 Pro', image: 'Assets/GT/Ferrari_296_GT3.jpg', topSpeed: '310 KM/H', accel: '2.9s', weight: '1,250 KG', engine: '3.0L 120° Twin-Turbo V6', downforce: '1,210 KG' },
  ],
  wrc: [
    { maker: 'Toyota Gazoo Racing', name: 'GR Yaris Rally1', chassis: 'FIA Spaceframe Tub Integration', tag: 'Rally1', image: 'Assets/Wrc/Toyota_Yaris_Rally1.jpg', topSpeed: '215 KM/H', accel: '3.2s', weight: '1,190 KG', engine: '1.6L Direct Injection Turbo (380 BHP)', downforce: '720 KG' },
    { maker: 'Hyundai Motorsport', name: 'i20 N Rally1', chassis: 'Reinforced Tubular Steel Rollcage', tag: 'Rally1', image: 'Assets/Wrc/Hyundai_i20_N_Rally1.jpg', topSpeed: '218 KM/H', accel: '3.2s', weight: '1,190 KG', engine: '1.6L Turbo + AWD Mechanical Diffs', downforce: '740 KG' },
    { maker: 'M-Sport Ford', name: 'Puma Rally1', chassis: 'Custom Multi-Point Tubular Frame', tag: 'Rally1', image: 'Assets/Wrc/Ford_Puma_Rally1.jpg', topSpeed: '212 KM/H', accel: '3.3s', weight: '1,190 KG', engine: '1.6L EcoBoost 100% Fossil-Free', downforce: '710 KG' },
    { maker: 'Škoda Motorsport', name: 'Fabia RS Rally2 Evo', chassis: 'Production Shell Reinforced', tag: 'WRC2', image: 'Assets/Wrc/Škoda_Fabia_RS_Rally2.jpg', topSpeed: '202 KM/H', accel: '3.8s', weight: '1,230 KG', engine: '1.6L Turbo Charged 290 BHP', downforce: '580 KG' },
    { maker: 'Citroën Racing', name: 'C3 Rally2 Works', chassis: 'FIA Certified Welded Cage', tag: 'WRC2', image: 'Assets/Wrc/Citroën_C3_Rally2.jpg', topSpeed: '205 KM/H', accel: '3.7s', weight: '1,230 KG', engine: '1.6L 16V Turbo Direct Injection', downforce: '590 KG' },
  ],
};

const CAR_FALLBACK_IMG = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80';

function carCard(car) {
  return `
    <article class="car">
      <div class="car-media">
        <img src="${car.image}" alt="${car.name}" loading="lazy" data-fallback="${CAR_FALLBACK_IMG}" />
        <span class="car-class">${car.tag}</span>
      </div>
      <div class="car-body">
        <p class="car-maker">${car.maker}</p>
        <h3 class="car-name">${car.name}</h3>
        <p class="car-chassis">${car.chassis}</p>
        <dl class="specs">
          <div class="spec"><dt>Top speed</dt><dd class="is-green">${car.topSpeed ?? '—'}</dd></div>
          <div class="spec"><dt>0-100 km/h</dt><dd>${car.accel}</dd></div>
          <div class="spec"><dt>Weight</dt><dd>${car.weight}</dd></div>
          <div class="spec"><dt>Downforce</dt><dd class="is-green">${car.downforce}</dd></div>
        </dl>
        <p class="car-engine"><i data-lucide="cpu"></i><span>${car.engine}</span></p>
      </div>
    </article>`;
}

function initGarage() {
  const runway = $('#runway');
  const arrows = $('#runway-arrows');

  const updateArrows = () => { arrows.hidden = runway.scrollWidth <= runway.clientWidth + 2; };

  const render = (series) => {
    runway.innerHTML = cars[series].map(carCard).join('');
    runway.scrollTo({ left: 0 });
    refreshIcons();
    updateArrows();
  };

  const step = () => (runway.firstElementChild?.offsetWidth ?? 300) + 20;

  render('f1');
  bindTabs($('#garage-tabs'), render);

  $('#runway-prev').addEventListener('click', () => runway.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#runway-next').addEventListener('click', () => runway.scrollBy({ left: step(), behavior: 'smooth' }));
  window.addEventListener('resize', updateArrows);
}

/* ---------- Partners marquee ---------- */
// The HTML lists each sponsor once; the clone makes the CSS loop seamless.
function initMarquee() {
  const track = $('#marquee-track');
  const group = track?.firstElementChild;
  if (!group) return;

  const clone = group.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  $$('img', clone).forEach((img) => { img.alt = ''; });
  track.append(clone);
}

/* ---------- Footer ---------- */
function initFooter() {
  $('#to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const form = $('#signup-form');
  const input = $('#signup-email');
  const status = $('#signup-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return;

    // No backend yet: this only confirms on screen. Post `email` to your service here.
    status.textContent = `You're on the list. Alerts will be sent to ${email}.`;
    status.hidden = false;
    form.reset();
  });
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReadouts();
  initStandings();
  initEvents();
  initNews();
  initGarage();
  initMarquee();
  initFooter();

  refreshIcons();
  checkBrokenImages();
});
