var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var view = 0; //0 for main menu, 1 for overview, 2 for inside
var button_start;

function preload() {

	// Background Day image
	game.load.image('bullet', '/static-raw/images/bullet.png');

	// House sprite sheet
	game.load.spritesheet('invader', '/static-raw/images/invader32x32x4.png', 32, 32);

	// Main Character
	game.load.image('starfield', '/static-raw/images/starfield.png');

}

function create() {

	game.physics.startSystem(Phaser.Physics.P2JS);
	background = game.add.sprite()

	// Side Bar with Data
	moneyString = 'Money : ';
    moneyText = game.add.text(10, 10, moneyString, { font: '34px Arial', fill: '#fff' });

	timeString = 'Time : ';
    timeText = game.add.text(20, 10, moneyString, { font: '34px Arial', fill: '#fff' });

    instructionsString = 'Click on household to enter the home.';
    instructionsText = game.add.text(25, 0, instructionsString, { font: '34px Arial', fill: '#fff' });

    game.input.onDown.add(click, this);
}

function update(){

}

function render(){

}

function createMenu(){

}

function createOverview(){

}

function createInside(){}


function click(pointer) {

	//	You can hitTest against an array of Sprites, an array of Phaser.Physics.P2.Body objects, or don't give anything
	//	in which case it will check every Body in the whole world.

	var bodies = game.physics.p2.hitTest(pointer.position, [ contra, bunny, block, wizball ]);

	if (bodies.length === 0)
	{
		result = "You didn't click a Body";
	}
	else
	{
		result = "You clicked: ";

		for (var i = 0; i < bodies.length; i++)
		{
			//	The bodies that come back are p2.Body objects.
			//	The parent property is a Phaser.Physics.P2.Body which has a property called 'sprite'
			//	This relates to the sprites we created earlier.
			//	The 'key' property is just the texture name, which works well for this demo but you probably need something more robust for an actual game.
			result = result + bodies[i].parent.sprite.key;

			if (i < bodies.length - 1)
			{
				result = result + ', ';
			}
		}

	}

}