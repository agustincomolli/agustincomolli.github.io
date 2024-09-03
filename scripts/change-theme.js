document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    const themeToggler = document.querySelector("#theme-toggler");
    const storedTheme = localStorage.getItem("theme");
    const storedIconTheme = localStorage.getItem("iconTheme");

    if (storedTheme) {
        html.setAttribute("data-bs-theme", storedTheme);
        themeToggler.innerHTML = storedIconTheme;
    }

    // Función para guardar el tema en Local Storage
    function saveTheme(theme) {
        localStorage.setItem("theme", theme);
        if (theme == "dark") {
            saveIconTheme('<i class="bi bi-moon-stars-fill"></i>');
        } else {
            saveIconTheme('<i class="bi bi-sun-fill"></i>');
        };
        themeToggler.innerHTML = localStorage.getItem("iconTheme");
};

    // Función para guardar el icono del tema en Local Storage
    function saveIconTheme(iconTheme) {
        localStorage.setItem("iconTheme", iconTheme);
    };

    // Función para cambiar el tema
    function changeTheme(theme) {
        html.setAttribute("data-bs-theme", theme);
        saveTheme(theme);
    };

    themeToggler.addEventListener("click", () => {
        // Alterna entre un tema oscuro y uno claro.
        const theme = html.attributes.getNamedItem("data-bs-theme");
        if (theme && theme.value === "dark") {
            changeTheme("light");
        } else {
            changeTheme("dark");
        };
    })
})