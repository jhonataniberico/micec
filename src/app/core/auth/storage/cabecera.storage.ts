const IDUSUARIO_KEY = 'mcecIDUSUARIO';

export function removeIdUsuario() {
    window.localStorage.removeItem(IDUSUARIO_KEY);
}
export function saveIdUsuario(idUsuario: string) {
    window.localStorage.removeItem(IDUSUARIO_KEY);
    window.localStorage.setItem(IDUSUARIO_KEY, idUsuario);
}
export function getIdUsuario(): string {
    return localStorage.getItem(IDUSUARIO_KEY);
}


const SESSIONID_KEY = 'mcecSESSIONID';

export function removeSessionId() {
    window.localStorage.removeItem(SESSIONID_KEY);
}
export function saveSessionId(SessionId: string) {
    window.localStorage.removeItem(SESSIONID_KEY);
    window.localStorage.setItem(SESSIONID_KEY, SessionId);
}
export function getSessionId(): string {
    return localStorage.getItem(SESSIONID_KEY);
}


const IDPROFESIONALH_KEY = 'mcecIDPROFESIONALH';

export function removeIdProfesionalH() {
    window.localStorage.removeItem(IDPROFESIONALH_KEY);
}
export function saveIdProfesionalH(IdProfesionalH: string) {
    window.localStorage.removeItem(IDPROFESIONALH_KEY);
    window.localStorage.setItem(IDPROFESIONALH_KEY, IdProfesionalH);
}
export function getIdProfesionalH(): string {
    return localStorage.getItem(IDPROFESIONALH_KEY);
}