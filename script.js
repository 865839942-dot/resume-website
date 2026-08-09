// ===== 打字机效果：Hero 副标题 =====
const roles = [
  '任务策划 @ 网易雷火《逆水寒》',
  '叙事设计 · 剧情沉浸体验打造者',
  '剧情活动系统规划与落地',
  '动画演出质量把关人'
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ===== 展板翻页（任务叙事 / 剧情玩法 / 动画演出，每个 .task-showcase 独立计数） =====
document.querySelectorAll('.task-showcase').forEach(showcase => {
  const slides = showcase.querySelectorAll('.task-slide');
  const dots = showcase.querySelectorAll('.task-dot');
  const prevBtn = showcase.querySelector('.task-nav-prev');
  const nextBtn = showcase.querySelector('.task-nav-next');
  let index = 0;

  function goTo(i){
    if (!slides.length) return;
    index = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === index));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
  }
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, idx) => dot.addEventListener('click', () => goTo(idx)));
});

// ===== 游戏图鉴：点击徽章切换展板 =====
document.querySelectorAll('.badge-tile').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.badge-tile').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.dex-category').forEach(panel => {
      panel.classList.toggle('active', panel.getAttribute('data-cat') === cat);
    });
  });
});

// ===== 作品图放大预览 =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(btn){
  const img = btn.querySelector('img');
  if (!img || !lightbox) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = btn.getAttribute('data-caption') || img.alt || '';
  lightbox.classList.add('show');
  lightboxClose.focus();
}
function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove('show');
  lightboxImg.src = '';
}

document.querySelectorAll('.work-thumb-btn').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn));
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox){
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ===== 侧边栏导航高亮当前区域 =====
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window && navItems.length){
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-20% 0px -60% 0px' });
  sections.forEach(sec => navObserver.observe(sec));
}

// ===== 作品集左侧子导航高亮（任务叙事 / 剧情玩法 / 动画演出） =====
const navSubitems = document.querySelectorAll('.nav-subitem');
const portfolioModules = document.querySelectorAll('.portfolio-module');

if ('IntersectionObserver' in window && navSubitems.length){
  const subObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navSubitems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });
  portfolioModules.forEach(mod => subObserver.observe(mod));
}
