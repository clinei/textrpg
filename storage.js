var data = {};

var dataMan =  function() {
	this.hasData = function() {
		return typeof data === "object" && data.hasOwnProperty("version");
	};
	this.init = function() {
		data.version = "0.0.1";
		data.scene = "StartCave";
		data.inventory = {};
		data.journal = [];
	};
	this.store = function() {
		localStorage.data = JSON.stringify(data);
	};
	this.load = function() {
		if (localStorage.data) {
			data = JSON.parse(localStorage.data);
		}
	};
	this.clear = function() {
		data = {};
		localStorage.clear();
		this.init();
	};
	this.addItem = function(item) {
		if (!data.inventory.hasOwnProperty(item.id)) {
			data.inventory[item.id] = 1;
		} else {
			var quantity = data.inventory[item.id];
			data.inventory[item.id] = quantity + 1;
		}
	};
	this.addJournal = function(item) {
		data.journal.push(item);
	};
	
	return this;
}();
