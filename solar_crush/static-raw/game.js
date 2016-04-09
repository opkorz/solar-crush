var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var view = 0; //0 for main menu, 1 for overview, 2 for inside
var button_start;

function preload() {
	game.load.image('button', 'images/players.png');
}

function create() {
	game.stage.backgroundColor = '#182d3b';
	button_start = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
}

function update(){

}

function render(){

}

function createMenu(){

}

function createOverview(){

}

function createInside(){

}