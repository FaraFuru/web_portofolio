<div align="center">
  <img src="https://raw.githubusercontent.com/FaraFuru/web_portofolio/main/assets/img/logorio.webp" alt="Rio Logo" width="80" style="border-radius: 50%;">
  
  <h1>Hi there, I'm Rio Adriano Arifin! 👋</h1>
  <p>
    <strong>Information Systems Student | Web Developer | UI/UX Enthusiast</strong><br>
    <em>Institut Teknologi PLN — Semester 6</em>
  </p>
  <p>
    <a href="https://www.linkedin.com/in/rio-adriano-a-961250330/">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
    <a href="https://www.instagram.com/rio_adriano_a/">
      <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
    </a>
    <a href="https://github.com/FaraFuru">
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
  </p>
</div>

---

## 🚀 About This Project

Welcome to the repository of my personal web portfolio! This website is built from scratch to showcase my journey, skills, and projects as an IT student at Institut Teknologi PLN. It features a custom dark theme, interactive UI elements, a modular CSS architecture, and a dynamic project viewing system — all without any frontend framework.

---

## ✨ Key Features

- **Modern Dark UI** — Styled with native CSS variables and a sleek dark gradient aesthetic, with consistent theming across all components.
- **Async/Await Typewriter Effect** — Built using Vanilla JS with `Promise` and `async/await` to dynamically display roles with realistic typing rhythm, including a pause after spaces and variable delete speed.
- **Interactive Project Switcher** — A DOM-manipulated panel system with slide animation to seamlessly switch between Web Projects and Other Projects (IoT, Design, Games).
- **Smooth Scroll Animations** — Integrated with AOS (Animate On Scroll) library for entrance animations on all sections.
- **Custom Particle Field** — CSS-only animated background on the hero section featuring a grid overlay, shimmer sweep, and floating particles — each using dedicated child elements to avoid `::before`/`::after` conflicts.
- **Custom Cursor Glow** — Radial gradient spotlight that follows the user's cursor using `mousemove` event listener.
- **Scroll Progress Bar** — Fixed top bar that fills based on page scroll percentage.
- **Animated Preloader** — Spinning loader shown before the page is fully rendered.
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile using Bootstrap 5 grid.

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap_5-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
</p>

**External Libraries:**
- [Bootstrap 5.3.2](https://getbootstrap.com/) — Layout and utility classes
- [Bootstrap Icons 1.11.1](https://icons.getbootstrap.com/) — Icon set
- [AOS 2.3.1](https://michalsnik.github.io/aos/) — Animate On Scroll
- [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins) — Typography

> No frontend framework (React, Vue, etc.) was used. Everything is built with pure HTML, CSS, and Vanilla JavaScript.

---

## 📂 Directory Structure

```text
📦 web_portofolio
 ┣ 📂 assets
 ┃ ┣ 📂 docs           # CV_Rio.pdf
 ┃ ┗ 📂 img            # Project thumbnails, logos, skill icons, profile photo
 ┣ 📂 css
 ┃ ┣ 📜 main.css       # Entry point — imports all CSS modules in order
 ┃ ┣ 📜 variables.css  # CSS custom properties (colors, spacing, transitions)
 ┃ ┣ 📜 layout.css     # Navbar, section layout, wave dividers, panel system
 ┃ ┣ 📜 components.css # Cards, buttons, skill dots, stat boxes, forms
 ┃ ┗ 📜 animations.css # Preloader, particle field, floating profile, keyframes
 ┣ 📂 js
 ┃ ┣ 📜 main.js        # Typewriter async/await, project panel switcher, navbar collapse
 ┃ ┗ 📜 ui-effects.js  # Preloader, cursor glow, scroll progress, AOS init, counters
 ┗ 📜 index.html       # Main entry point — single page, all sections
```

---

## 🏗️ CSS Architecture

CSS dipisah menjadi 5 file modular untuk pembagian fungsi:

| File | Tanggung Jawab |
|------|---------------|
| `variables.css` | Semua CSS custom properties — warna, font, transisi |
| `layout.css` | Struktur halaman — navbar, section, wave, panel system |
| `components.css` | Komponen reusable — card, button, skill dots, form |
| `animations.css` | Keyframes dan efek animasi — particle, float, shimmer |
| `main.css` | Import semua file di atas dengan urutan yang benar |


<div align="center">
  <p><em>© 2026 Rio Adriano Arifin. All rights reserved.</em></p>
</div>
