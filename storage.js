var storage = {
	init: function() {
		localStorage.version = "0.0.1";
		localStorage.scene = "StartCave";
	},
};

storage = new Proxy(storage, {
	set(prop, val) {
		localStorage.setItem(prop, val);
	},
	get(target, prop) {
		return localStorage[prop];
	}
});
