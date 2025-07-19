export namespace LocalStorage {
    export function get(name: string, defaultValue: string) {
        return localStorage.getItem(name) ?? defaultValue;
    }

    export function set(name: string, value: string | object | number | boolean) {
        if(typeof value === 'number') value = String(value);
        if(typeof value === 'boolean') value = String(value);
        if(typeof value === 'object') value = JSON.stringify(value);
        localStorage.setItem(name, value as string);
    }
}
