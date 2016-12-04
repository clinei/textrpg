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

		this.data = {
			visited: true
		};

		game.printInfo(res);

		this.portals();
	};

	this.portals = function() {
		var res = [];
		
		res.push({
			target: "StartCaveEntrance",
			text: "Go outside"
		});

		scenes.showPortals(res);
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
		var res = [];

		res.push({
			target: "StartCave",
			text: "Go inside"
		});

		scenes.showPortals(res);
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
		this.saveData();
		sceneDiv.innerHTML = "";
		this.loadScene(id);
		storage.scene = id;
	},
	showPortals: function(portals) {
		var res = "";

		for (portal of portals) {
			res += '<a class="link" onclick="scenes.go(\''+ portal.target +'\')">'+ portal.text +'</a>';
		}

		game.printInfo(res);
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
	saveData: function() {
		var sceneData = {};
		for (var key in sceneArr) {
			var scene = sceneArr[key];
			if (Object.hasOwnProperty.call(scene, "save")) {
				sceneData[key] = scene.save();
			}
		}
		storage.sceneData = JSON.stringify(sceneData);
	}
};