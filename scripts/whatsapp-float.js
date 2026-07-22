/**
 * whatsapp-float.js
 * -----------------------------------------------------------------------
 * El botón flotante de WhatsApp usa position: fixed, así que se queda
 * siempre en la misma esquina de la pantalla sin importar cuánto se
 * scrollee. El problema: cuando el usuario llega al final de la página,
 * esa esquina coincide con los íconos de redes del footer, y el botón
 * los tapa.
 *
 * La solución es ocultar el botón automáticamente apenas el footer
 * entra en pantalla, y volver a mostrarlo cuando el usuario scrollea
 * para arriba y el footer deja de verse.
 *
 * Para detectar "¿este elemento está entrando o saliendo de la
 * pantalla?" se usa un IntersectionObserver: es una herramienta del
 * navegador pensada justo para este caso. Se le indica un elemento a
 * vigilar (acá, el <footer>) y una función que se ejecuta sola cada vez
 * que ese elemento entra o sale del área visible. Es más prolijo y más
 * liviano para el navegador que la alternativa antigua de escuchar el
 * evento "scroll" y calcular posiciones a mano en cada pixel scrolleado.
 * -----------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {

    const whatsappFloat = document.querySelector(".whatsapp-float");
    const footer = document.querySelector("footer");

    // Por las dudas: si alguna página no tiene alguno de los dos
    // elementos, no seguimos (evita un error en la consola).
    if (!whatsappFloat || !footer) {
        return;
    }

    /**
     * Se ejecuta cada vez que el footer entra o sale de la pantalla.
     * "entries" es una lista de elementos vigilados que cambiaron de
     * estado -- acá vigilamos uno solo (el footer), pero el
     * IntersectionObserver siempre entrega una lista, por eso el
     * forEach.
     * @param {IntersectionObserverEntry[]} entries
     */
    function handleFooterVisibility(entries) {
        entries.forEach((entry) => {
            // entry.isIntersecting es "true" cuando el footer está
            // total o parcialmente visible en la pantalla.
            whatsappFloat.classList.toggle("whatsapp-float--hidden", entry.isIntersecting);
        });
    }

    const footerObserver = new IntersectionObserver(handleFooterVisibility);
    footerObserver.observe(footer);
});
