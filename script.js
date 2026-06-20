/* ============================================
   UNTUK CHEISYA — script.js
   Edit bagian CONFIG, timelineEvents, dan galleryPhotos
   di bawah ini sesuai cerita kalian berdua.
   ============================================ */

const CONFIG = {
  // EDIT INI: tanggal jadian / tanggal yang mau dihitung mundur
  // format: 'YYYY-MM-DD'
  startDate: '2026-01-28',
};

// Foto & cerita di bagian "Cerita Kita".
// taruh file fotonya di folder /photos lalu samakan namanya di "photo".
const timelineEvents = [
  {
    date: 'foto pertama',
    title: 'foto bareng kita pertama kali',
    caption: 'dulu aku waktu difoto ini malu bgtt, solanya yang foto bulik kamu dan ada ibu ma ayahmu WKWKKW, aku kaku bgt yaa',
    photo: 'photos-1.jpeg',
  },
  {
    date: 'photobooth pertama',
    title: 'photobooth pertama kita',
    caption: 'photobooth pertama kita, jujur ini aku dulu senegggg banget, soalnya aku jadi punya foto fisik kita berdua WKWKKW',
    photo: 'photos-2.jpeg',
  },
  {
    date: 'main lama',
    title: 'Foto kita waktu di faste',
    caption: 'ntahh kenapa aku selalu senengg bgtt liat foto pas kita lagi di faste, karna pas di faste kita berdua bisa main yang bener bener sepuas kita gituu, yokk kpan kpakn gas lagi yaa.',
    photo: 'photos-3.jpeg',
  },
  {
    date: 'sekarang',
    title: 'Hari ini',
    caption: 'Foto hari ini, tadi pagi aku senengg bgtt kamu mulai kembali kaya kemarin kemarinn, itu aku balik langsung legaa gitu rasanyaa. semoga kamu kembali ceria kaya tadi pagi ya',
    photo: 'photos-4.jpeg',
  },
];

// Foto-foto di bagian "Galeri Randomm Kita".
// tambah atau kurangi item sesuka kamu.
const galleryPhotos = [
  { src: 'gallery-1.jpeg', caption: 'Disinii aku sebenernya dalam hatiku seneng karna motor belakang belum minggir' },
  { src: 'gallery-2.jpeg', caption: 'KAMU GEMESH BGT' },
  { src: 'gallery-3.jpeg', caption: 'sebenernya awalnya sedih karna gajadi foto, eh karna ketemu lama malah jadi seneng' },
  { src: 'gallery-4.jpeg', caption: 'WKWKWKW LUCUK' },
  { src: 'gallery-5.jpeg', caption: 'pengen makan gacoann lagii' },
  { src: 'gallery-6.jpeg', caption: 'when ya nongkrong depan kosan kamu lagi' },
];

// Bubble "badmood" di mini-game hero. Boleh diedit kata-katanya.
const moodBubbles = [
  { emoji: '😤', label: 'sebel' },
  { emoji: '😩', label: 'capek' },
  { emoji: '😣', label: 'BT' },
  { emoji: '😢', label: 'sedih' },
  { emoji: '🥱', label: 'mager' },
  { emoji: '😮‍💨', label: 'pusing' },
];

// Kata yang muncul terbang ke atas tiap satu bubble dipecahin.
const upliftWords = ['cemangattt!', 'kamu kuattt', 'santai ajaaa', 'aku temenin', 'pasti lewat', 'aku sayang kamu', 'kamu hebat', 'aku bangga sama kamu'];

// Pesan random di "Toples Semangat" — tambah sebanyak yang kamu mau.
const jarMessages = [
  'jangann sedihh teruss ya yy, aku ikutan sedihh nihh 🥺',
  'maafff ya sayangg aku akhir akhir ini banyak bikin kamhu sedihh',
  'cemnagatttt,  akuu tau kamuu lagii capeekk',
  'badmood boleh, tapi jangan lama lama ya sayangg, aku cedih 🫶',
  'Kalooo ada paa apaa ceritaa ke akuu ya ayy',
  'kamu boleh nangis, tapi abis itu senyum lagi ya',
  'satu hal yang pasti: aku sayang kamuuu ayyyy🥺',
  'semoga abis ini mood kamu jadi lebih baik 💕',
];

