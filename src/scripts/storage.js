/**
 * Storage interface, which allows to get/set key-value pairs.
 */
class Storage {

    constructor() {
        this.storage = window.localStorage;
    }

    get(key) {
        return this.storage.getItem(key);
    }

    set(key, value) {
        this.storage.setItem(key, value);
    }

    getJSON(key) {
        return JSON.parse(this.get(key));
    }

    setJSON(key, value) {
        this.set(key, JSON.stringify(value));
    }
}

export const storage = new Storage();