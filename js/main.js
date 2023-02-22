function closeMobileMenu() {
  document.getElementById('mobileMenu').style.display = 'none';
}

function openMobileMenu() {
  document.getElementById('mobileMenu').style.display = 'block';
}

// PRELOAD
// Select the preload element
const preload = document.querySelector('.preload');

// Show the preload when the page is loading
// window.addEventListener('load', () => {
//   preload.style.display = 'none';
// });

// Show the preload when a request is sent
// const xhr = new XMLHttpRequest();
// xhr.onloadstart = () => {
//   preload.style.display = 'flex';
// };
// xhr.onloadend = () => {
//   preload.style.display = 'none';
// };
// xhr.open('GET', 'https://your-api-url.com');
// xhr.send();
