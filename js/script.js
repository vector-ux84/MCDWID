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
const streetSuggestions = document.querySelector('#service-area-streets');

// Street lists pulled directly from the district's own reference document,
// "MDWID ROADS AND STREETS WE COVER PDF" (maricopadwid.org, created by
// Maricopa Consolidated, 2025-09-16) — an authoritative source, not the
// photo-derived guesswork this replaced on 2026-08-26. Zone codes (MDWID/
// NSVDWID/VEDWID) and names match the district's own usage.
const SERVICE_AREA_ZONES = [
  {
    name: 'the Heritage District',
    streets: ['Burkett Ave', 'W Cesar Chavez St', 'Cole Dr', 'Condrey Ave', 'Dallas Smith Ln', 'Ed Green Ln', 'Edison Rd', 'Edwards Ave', 'Edwards Cir', 'Fred Cole Ln', 'Garvey Ave', 'Green Rd', 'Hamilton Ave', 'Hathaway Ave', 'W Heritage Ln', 'Honeycutt Ave', 'Honeycutt Rd', 'John Wayne Pkwy-347', 'Jusin Dr', 'Lexington Ave', 'Loma Dr', 'Madison Ave', 'N Main St', 'W Mercado St', 'McDavid Rd', 'Pershing St', 'Plain View St', 'Roosevelt Ave'],
  },
  {
    name: 'New Saddleback Vista',
    streets: ['Anderson Rd', 'Jarrett Rd', 'Kyrene Rd', 'La Brea Rd', 'Pala Rd', 'Robinette Ln', 'Saddleback Vista Ave', 'Sapphire', 'Steen Rd', 'Sunrise Dr', 'W Stagecoach Ln', 'Taft Ave', 'Tapps Ave', 'Wilson Ave'],
  },
  {
    name: 'Valle Escondido',
    streets: ['Carefree Pl', 'Cherry Ln', 'Clayton Rd', 'Desert Park', 'John Wayne Pkwy', 'Lopez Rd', 'Meadowview Rd', 'Padilla St', 'Pepper Pl', 'Primrose Ln', 'Reitz Ranch Rd'],
  },
];

function findServiceAreaMatch(normalizedAddress) {
  for (const zone of SERVICE_AREA_ZONES) {
    if (zone.streets.some((street) => normalizedAddress.includes(street.toLowerCase()))) {
      return { zone };
    }
  }
  return null;
}

if (streetSuggestions) {
  const allStreets = SERVICE_AREA_ZONES.flatMap((zone) => zone.streets);
  const uniqueStreets = [...new Set(allStreets)].sort();
  streetSuggestions.innerHTML = uniqueStreets.map((street) => `<option value="${street}">`).join('');
}

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
  const match = findServiceAreaMatch(normalized);

  if (match) {
    addressStatus.className = 'lookup-status success';
    addressStatus.textContent = `This address appears to be in ${match.zone.name}. Call (520) 568-2239 for next steps.`;
  } else {
    addressStatus.className = 'lookup-status unsure';
    addressStatus.textContent = "We couldn't match that address to a street in our service area. Please call (520) 568-2239 to confirm — this list may not include every street.";
  }
});
