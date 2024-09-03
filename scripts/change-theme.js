// Función para aplicar el tema inmediatamente
function applyTheme() {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', storedTheme);
}

// Aplicar el tema inmediatamente
applyTheme();

document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const themeToggler = document.querySelector("#theme-toggler");

    // Función para guardar el tema en Local Storage
    function saveTheme(theme) {
        localStorage.setItem("theme", theme);
        updateThemeToggler(theme);
    }

    // Función para actualizar el icono del toggler
    function updateThemeToggler(theme) {
        themeToggler.innerHTML = theme === 'dark'
            ? '<i class="bi bi-moon-stars-fill"></i>'
            : '<i class="bi bi-sun-fill"></i>';
    }

    // Función para cambiar el tema
    function changeTheme(theme) {
        html.setAttribute("data-bs-theme", theme);
        saveTheme(theme);
    }

    // Inicializar el toggler con el tema actual
    const currentTheme = html.getAttribute("data-bs-theme");
    updateThemeToggler(currentTheme);

    themeToggler.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        changeTheme(newTheme);
    });
});