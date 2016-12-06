var sceneDiv = document.getElementById("scene"); 
var journalDiv = document.getElementById("journal");

var game = {
	load: function() {
		dataMan.load();
		if (!dataMan.hasData()) {
			dataMan.init();
		}
		sceneMan.init();
		this.loadJournal();
	},
	printInfo: function(str) {
		var infoDiv = document.createElement('p');
		infoDiv.innerHTML = str;
		sceneDiv.appendChild(infoDiv);
	},
	addScene: function(elem) {
		sceneDiv.appendChild(elem);
	},
	addJournal: function(str) {
		dataMan.addJournal(str);
		this.addJournalView(str);
	},
	addJournalView: function(str) {
		journalDiv.appendChild(document.createTextNode(str));
	},
	loadJournal: function() {
		for (item of data.journal) {
			this.addJournalView(item);
		}
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
