var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(80,150,'loading',{font: '30px Courier', fill: '#fffff'});
		//load all sprites and other assets here
	},
	create: function() {
		game.state.start('menu');
	}
}