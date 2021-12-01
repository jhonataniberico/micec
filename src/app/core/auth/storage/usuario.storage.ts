const USUARIO_KEY = 'mcecUSUARIO';
const NOMBRE_USUARIO_KEY = 'mcecNOMBREUSUARIO';

export function removeUsuario() {
    window.localStorage.removeItem(USUARIO_KEY);
}

export function saveUsuario(usuario: any) {
    window.localStorage.removeItem(USUARIO_KEY);
    window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export function getUsuario(): any {
    return JSON.parse(localStorage.getItem(USUARIO_KEY));
}

export function removeNombreUsuario() {
    window.localStorage.removeItem(NOMBRE_USUARIO_KEY);
}

export function saveNombreUsuario(nombre_usuario: any) {
    window.localStorage.removeItem(NOMBRE_USUARIO_KEY);
    window.localStorage.setItem(NOMBRE_USUARIO_KEY, nombre_usuario);
}

export function getNombreUsuario(): any {
    return localStorage.getItem(NOMBRE_USUARIO_KEY);
}