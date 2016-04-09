var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var view = 0; //0 for main menu, 1 for overview, 2 for inside
var button_start;
var money_counter = 0;
var moneyTimer = 0;
var moneyText;

var pictureDay;
var pictureNight;
var timer;
var current = 1;

function preload() {

	// Background Day image
	game.load.image('bullet', '/static-raw/images/bullet.png');

	// House sprite sheet
	game.load.spritesheet('invader', '/static-raw/images/invader32x32x4.png', 32, 32);

	// Main Character
	game.load.image('starfield', '/static-raw/images/starfield.png');


    game.load.image('picture1', '/static-raw/images/day.jpg');
    game.load.image('picture2', '/static-raw/images/night.png');

}

function create() {
    // sprite = game.add.tileSprite(0, 0, 800, 600, 'seacreatures', 'octopus0002');
    // sprite.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
    // sprite.animations.play('swim');

    cursors = game.input.keyboard.createCursorKeys();
	game.physics.startSystem(Phaser.Physics.P2JS);

	//load day and night pics
    pictureDay = game.add.sprite(game.world.centerX, game.world.centerY, 'picture1');
    pictureDay.anchor.setTo(0.5, 0.5);
    pictureDay.scale.setTo(2, 2);

    pictureNight = game.add.sprite(game.world.centerX, game.world.centerY, 'picture2');
    pictureNight.anchor.setTo(0.5, 0.5);
    pictureNight.scale.setTo(2, 2);
    pictureNight.alpha = 0;

    //  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 3 seconds
    timer.add(3000, fadePictures, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
	// Side Bar with Data
    game.add.tileSprite(0, 300, 800, 600, 'bullet');
	moneyString = 'Money : ';
    moneyText = game.add.text(500, 0, moneyString + money_counter, { font: '34px Arial', fill: '#fff' });

    instructionsString =
    	'Have you left the lights on inside? ' +
    	'Click on the household to enter and find out!' +
    	'\nThe window to your right displays your energy production and consumption.' +
    	'\nThis community is brought to you by Solar Crush and the movement towards a sustainable future.';
    instructionsText = game.add.text(0, 500, instructionsString, { font: '15px Arial', fill: '#fff' });

    game.input.onDown.add(click, this);
}

function fadePictures() {

    //  Cross-fade the two pictures
    var tween;

    if (pictureDay.alpha === 1)
    {
        tween = game.add.tween(pictureDay).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(pictureNight).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    }
    else
    {
        game.add.tween(pictureDay).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(pictureNight).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(changePicture, this);

}

function changePicture() {

    if (pictureDay.alpha === 0)
    {
        pictureDay.loadTexture('picture' + current);
    }
    else
    {
        pictureNight.loadTexture('picture' + current);
    }

    current++;

    if (current > 2)
    {
        current = 1;
    }

    //  And set a new TimerEvent to occur after 3 seconds
    timer.add(3000, fadePictures, this);

}

function change_time(){

}
function update(){

    if (pictureDay.alpha === 1)
    {
        money_counter = money_counter + Math.exp(-((timer.duration - 1500)/3000)*((timer.duration-1500)/3000)/0.1)
        money_counter = Math.round((money_counter))
        moneyText.text = moneyString + money_counter;
    }
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

function render() {

    game.debug.text("Time until event: " + timer.duration.toFixed(0), 10, 20);

}