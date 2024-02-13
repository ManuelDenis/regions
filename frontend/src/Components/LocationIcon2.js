import L from 'leaflet';

const svgMarkup2 = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>`;


const locationIcon2 = L.divIcon({
    className: 'my-custom-icon',
    html: svgMarkup2,
    iconSize: L.point(30, 30),
    iconAnchor: [15, 15]
});

export default locationIcon2;
