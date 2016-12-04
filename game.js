var sceneDiv = document.getElementById("scene"); 
var consoleDiv = document.getElementById("console"); 

var game = {
	load: function() {
		if (storage.version == undefined) {
			storage.init();
		}
		scenes.init();
	},
	printInfo: function(str) {
		var infoDiv = document.createElement('p');
		infoDiv.innerHTML = str;
		sceneDiv.appendChild(infoDiv);
	},
	logInfo: function(str) {
		console.log(str);
	},
	logError: function(str) {
		console.trace(str);
	},
	parseSave: function(save) {
		save.quests;
		save.inventory;
		save.scenes;
	},
};

game.load();