/* ============================================
   Helper: tampilkan placeholder kalau foto belum ada
   ============================================ */
function setupImageFallback(img, label) {
  img.addEventListener('error', () => {
    const frame = img.parentElement;
    frame.classList.add('no-photo');
    frame.innerHTML = `<span>📷<br>${label}</span>`;
  }, { once: true });
}

/* ============================================
   Render timeline
   ============================================ */
function renderTimeline() {
  const list = document.getElementById('timelineList');
  list.innerHTML = timelineEvents.map((ev) => `
    <article class="timeline__item reveal">
      <span class="timeline__dot" aria-hidden="true"></span>
      <p class="timeline__date">${ev.date}</p>
      <h3 class="timeline__title">${ev.title}</h3>
      <p class="timeline__caption">${ev.caption}</p>
      <div class="polaroid timeline__photo">
        <div class="polaroid__frame">
          <img src="${ev.photo}" alt="${ev.title}">
        </div>
      </div>
    </article>
  `).join('');

  list.querySelectorAll('.timeline__photo img').forEach((img, i) => {
    setupImageFallback(img, `foto: ${timelineEvents[i].photo.split('/').pop()}`);
  });
}

/* ============================================
   Render gallery (carousel geser)
   ============================================ */
function renderGallery() {
  const track = document.getElementById('galleryTrack');
  const dotsWrap = document.getElementById('galleryDots');

  track.innerHTML = galleryPhotos.map((p, i) => `
    <figure class="gallery__item reveal" data-index="${i}">
      <div class="gallery__frame">
        <img src="${p.src}" alt="${p.caption}">
      </div>
      <figcaption class="gallery__caption">${p.caption}</figcaption>
    </figure>
  `).join('');

  dotsWrap.innerHTML = galleryPhotos.map((_, i) =>
    `<span class="gallery__dot${i === 0 ? ' is-active' : ''}" data-dot="${i}"></span>`
  ).join('');

  const items = track.querySelectorAll('.gallery__item');
  const dots = dotsWrap.querySelectorAll('.gallery__dot');

  items.forEach((item) => {
    setupImageFallback(item.querySelector('img'), galleryPhotos[Number(item.dataset.index)].src.split('/').pop());
  });

  // tap foto buka lightbox
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const i = Number(item.dataset.index);
      openLightbox(galleryPhotos[i].src, galleryPhotos[i].caption);
    });
  });

  // titik aktif mengikuti foto yang lagi di tengah saat digeser
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const i = Number(entry.target.dataset.index);
        dots.forEach((d) => d.classList.remove('is-active'));
        if (dots[i]) dots[i].classList.add('is-active');
      }
    });
  }, { root: track, threshold: 0.6 });

  items.forEach((item) => dotObserver.observe(item));

  // tap titik buat lompat ke foto itu
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const i = Number(dot.dataset.dot);
      items[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

/* ============================================
   Hero photo placeholder
   ============================================ */
function setupHeroPhoto() {
  const img = document.getElementById('heroPhoto');
  setupImageFallback(img, 'foto: photos/hero.jpg');
}

/* ============================================
   Day counter — animasi hitung naik saat terlihat
   ============================================ */
function setupDayCounter() {
  const target = Math.max(
    0,
    Math.floor((Date.now() - new Date(CONFIG.startDate).getTime()) / 86400000)
  );
  const el = document.getElementById('dayCount');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCount(el, target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.getElementById('counterSection'));
}

function animateCount(el, target) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target;
    return;
  }
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ============================================
   Scroll reveal untuk elemen .reveal
   ============================================ */
function setupScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));
}

/* ============================================
   Confetti — dipakai di banyak interaksi (bubble, hug, dsb)
   ============================================ */
