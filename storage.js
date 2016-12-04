var storageFuncs = {
	init: function() {
		localStorage.version = "0.0.1";
		localStorage.scene = "StartCave";
	},
};

storage = new Proxy(storageFuncs, {
	set(prop, val) {
		localStorage.setItem(prop, val);
	},
	get(target, prop) {
		var res = storageFuncs[prop];
		if (res) {
			return res;
		} else {
			return localStorage[prop];
		}
	}
});
