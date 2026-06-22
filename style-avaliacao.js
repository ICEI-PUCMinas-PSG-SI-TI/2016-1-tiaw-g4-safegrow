document.addEventListener("DOMContentLoaded", () => {

  const icones = document.querySelector(".icones");
  const nav = document.querySelector(".links");


  icones.innerHTML = `
    <a href="#" aria-label="X/Twitter" class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:38px; height:38px; font-size:18px;">
      <i class="bi-twitter-x"></i>
    </a>
    <a href="#" aria-label="Instagram" class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:38px; height:38px; font-size:18px;">
      <i class="bi-instagram"></i>
    </a>
    <a href="#" aria-label="YouTube" class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:38px; height:38px; font-size:18px;">
      <i class="bi-youtube"></i>
    </a>
    <a href="#" aria-label="LinkedIn" class="btn btn-outline-primary d-flex align-items-center justify-content-center p-0" style="width:38px; height:38px; font-size:18px;">
      <i class="bi-linkedin"></i>
    </a>
  `;

 
  nav.innerHTML = `
    <div class="d-flex flex-column">
      <a href="#" class="text-primary fw-medium text-decoration-none" style="font-size:13px;">Use cases</a>
      <p class="text-secondary" style="font-size:12px;">UI design</p>
    </div>
    <div class="d-flex flex-column">
      <a href="#" class="text-primary fw-medium text-decoration-none" style="font-size:13px;">Explore</a>
      <span class="text-secondary" style="font-size:12px;">Design</span>
    </div>
    <div class="d-flex flex-column">
      <a href="#" class="text-primary fw-medium text-decoration-none" style="font-size:13px;">Resources</a>
      <p class="text-secondary" style="font-size:12px;">Blog</p>
    </div>
  `;

});