function launchConfetti(originEl, count = 18) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const symbols = ['💖', '✨', '⭐', '💕', '🌟'];
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top;

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 260}px`);
    piece.style.setProperty('--rot', `${(Math.random() - 0.5) * 360}deg`);
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

/* ============================================
   Mini-game: pecahin bubble badmood
   ============================================ */
function setupPopGame() {
  const field = document.getElementById('popField');
  const progress = document.getElementById('popProgress');
  const message = document.getElementById('moodMessage');
  const skipBtn = document.getElementById('skipGame');
  const gameWrap = document.getElementById('popGame');
  const total = moodBubbles.length;
  let popped = 0;

  const finalMessages = [
    'semua badmood-nya kepop! 🎉 sekarang giliran aku yang nyemangatin kamu ⬇️',
    'mantap, Sayang! sisanya biar aku yang urus ya, liat ini dulu ⬇️',
  ];

  field.innerHTML = moodBubbles.map((b, i) => `
    <button class="bubble" type="button" data-index="${i}" aria-label="Pecahin bubble ${b.label}" style="animation-delay:${(i * 0.3).toFixed(1)}s">
      <span>${b.emoji}</span>
      <span class="bubble__label">${b.label}</span>
    </button>
  `).join('');

  function popBubble(bubbleEl, silent) {
    if (bubbleEl.classList.contains('is-popped')) return;
    bubbleEl.classList.add('is-popped');
    popped += 1;
    progress.textContent = `${popped} / ${total} kepop 🎈`;
    vibrate(15);

    if (!silent) {
      launchConfetti(bubbleEl, 8);
      spawnUpword(bubbleEl);
    }

    if (popped === total) {
      gameWrap.classList.add('is-done');
      message.textContent = finalMessages[Math.floor(Math.random() * finalMessages.length)];
      if (!silent) launchConfetti(gameWrap, 24);
    }
  }

  field.querySelectorAll('.bubble').forEach((bubbleEl) => {
    bubbleEl.addEventListener('click', () => popBubble(bubbleEl, false));
  });

  skipBtn.addEventListener('click', () => {
    field.querySelectorAll('.bubble').forEach((b) => popBubble(b, true));
  });
}

function spawnUpword(originEl) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = originEl.getBoundingClientRect();
  const word = upliftWords[Math.floor(Math.random() * upliftWords.length)];
  const el = document.createElement('span');
  el.className = 'upword';
  el.textContent = word;
  el.style.left = `${rect.left + rect.width / 2 - 30}px`;
  el.style.top = `${rect.top}px`;
  el.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
  el.style.setProperty('--rot', '0deg');
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

/* ============================================
   Double-tap foto hero buat "like" ala Instagram
   ============================================ */
function setupDoubleTapHeart() {
  const frame = document.getElementById('heroPolaroid').querySelector('.polaroid__frame');
  const heart = document.getElementById('doubleTapHeart');
  let lastTap = 0;

  function triggerLike() {
    heart.classList.remove('is-liked');
    void heart.offsetWidth;
    heart.classList.add('is-liked');
    vibrate(20);
    launchConfetti(frame, 10);
  }

  frame.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 350) triggerLike();
    lastTap = now;
  });
}

/* ============================================
   Toples Semangat — pesan random tiap tap
   ============================================ */
function setupJar() {
  const button = document.getElementById('jarButton');
  const note = document.getElementById('jarNote');
  let lastIndex = -1;

  button.addEventListener('click', () => {
    button.classList.remove('is-shaking');
    void button.offsetWidth;
    button.classList.add('is-shaking');
    vibrate(15);

    let index = Math.floor(Math.random() * jarMessages.length);
    if (jarMessages.length > 1 && index === lastIndex) {
      index = (index + 1) % jarMessages.length;
    }
    lastIndex = index;

    note.classList.remove('is-visible');
    setTimeout(() => {
      note.textContent = jarMessages[index];
      note.classList.add('is-visible');
    }, 150);
  });
}

/* ============================================
   Tap foto timeline buat bounce + hati kecil
   ============================================ */
function setupTimelineTap() {
  document.querySelectorAll('.timeline__photo').forEach((photo) => {
    photo.addEventListener('click', () => {
      photo.classList.remove('is-tapped');
      void photo.offsetWidth;
      photo.classList.add('is-tapped');
      vibrate(10);
      launchConfetti(photo, 6);
    });
  });
}

/* ============================================
   Ambient: jejak hati kecil saat disentuh/digeser
   ============================================ */
function setupTouchHeartTrail() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let last = 0;

  document.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - last < 140) return;
    last = now;

    const el = document.createElement('span');
    el.className = 'touch-heart';
    el.textContent = '💗';
    el.style.left = `${e.clientX - 8}px`;
    el.style.top = `${e.clientY - 8}px`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }, { passive: true });
}

/* ============================================
   Haptic helper (no-op kalau tidak didukung)
   ============================================ */
function vibrate(ms) {
  try {
    if (navigator.vibrate) navigator.vibrate(ms);
  } catch (e) { /* abaikan */ }
}

/* ============================================
   Tombol "kirim pelukan virtual"
   ============================================ */
function setupHugButton() {
  const button = document.getElementById('hugButton');
  button.addEventListener('click', () => {
    launchConfetti(button);
    // Buka WhatsApp dengan nomor dan pesan pra-terisi
    try {
      const phone = '628977774031'; // nomer tanpa +, format internasional (62 untuk Indonesia)
      const text = encodeURIComponent('AKUU UDAHH LIATT WEBNYA SAYANGGKU CINTAKU KASIHKU PACARKU');
      const url = `https://wa.me/${phone}?text=${text}`;
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      console.error('Gagal membuka WhatsApp', e);
    }
  });
}

