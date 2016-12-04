function Scene() {
	this.desc = "Default scene";
}

function StartCave() {
	this.desc = "A cave.";

	this.start = function() {
		var res = "";

		if (this.data && this.data.visited) {
			res = "You're in the cave.";
		} else {
			res = "You wake up inside a cave";
		}
		game.printInfo(res);

		this.portals();
	};

	this.portals = function() {
		var res = "";
		
		res +='<a onclick="scenes.go(\'StartCaveEntrance\')">Go outside</a>'

		game.printInfo(res);
	};

	this.save = function() {
		return {visited: true};
	};
}

function StartCaveEntrance() {
	this.desc = "Entrance to the first cave.";

	this.start = function() {
		var res = "";
		res += "You are outside the cave.";
		game.printInfo(res);

		this.portals();
	}

	this.portals = function() {
		var res = "";
		res +='<a onclick="scenes.go(\'StartCave\')">Go inside</a>'
		game.printInfo(res);
	}
}

var sceneArr = {
	StartCave: new StartCave(),
	StartCaveEntrance: new StartCaveEntrance(),
};

var scenes = {
	init: function() {
		this.loadData();
		this.loadScene(storage.scene);
	},
	go: function(id) {
		sceneDiv.innerHTML = "";
		this.loadScene(id);
	},
	loadScene: function(id) {
		var currScene = sceneArr[id];
		if (currScene) {
			currScene.start();
		} else {
			game.logError("can't load scene (id: \""+ id +"\")");
		}
	},
	loadData: function() {
		var sceneData = storage.sceneData;
		if (sceneData) {
			sceneData = JSON.parse(sceneData);
			for (var id of Object.keys(sceneData)) {
				sceneArr[id].data = sceneData[id]; 
			}
		}
	},
};