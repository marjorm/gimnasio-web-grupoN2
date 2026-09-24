export function marcarError(input, mensaje) {
    input.classList.remove("campo-valido");
    input.classList.add("campo-invalido");

    let contenedor = input.parentElement.querySelector(".mensaje-error");

    if (!contenedor) {
        contenedor = document.createElement("span");
        contenedor.className = "mensaje-error";
        input.parentElement.appendChild(contenedor);
    }

    contenedor.textContent = mensaje;
}

export function marcarValido(input) {
    input.classList.remove("campo-invalido");
    input.classList.add("campo-valido");

    const contenedor = input.parentElement.querySelector(".mensaje-error");

    if (contenedor) {
        contenedor.remove();
    }
}

export function limpiarEstado(input) {
    input.classList.remove("campo-invalido", "campo-valido");

    const contenedor = input.parentElement.querySelector(".mensaje-error");

    if (contenedor) {
        contenedor.remove();
    }
}

export function mostrarToast(mensaje, tipo = "success") {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    toast.className = "toast " + tipo + " visible";

    setTimeout(() => {
        toast.classList.remove("visible");
    }, 4000);
}
