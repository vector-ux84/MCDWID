const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNav.classList.toggle('open', !isOpen);
});

const addressForm = document.querySelector('.address-form');
const addressInput = document.querySelector('#address');
const addressStatus = document.querySelector('#addressStatus');

const SERVICE_AREA_MATCHES = [
  'garvey',
  'maricopa',
  'w. garvey',
  'west garvey',
  'papago',
  'north maricopa',
  'south maricopa',
];

addressForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!addressInput || !addressStatus) return;

  const address = addressInput.value.trim();

  if (!address) {
    addressStatus.className = 'lookup-status error';
    addressStatus.textContent = 'Please enter a service address to check the district boundary.';
    return;
  }

  const normalized = address.toLowerCase();
  const matchesArea = SERVICE_AREA_MATCHES.some((item) => normalized.includes(item));

  addressStatus.className = matchesArea ? 'lookup-status success' : 'lookup-status error';
  addressStatus.textContent = matchesArea
    ? 'This address appears to be in the Maricopa DWID service area. Call (520) 568-2239 for next steps.'
    : 'This address does not appear to match the Maricopa DWID service area. Please contact the district to confirm your provider.';
});
