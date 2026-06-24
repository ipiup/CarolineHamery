function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mobile-drawer button[data-page]').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) { page.classList.add('active'); window.scrollTo({ top: 0, behavior: 'instant' }); }
  const btn = document.querySelector('.nav-links button[data-page="' + id + '"]');
  if (btn) btn.classList.add('active');
  const dBtn = document.querySelector('.mobile-drawer button[data-page="' + id + '"]');
  if (dBtn) dBtn.classList.add('active');
  if (id === 'skills') animateSkillBars();
}

/* Navigate from mobile drawer and close it */
function navTo(id) {
  showPage(id);
  closeDrawer();
}

/* Burger menu toggle */
function toggleDrawer() {
  const burger = document.getElementById('burger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const isOpen = burger.classList.toggle('open');
  drawer.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeDrawer() {
  document.getElementById('burger-btn').classList.remove('open');
  document.getElementById('mobile-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

/* Hide nav on scroll down, reveal on scroll up */
let lastScroll = 0;
window.addEventListener('scroll', function() {
  const current = window.scrollY;
  const nav = document.querySelector('nav');
  if (current > lastScroll && current > 80) {
    nav.classList.add('nav-hidden');
    closeDrawer();
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastScroll = current;
}, { passive: true });

/* Close drawer on outside tap */
document.addEventListener('click', function(e) {
  const drawer = document.getElementById('mobile-drawer');
  const burger = document.getElementById('burger-btn');
  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !burger.contains(e.target)) {
    closeDrawer();
  }
});

function animateSkillBars() {
  document.querySelectorAll('#page-skills .skill-fill').forEach(f => {
    f.style.width = f.dataset.width + '%';
  });
}

function sendMail() {
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-msg').value.trim();
  if (!name || !email || !msg) { alert('Please fill all fields.'); return; }
  window.location.href = 'mailto:yourname@institution.fr?subject=Contact from ' + encodeURIComponent(name) + '&body=' + encodeURIComponent(msg) + '%0A%0AFrom: ' + encodeURIComponent(email);
}
