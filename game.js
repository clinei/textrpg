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
	clearJournal: function() {
		journalDiv.innerHTML = "";
	},
	addJournalView: function(str) {
		if (journalDiv.childNodes.length >= 1) {
			journalDiv.appendChild(document.createElement('br'));
		}
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
	reset: function() {
		dataMan.clear();
		sceneMan.init();
		this.clearJournal();
	}
};

game.load();
