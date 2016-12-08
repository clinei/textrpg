function removeElem(elem) {
	elem.parentNode.removeChild(elem);
}

var scenes = {};
scenes.StartCave = function() {
	this.desc = "A cave.";
	this.data = {};

	this.start = function() {
		var res = "";

		if (this.data.visited) {
			res = "You're in the cave.";
		} else {
			res = "You wake up inside a cave.";
		}

		this.data.visited = true;
		
		return res;
	};

	this.portals = function() {
		var res = [];
		
		res.push({
			target: "Battle",
			text: "Go outside"
		});
 		
		res.push({
			target: "StartCaveDeeper",
			text: "Go deeper"
		});
		
		return res;
	};
}

scenes.StartCaveDeeper = function() {
	this.desc = "Deeper in the first cave.";
	this.data = {};

	this.start = function() {
		var res = "";
		res += "You are deeper in the cave.";
		return res;
	};

	this.items = function() {
		var res = [];

		if (!(this.data.swordTaken)) {
			res.push({
				desc: "An old, rusty sword lies on the ground.",
				text: "Take the sword",
				scene: this,
				action: function(e) {
					dataMan.addItem(items.rustySword);
					data.weapon = "rustySword";
					this.scene.data.swordTaken = true;
					sceneMan.saveData();
					game.addJournal("You took the sword");
					dataMan.store();
					removeElem(this);
				}
			});
		}

		return res;
	};	

	this.portals = function() {
		var res = [];

		res.push({
			target: "StartCave",
			text: "Go toward the cave entrance"
		});

		return res;
	};
}

scenes.StartCaveEntrance = function() {
	this.desc = "Entrance to the first cave.";

	this.start = function() {
		var res = "";
		res += "You are outside the cave.";
		return res;
	}

	this.portals = function() {
		var res = [];

		res.push({
			target: "StartCave",
			text: "Go inside"
		});
		
		return res;
	}
}

scenes.Battle = function() {
	var that = this;
	this.data = {};
	this.attackButton = null;
	
	this.start = function() {
		var res = "";
		res  +=  "Battle start!";
		
		this.data.monster = {
			health: 3,
			hit: function(damage) {
				if (this.health <= damage) {
					game.addJournal("You killed a monster!");
					that.end();
				} else {
					this.health -= damage;
				}
			}
		};
		
		return res;
	};
	
	this.end = function() {
		removeElem(this.attackButton);
		this.attackButton = null;
	};
	
	this.items = function() {
		var res = [];
		
		res.push({
			text: "Attack!",
			scene: this,
			action: function() {
				this.scene.attackButton = this;
				if (data.weapon) {
					this.scene.data.monster.hit(items[data.weapon].damage);
				} else {
					this.scene.data.monster.hit(items.hands.damage);
				}
			}
		});
		
		return res;
	};
};

var sceneMan = {
	init: function() {
		this.loaded = {};
		this.loadScenes();
		this.loadData();
		this.go(data.scene);
	},
	loaded: {},
	loadScenes: function() {
		for (key of Object.keys(scenes)) {
			this.loaded[key] = new scenes[key];
		}
	},
	portalHandler: function() {
		sceneMan.go(this.target);
	},
	go: function(id) {
		sceneDiv.innerHTML = "";
		this.loadScene(id);
		data.scene = id;
		this.saveData();
		dataMan.store();
	},
	showPortals: function(portals) {
		var portalList = document.createElement('div');

		for (portal of portals) {
			var portalEl = document.createElement('p');
			portalEl.className = "link";
			portalEl.target = portal.target;
			portalEl.addEventListener("click", this.portalHandler);
			portalEl.innerHTML = portal.text;
			portalList.appendChild(portalEl);
		}

		game.addScene(portalList);
	},
	showItems: function(items) {
		var itemList = document.createElement('p');

		for (item of items) {
			var itemEl = document.createElement('a');
			itemEl.scene = item.scene;
			itemEl.className = "link";
			itemEl.addEventListener("click", item.action);
			itemEl.innerHTML = item.text;
			if (item.desc) {
				itemList.appendChild(document.createTextNode(item.desc +" "));
			}
			itemList.appendChild(itemEl);
		}

		game.addScene(itemList);
	},
	loadScene: function(id) {
		var currScene = this.loaded[id];
		if (currScene) {
			if (currScene.start) {
				game.printInfo(currScene.start());
			}
			if (currScene.items) {
				this.showItems(currScene.items());
			}
			if (currScene.portals) {
				this.showPortals(currScene.portals());
			}
		} else {
			game.logError("can't load scene (id: \""+ id +"\")");
		}
	},
	loadData: function() {
		var sceneData = data.sceneData;
		if (sceneData) {
			for (var id of Object.keys(sceneData)) {
				this.loaded[id].data = sceneData[id]; 
			}
		}
	},
	saveData: function() {
		var sceneData = {};
		for (key of Object.keys(this.loaded)) {
			var scene = this.loaded[key];
			if (Object.hasOwnProperty.call(scene, "data")) {
				sceneData[key] = scene.data;
			}
		}
		data.sceneData = sceneData;
	}
};
