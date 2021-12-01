const BUSQUEDA_KEY = 'mcecBUSQUEDA';
const PARAMS_BUSQUEDA_KEY = 'mcecPARAMS_BUSQUEDA_KEY';

export function removeBusqueda() {
    window.localStorage.removeItem(BUSQUEDA_KEY);
}
export function saveBusqueda(busqueda: string) {
    window.localStorage.removeItem(BUSQUEDA_KEY);
    window.localStorage.setItem(BUSQUEDA_KEY, busqueda);
}
export function getBusqueda(): string {
    return localStorage.getItem(BUSQUEDA_KEY);
}

export function removeParamsBusqueda() {
    window.localStorage.removeItem(PARAMS_BUSQUEDA_KEY);
}
export function saveParamsBusqueda(paramsBusqueda: string) {
    window.localStorage.removeItem(PARAMS_BUSQUEDA_KEY);
    window.localStorage.setItem(PARAMS_BUSQUEDA_KEY, paramsBusqueda);
}
export function getParamsBusqueda(): string {
    return localStorage.getItem(PARAMS_BUSQUEDA_KEY);
}