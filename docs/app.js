const formulario = document.getElementById("formulario");
const campo = document.getElementById("nota");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const sinNotas = document.getElementById("sin-notas");

let notas = [];

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

function mostrarNotas() {
    lista.replaceChildren();

    sinNotas.hidden = notas.length > 0;

    notas.forEach((nota) => {
        const elemento = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = nota.texto;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "eliminar";
        boton.textContent = "Eliminar";

        boton.setAttribute(
            "aria-label",
            "Eliminar nota: " + nota.texto.slice(0, 60)
        );

        boton.addEventListener("click", () => {
            if (!confirm("¿Deseas eliminar esta nota?")) {
                mostrarMensaje("Eliminación cancelada.");
                return;
            }

            notas = notas.filter((item) => item.id !== nota.id);

            mostrarNotas();
            mostrarMensaje("Nota eliminada.");
        });

        elemento.append(texto, boton);
        lista.append(elemento);
    });
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = campo.value.trim();

    if (!texto) {
        mostrarMensaje("Escribe una nota antes de agregarla.");
        campo.focus();
        return;
    }

    notas.push({
        id: crypto.randomUUID(),
        texto: texto
    });

    mostrarNotas();

    campo.value = "";

    mostrarMensaje("Nota agregada.");

    campo.focus();
});

formulario.addEventListener("reset", (evento) => {
    if (!campo.value) {
        mostrarMensaje("El campo ya está vacío.");
        return;
    }

    if (!confirm("¿Deseas limpiar el texto?")) {
        evento.preventDefault();
        mostrarMensaje("Limpieza cancelada.");
        return;
    }

    mostrarMensaje("Campo limpiado.");
});

mostrarNotas();