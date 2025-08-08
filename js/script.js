// script.js
// Aplica tema y gestiona el cambio de logo con el switch

function inicializarTema() {
  const toggle = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo-img");

  // Detectar si estamos en carpeta /pages/
  const pathLevel = window.location.pathname.split("/").filter(Boolean).length;
  const prefix = pathLevel > 1 ? "/JauConsulting/" : "";

  if (toggle) {
    toggle.checked = document.documentElement.classList.contains("light");

    toggle.addEventListener("change", () => {
      const isLight = toggle.checked;
      document.documentElement.classList.toggle("light", isLight);
      document.documentElement.classList.toggle("dark", !isLight);
      localStorage.setItem("theme", isLight ? "light" : "dark");

      if (logo) {



        logo.src = isLight
  ? "/JauConsulting/img/LogoJauPNG - Negro.PNG"
  : "/JauConsulting/img/LogoJauPNG - Blanco.png";



      }
    });
  }

  if (logo) {
    logo.src = document.documentElement.classList.contains("light")
  ? "/JauConsulting/img/LogoJauPNG - Negro.PNG"
  : "/JauConsulting/img/LogoJauPNG - Blanco.png";
  }
}

/*------------------------------------ HEADER ------------------------------*/
// ✅ Resalta el link activo según la página actual
function resaltarLinkActivo() {
  // Obtener la ruta actual (nombre del archivo actual)
  const path = window.location.pathname.split("/").pop();

  // Seleccionar todos los links del menú principal y sidebar
  const links = document.querySelectorAll(".nav-links a, .sidebar-links a");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.endsWith(path)) {
      link.classList.add("active-link");
    }
  });
}

// ✅ Cuando el DOM está listo, cargamos header y footer
window.addEventListener("DOMContentLoaded", () => {
  // Cargar header dinámico
  fetch("/JauConsulting/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;
      inicializarHeader(); // tu función ya existente
      resaltarLinkActivo(); // 👉 aquí aplicamos la clase activa
    });

  // Cargar footer dinámico
  fetch("/JauConsulting/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    });
});





// Función para cerrar sidebar si el tamaño es grande
function cerrarSidebarEnPantallasGrandes() {
  const sidebarEl = document.querySelector('.sidebar');
  if (sidebarEl && window.innerWidth > 1024) {
    sidebarEl.classList.remove('active');
  }
}
window.addEventListener('resize', cerrarSidebarEnPantallasGrandes);

window.addEventListener('load', cerrarSidebarEnPantallasGrandes);








// 👇 FUNCION para enlazar los botones del header recién cargado
function inicializarHeader() {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const logoImg = document.getElementById("logo-img");
  const html = document.documentElement;

  // 🎛️ Abrir y cerrar el menú lateral
  if (menuToggle && sidebar && closeBtn) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  } else {
    console.error("🔴 Elementos no encontrados: menu-toggle, sidebar o close-btn.");
  }

  // 🌗 Tema y logo
  if (themeToggle && logoImg) {
    const updateLogo = theme => {
      logoImg.src = theme === "light"
        ? "/JauConsulting/img/LogoJauPNG - Negro.PNG"
        : "/JauConsulting/img/LogoJauPNG - Blanco.PNG";
    };

    const savedTheme = localStorage.getItem("theme") || "dark";
    html.classList.remove("light", "dark");
    html.classList.add(savedTheme);
    themeToggle.checked = savedTheme === "light";
    updateLogo(savedTheme);

    themeToggle.addEventListener("change", () => {
      const theme = themeToggle.checked ? "light" : "dark";
      html.classList.remove("light", "dark");
      html.classList.add(theme);
      localStorage.setItem("theme", theme);
      updateLogo(theme);
    });
  }

  const overlay = document.querySelector('.overlay');
if (overlay) {
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
}

}













/*------------------------------------ PAGINA EXPERIENCIA ------------------------------*/
// 🎯 Cambiar de tab al hacer clic
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.style.display = "none");

      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      document.getElementById(target).style.display = "block";
    });
  });
});

/*------------------------------------ PAGINA WORK ------------------------------*/
// 🔘 Lógica estática para el botón "Show More"
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".btn-show-more");
  if (button) {
    button.addEventListener("click", () => {
      alert("Aquí podrían cargarse más proyectos. Funcionalidad futura 😉");
    });
  }
});


/*------------------------------------ FOOTER ------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  // Actualizar año dinámicamente
  const yearSpan = document.getElementById("year");
  yearSpan.textContent = new Date().getFullYear();

  // Simular contador de visitas (ficticio)
  const visitorSpan = document.getElementById("visitor-count");
  const startDate = new Date("2025-01-01");
  const today = new Date();
  const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  // Generar suma aleatoria por día entre 1 y 10
  let total = 1000;
  for (let i = 0; i < daysPassed; i++) {
    total += Math.floor(Math.random() * 10) + 1;
  }

  visitorSpan.textContent = total.toLocaleString("es-PE");
});
