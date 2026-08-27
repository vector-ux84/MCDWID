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

// Zone streets are read off the district's boundary maps (interior + border
// road names), not precise GPS polygons — a photographed/screenshotted map has
// no calibrated coordinate reference to extract exact vertices from. Border
// streets get a "confirm with us" response instead of a confident yes, since
// an address near the edge could fall on either side. Direction prefixes
// (N/W) are only included where they were legible on the source map.
const SERVICE_AREA_ZONES = [
  {
    name: 'the original Maricopa DWID service area',
    borderStreets: ['Green Rd', 'McDavid Rd', 'Garvey Rd'],
    interiorStreets: [],
  },
  {
    name: 'the Saddleback Vista area',
    borderStreets: ['N Pala Rd', 'W Jarrett Rd', 'N Anderson Rd', 'W Steen Rd'],
    interiorStreets: ['N Saddleback Vista Ave', 'W La Brea Rd', 'W Sunrise Dr'],
  },
  {
    name: 'the Valle Escondido area',
    borderStreets: ['W Clayton Rd', 'N Smith Rd', 'W Meadowview Rd', 'N John Wayne Pkwy', 'N Marcopa Rd'],
    interiorStreets: ['W Padilla Rd', 'W Reitz Ranch Rd', 'W Carefree Pl', 'N Lopez Rd', 'N Primrose Ln', 'N Pepper Pl', 'N Cherry Ln'],
  },
];

function findServiceAreaMatch(normalizedAddress) {
  for (const zone of SERVICE_AREA_ZONES) {
    if (zone.interiorStreets.some((street) => normalizedAddress.includes(street.toLowerCase()))) {
      return { zone, onBorder: false };
    }
  }
  for (const zone of SERVICE_AREA_ZONES) {
    if (zone.borderStreets.some((street) => normalizedAddress.includes(street.toLowerCase()))) {
      return { zone, onBorder: true };
    }
  }
  return null;
}

if (streetSuggestions) {
  const allStreets = SERVICE_AREA_ZONES.flatMap((zone) => [...zone.borderStreets, ...zone.interiorStreets]);
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

  if (match && !match.onBorder) {
    addressStatus.className = 'lookup-status success';
    addressStatus.textContent = `This address appears to be in ${match.zone.name}. Call (520) 568-2239 for next steps.`;
  } else if (match && match.onBorder) {
    addressStatus.className = 'lookup-status unsure';
    addressStatus.textContent = `This address is on a boundary street for ${match.zone.name} — it may or may not be inside the district. Please call (520) 568-2239 to confirm.`;
  } else {
    addressStatus.className = 'lookup-status unsure';
    addressStatus.textContent = "We couldn't match that address to a known street in our service area. This tool doesn't cover every street yet — please call (520) 568-2239 to confirm.";
  }
});
