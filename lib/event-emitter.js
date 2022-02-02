export default class EventEmitter {
	constructor() {
		this.listeners = {};
	}

	listen(name, callback) {
		if (!this.listeners[name]) {
			this.listeners[name] = [];
		}

		this.listeners[name].push(callback);
	}

	emit(name, ...args) {
		if (!this.listeners[name]) {
			return;
		}

		this.listeners[name].forEach((listener) => {
			if (listener.name === name) {
				listener.callback(...args);
			}
		});
	}
}
