const snakes = [
  {
    name: "翡翠樹蚺",
    scientific: "Corallus caninus",
    habitat: "forest",
    habitatLabel: "熱帶雨林",
    image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=1200&q=80",
    description: "鮮明的翠綠體色與白色斑紋讓翡翠樹蚺成為雨林中的經典代表。牠們多半盤踞在枝條上，以伏擊方式捕食小型哺乳類與鳥類。",
    fact: "樹棲型",
    htmlWork: "entries/emerald-tree-boa.html",
    slides: "assets/slides/emerald-tree-boa.html"
  },
  {
    name: "角響尾蛇",
    scientific: "Crotalus cerastes",
    habitat: "desert",
    habitatLabel: "乾燥沙漠",
    image: "https://images.unsplash.com/photo-1585095595205-e68428a9e205?auto=format&fit=crop&w=1200&q=80",
    description: "角響尾蛇以眼上方突出的鱗片與側行移動方式聞名。牠們能在鬆軟沙地上有效率地移動，降低身體與高溫地表接觸的時間。",
    fact: "側行高手",
    htmlWork: "entries/sidewinder.html",
    slides: "assets/slides/sidewinder.html"
  },
  {
    name: "赤腹游蛇",
    scientific: "Nerodia erythrogaster",
    habitat: "wetland",
    habitatLabel: "河川濕地",
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80",
    description: "赤腹游蛇常見於河岸、池塘與沼澤附近，擅長游泳並以魚類、蛙類為食。牠們展現了蛇類適應水域環境的另一種生活型態。",
    fact: "半水棲",
    htmlWork: "entries/plain-bellied-water-snake.html",
    slides: "assets/slides/plain-bellied-water-snake.html"
  }
];

const atlasGrid = document.querySelector('#atlasGrid');
const searchInput = document.querySelector('#searchInput');
const chips = [...document.querySelectorAll('.chip')];
const emptyState = document.querySelector('#emptyState');
const dialog = document.querySelector('#detailDialog');
const dialogContent = document.querySelector('#dialogContent');
let activeFilter = 'all';

function renderCards() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = snakes.filter(snake => {
    const byHabitat = activeFilter === 'all' || snake.habitat === activeFilter;
    const haystack = `${snake.name} ${snake.scientific} ${snake.habitatLabel} ${snake.description} ${snake.fact}`.toLowerCase();
    return byHabitat && haystack.includes(keyword);
  });

  atlasGrid.innerHTML = filtered.map((snake, index) => `
    <article class="snake-card">
      <div class="card-image">
        <img src="${snake.image}" alt="${snake.name}" loading="lazy" />
        <span class="habitat-tag">${snake.habitatLabel}</span>
      </div>
      <div class="card-body">
        <h3>${snake.name}</h3>
        <div class="scientific">${snake.scientific}</div>
        <p>${snake.description}</p>
        <div class="card-meta">
          <small>${snake.fact}</small>
          <button class="card-link" data-index="${snakes.indexOf(snake)}">查看條目 →</button>
        </div>
      </div>
    </article>
  `).join('');

  emptyState.hidden = filtered.length > 0;
}

function openDetail(index) {
  const snake = snakes[index];
  dialogContent.innerHTML = `
    <div class="detail-hero"><img src="${snake.image}" alt="${snake.name}"></div>
    <div class="detail-copy">
      <p class="eyebrow">SPECIES DETAIL</p>
      <h2>${snake.name}</h2>
      <p class="scientific">${snake.scientific}</p>
      <p>${snake.description}</p>
      <p><strong>棲地：</strong>${snake.habitatLabel}<br><strong>特色：</strong>${snake.fact}</p>
      <div class="detail-tools">
        <a href="${snake.htmlWork}" target="_blank" rel="noopener">開啟 HTML 作品</a>
        <a href="${snake.slides}" target="_blank" rel="noopener">開啟簡報</a>
      </div>
    </div>`;
  dialog.showModal();
}

atlasGrid.addEventListener('click', e => {
  const button = e.target.closest('[data-index]');
  if (button) openDetail(Number(button.dataset.index));
});

searchInput.addEventListener('input', renderCards);
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeFilter = chip.dataset.filter;
  renderCards();
}));

document.querySelector('#dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
});

renderCards();
