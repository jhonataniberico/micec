import { removeBusqueda, removeParamsBusqueda } from "./busqueda.storage";
import { removeIdUsuario, removeSessionId } from "./cabecera.storage";
import { removeNombreUsuario } from "./usuario.storage";

const AUTH_CODE = 'AuthCode';
const AUTH_NONCE = 'AuthNonce';
const AUTH_ACCESS = 'AuthAccess';

export function removeSession() {
    // window.localStorage.clear();
    removeAuthCode()
    removeAuthNonce()
    removeBusqueda()
    removeParamsBusqueda()
    removeIdUsuario()
    removeSessionId()
    removeAuthAccess()
    removeNombreUsuario()
}

export function removeAuthCode() {
    window.localStorage.removeItem(AUTH_CODE);
}

export function saveAuthCode(authCode: string) {
    window.localStorage.removeItem(AUTH_CODE);
    window.localStorage.setItem(AUTH_CODE, authCode);
}

export function getAuthCode(): string {
    return localStorage.getItem(AUTH_CODE);
}

export function removeAuthNonce() {
    window.localStorage.removeItem(AUTH_NONCE);
}

export function saveAuthNonce(authNonce: string) {
    window.localStorage.removeItem(AUTH_NONCE);
    window.localStorage.setItem(AUTH_NONCE, authNonce);
}

export function getAuthNonce(): string {
    return localStorage.getItem(AUTH_NONCE);
}

export function removeAuthAccess() {
    window.localStorage.removeItem(AUTH_ACCESS);
}

export function saveAuthAccess(authAccess: string) {
    window.localStorage.removeItem(AUTH_ACCESS);
    window.localStorage.setItem(AUTH_ACCESS, authAccess);
}

export function getAuthAccess(): string {
    return localStorage.getItem(AUTH_ACCESS);
}