/* ============================================
   Lightbox
   ============================================ */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox');
  document.getElementById('lightboxImage').src = src;
  document.getElementById('lightboxImage').alt = caption;
  document.getElementById('lightboxCaption').textContent = caption;
  modal.hidden = false;
  document.getElementById('lightboxClose').focus();
}

function closeLightbox() {
  document.getElementById('lightbox').hidden = true;
}

function setupLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxBackdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ============================================
   Auto-play audio on first user interaction
   Many browsers block autoplay; this starts audio
   when the user first clicks or touches the page.
   ============================================ */
function setupAutoPlayMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  // Ensure unmuted and audible defaults
  try { audio.muted = false; } catch (e) {}
  try { audio.volume = 1; } catch (e) {}

  // Debug helpers: log playback events to console for troubleshooting
  audio.addEventListener('error', (ev) => {
    console.error('bgMusic error', ev, audio.error);
  });
  audio.addEventListener('canplay', () => console.log('bgMusic: canplay'));
  audio.addEventListener('playing', () => console.log('bgMusic: playing'));
  audio.addEventListener('pause', () => console.log('bgMusic: paused'));
  audio.addEventListener('volumechange', () => console.log('bgMusic: volume', audio.volume, 'muted', audio.muted));

  // Try to play immediately (may be blocked by browser)
  console.log('bgMusic: attempting immediate play');
  audio.play().then(() => console.log('bgMusic: play() resolved')).catch((err) => console.warn('bgMusic: play() rejected', err));

  // Guarantee play after first user interaction
  function onFirstInteraction() {
    console.log('bgMusic: user interacted — trying play');
    audio.play().then(() => console.log('bgMusic: play() after interaction resolved')).catch((err) => console.warn('bgMusic: play() after interaction rejected', err));
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }

  document.addEventListener('click', onFirstInteraction, { once: true });
  document.addEventListener('touchstart', onFirstInteraction, { once: true });
}

/* ============================================
   Init
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupHeroPhoto();
  setupDoubleTapHeart();
  setupPopGame();
  renderTimeline();
  setupTimelineTap();
  renderGallery();
  setupDayCounter();
  setupJar();
  setupHugButton();
  setupLightbox();
  setupScrollReveal();
  setupTouchHeartTrail();
  setupAutoPlayMusic();
});
