/**
 * change-theme.js
 * -----------------------------------------------------------------------
 * Maneja el cambio entre tema claro y oscuro del sitio.
 *
 * Responsabilidades:
 *  - Aplicar el tema guardado apenas carga la página (sin flash).
 *  - Guardar la preferencia del usuario en Local Storage.
 *  - Redibujar el botón de tema (ícono + texto accesible + aria-pressed)
 *    cada vez que el tema cambia, sea por click o por carga de página.
 *
 * Nota sobre aria-pressed: el botón tiene data-bs-toggle="button" en el
 * HTML, que es lo que hace que Bootstrap le agregue la clase visual
 * "active" al hacer click. Pero Bootstrap solo reacciona a clicks, nunca
 * sincroniza aria-pressed con el tema real al cargar la página (por
 * ejemplo, si el usuario ya tenía guardado el tema claro de una visita
 * anterior). Por eso updateThemeToggler() lo actualiza siempre a mano,
 * con el valor correcto calculado a partir del tema actual -- así queda
 * bien sincronizado tanto en la carga inicial como después de cada
 * click.
 *
 * El tema oscuro es el default del sitio, por eso en el HTML el botón
 * arranca con aria-pressed="false" (nada "presionado" en el estado por
 * defecto). Siguiendo ese mismo criterio, aria-pressed pasa a "true"
 * cuando el tema activo es el claro (el estado distinto al default).
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
     * la próxima vez que el usuario visite el sitio, y dispara la
     * actualización visual del botón.
     * @param {string} theme - "dark" o "light"
     */
    function saveTheme(theme) {
        localStorage.setItem("theme", theme);
        updateThemeToggler(theme);
    }

    /**
     * Redibuja el botón de tema por completo: ícono (luna para modo
     * oscuro, sol para modo claro), texto accesible para lectores de
     * pantalla, y el atributo aria-pressed.
     *
     * IMPORTANTE: como usamos innerHTML, hay que reescribir SIEMPRE el
     * contenido completo del botón (ícono + span) en la misma llamada.
     * Si en algún cambio futuro se agrega algo más adentro del botón y
     * no se incluye acá, innerHTML lo borra sin avisar.
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

        // "true" cuando el tema claro está activo (el estado distinto
        // al default oscuro), igual que el aria-pressed="false" fijado
        // a mano en el HTML para el estado inicial. Se recalcula
        // siempre desde el tema real, nunca se "alterna" a ciegas, así
        // nunca puede quedar desincronizado.
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

    // Al cargar la página, sincronizamos el ícono, el texto y el
    // aria-pressed del botón con el tema que ya se aplicó en
    // applyTheme() -- sea cual sea, recién llegado o guardado de una
    // visita anterior.
    const currentTheme = html.getAttribute("data-bs-theme");
    updateThemeToggler(currentTheme);

    // Cada click alterna entre "dark" y "light" y vuelve a llamar a
    // updateThemeToggler() por dentro de saveTheme(), manteniendo todo
    // sincronizado.
    themeToggler.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        changeTheme(newTheme);
    });
});
