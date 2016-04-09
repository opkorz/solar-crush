var menuState = {
	create: function() {
		var nameLabel = game.add.text(80, 80, 'Solar Crush', {font: '50px Arial', fill: '#ffffff'});
		var startLabel = game.add.text(80, game.world.height-80, 'Press ENTER', {font: '25px Arial', fill: '#ffffff'});
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.start,this);
	},
	start: function() {
		game.state.start('overview');
	}
};
		
		