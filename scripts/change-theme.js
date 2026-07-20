/**
 * change-theme.js
 * -----------------------------------------------------------------------
 * Maneja el cambio entre tema claro y oscuro del sitio.
 * Guarda la preferencia del usuario en Local Storage para que se
 * mantenga entre visitas, y actualiza el botón visual (ícono + texto
 * accesible). El atributo aria-pressed del botón NO se toca acá: lo
 * maneja automáticamente Bootstrap gracias a data-bs-toggle="button"
 * en el HTML, que alterna solo ese atributo (y la clase "active") en
 * cada click.
 * -----------------------------------------------------------------------
 */

/**
 * Aplica el tema guardado (o "dark" por defecto) al elemento <html>.
 * Se ejecuta ANTES de que termine de cargar el resto de la página,
 * para evitar el "flash" de tema incorrecto que se vería si esperáramos
 * a DOMContentLoaded (por ejemplo, ver un instante el tema claro antes
 * de que cambie al oscuro guardado).
 */
function applyTheme() {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', storedTheme);
}

// Se llama de inmediato, apenas se lee este archivo (no espera al DOM).
applyTheme();

// El resto de la lógica sí necesita esperar a que el HTML esté
// completamente cargado, porque necesita encontrar el botón #theme-toggler
// en el DOM, y buscarlo antes de que exista devolvería "null".
document.addEventListener("DOMContentLoaded", () => {

    const html = document.documentElement;
    const themeToggler = document.querySelector("#theme-toggler");

    // Actualiza el año del footer automáticamente, para no tener que
    // editarlo a mano cada vez que empieza un año nuevo.
    const copyrightYear = document.querySelector("#copyright-year");
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    /**
     * Guarda el tema elegido en Local Storage, para que persista
     * la próxima vez que el usuario visite el sitio.
     * @param {string} theme - "dark" o "light"
     */
    function saveTheme(theme) {
        localStorage.setItem("theme", theme);
        updateThemeToggler(theme);
    }

    /**
     * Redibuja el contenido interno del botón de tema: el ícono
     * (luna para modo oscuro, sol para modo claro) y el texto
     * accesible que leen los lectores de pantalla.
     *
     * IMPORTANTE: como usamos innerHTML, tenemos que reescribir
     * SIEMPRE el contenido completo del botón (ícono + span), o si no
     * la parte que no incluyamos acá desaparece del botón.
     *
     * No tocamos aria-pressed acá: eso lo maneja Bootstrap solo,
     * mediante data-bs-toggle="button" que está puesto en el HTML.
     *
     * @param {string} theme - Tema actualmente activo: "dark" o "light"
     */
    function updateThemeToggler(theme) {
        const isDark = theme === 'dark';

        const icon = isDark
            ? '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>'
            : '<i class="bi bi-sun-fill" aria-hidden="true"></i>';

        const accessibleText = isDark
            ? 'Cambiar a tema claro'
            : 'Cambiar a tema oscuro';

        themeToggler.innerHTML = `${icon} <span class="visually-hidden">${accessibleText}</span>`;
        themeToggler.setAttribute('aria-pressed', String(!isDark));
    }

    /**
     * Cambia el tema activo: actualiza el atributo data-bs-theme
     * (que es lo que usa Bootstrap para pintar todo el sitio),
     * y dispara el guardado + actualización visual del botón.
     * @param {string} theme - Nuevo tema a aplicar: "dark" o "light"
     */
    function changeTheme(theme) {
        html.setAttribute("data-bs-theme", theme);
        saveTheme(theme);
    }

    // Al cargar la página, sincronizamos el ícono y el texto del botón
    // con el tema que ya se aplicó en applyTheme(). El aria-pressed ya
    // viene bien puesto desde el HTML (aria-pressed="false" = tema
    // oscuro por defecto), así que no hace falta tocarlo acá.
    const currentTheme = html.getAttribute("data-bs-theme");
    updateThemeToggler(currentTheme);

    // Cada click alterna entre "dark" y "light". Bootstrap, en paralelo
    // y sin que nosotros hagamos nada, alterna aria-pressed en el mismo
    // click gracias a data-bs-toggle="button".
    themeToggler.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        changeTheme(newTheme);
    });
});