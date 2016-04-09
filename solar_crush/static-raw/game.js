var width = 1980;
var height = 1600;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var view = 0; //0 for main menu, 1 for overview, 2 for inside
var button_start;
var money_counter = 0;
var moneyTimer = 0;
var moneyText;
var savingText;
var feeText;
var panel_size = 1.0;

var pictureDay;
var pictureNight;
var timer;
var current = 1;
// click a houes(temp purpose)
var counter = 0;
// go back button
var goBackButton;
var goInsideButton;
var upgradeButton;
var button;
var day_night;
var time_duration = 5000;
var day = true;
var sun_img;
var tween;
var saving_count=0.0;
var fee = 0;
var turned_on;
var graphics;
function preload() {

	game.load.image('bullet', '/static-raw/images/bullet.png');

	// House sprite sheet
	game.load.spritesheet('invader', '/static-raw/images/invader32x32x4.png', 32, 32);

	// Main Character
	game.load.image('starfield', '/static-raw/images/starfield.png');


    // Background Day image
    game.load.image('picture1', '/static-raw/images/day.jpg');
    game.load.image('picture2', '/static-raw/images/night.png');
    game.load.image('house', 'static-raw/images/512x_House_1.png');
    game.load.image('house2', 'static-raw/images/512x_House_2.png');
    game.load.image('house3', 'static-raw/images/512x_House_3.png');
    game.load.image('house_solar', 'static-raw/images/512x_House_1_solar_upgrade.png');
    game.load.image('house2_solar', 'static-raw/images/512x_House_2_solar_upgrade.png');
    game.load.image('house3_solar', 'static-raw/images/512x_House_3_solar_upgrade.png');

    // Load a house
    game.load.image('house', '/static-raw/images/simple-red-house-hi.png');
    game.load.image('house_inside', '/static-raw/images/cartoon-house-hi-inside.png');
    
    // Go back button
    game.load.image('goback_button', '/static-raw/images/back-button-hi.png');

    //sun
    game.load.image('sun', 'static-raw/images/Sun.png');
    // goinside button
    game.load.image('goinside_button', '/static-raw/images/enter-now-button.png');
    
    // upgrade button
    game.load.image('upgrade_button', '/static-raw/images/big_upgrade_button.png');

    // currency
    game.load.image('currency', '/static-raw/images/light.png');

}

function create() {
    // sprite = game.add.tileSprite(0, 0, 800, 600, 'seacreatures', 'octopus0002');
    // sprite.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
    // sprite.animations.play('swim');
    // day_night = game.add.sprite(400, 300, 'picture1');
    // day_night.anchor.setTo(0.5, 0.5);
    cursors = game.input.keyboard.createCursorKeys();
	game.physics.startSystem(Phaser.Physics.P2JS);

    sun_img = game.add.sprite(width, -300, 'sun');

    game.physics.enable(sun_img, Phaser.Physics.ARCADE);

    sun_img.body.velocity.x=-600;

	//load day and night pics
    // pictureDay = game.add.sprite(game.world.centerX, game.world.centerY, 'picture1');
    // pictureDay.anchor.setTo(0.5, 0.5);
    // pictureDay.scale.setTo(2, 2);

    // pictureNight = game.add.sprite(game.world.centerX, game.world.centerY, 'picture2');
    // pictureNight.anchor.setTo(0.5, 0.5);
    // pictureNight.scale.setTo(2, 2);
    // pictureNight.alpha = 0;

    //  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 3 seconds
    timer.add(time_duration, fadePictures, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
	// Side Bar with Data
    currency = game.add.sprite(width -180, 0, 'currency');
    currency.scale.x = 0.4;
    currency.scale.y = 0.4;
	moneyString = ' X ';
    moneyText = game.add.text(width -140, 5, moneyString + money_counter, { font: '32px Arial', fill: '#fff' });

    savingText = game.add.text(width-400, 5, "Saving:" + saving_count, { font: '32px Arial', fill: '#fff' });
    feeText = game.add.text(width-550, 5, "Fee:" + fee, { font: '32px Arial', fill: '#fff' });

	//timeString = 'Time : ';
    //timeText = game.add.text(20, 10, moneyString, { font: '34px Arial', fill: '#fff' });
    text = game.add.text(250, 16, '', { fill: '#ffffff' });

    // instructionsString =
    // 	'Have you left the lights on inside? ' +
    // 	'Click on the household to enter and find out!' +
    // 	'\nThe window to your right displays your energy production and consumption.' +
    // 	'\nThis community is brought to you by Solar Crush and the movement towards a sustainable future.';
    // instructionsText = game.add.text(0, 500, instructionsString, { font: '15px Arial', fill: '#fff' });

    // house image
    var image = game.add.sprite(game.world.centerX, game.world.centerY, 'house');

    //  Moves the image anchor to the middle, so it centers inside the game properly
    image.anchor.set(0.5);

    //  Enables all kind of input actions on this image (click, etc)
    image.inputEnabled = true;

    text = game.add.text(250, 16, '', { fill: '#ffffff' });

    image.events.onInputDown.add(clickHouse, this);
    
    game.time.events.loop(Phaser.Timer.SECOND, saving, this);
}

function saving(){
    /*saving_count ++;
    console.log(saving_count);*/
    fee = fee + (2 - (panel_size -1)) * 1;
    saving_count = saving_count + (panel_size -1) * 1;
    money_counter = money_counter - fee;
    //saving_count = saving_count.toFixed(2);
    saving_count = Math.round(saving_count * 100) / 100;
    fee = Math.round(fee * 100) / 100;
    money_counter = Math.round(money_counter * 100) / 100;
    console.log("fee:"+fee);
    console.log("saving_count:"+saving_count);
    console.log("money_counter:"+money_counter);
}
function clickHouse () {

    counter++;
    //text.text = "You clicked " + counter + " times!";


    //add an go inside button
    goInsideButton = game.add.button(game.world.centerX + 95, 160, 'goinside_button', actionOnloadInsideButton, this, 2, 1, 0);
    goInsideButton.anchor.set(0.5);
    goInsideButton.scale.x = 0.4;
    goInsideButton.scale.y = 0.4;

    //add an upgrade button
    upgradeButton = game.add.button(game.world.centerX - 95, 157, 'upgrade_button', actionOnClickUpgradeButton, this, 2, 1, 0);
    upgradeButton.anchor.set(0.5);
    upgradeButton.scale.x = 0.7;
    upgradeButton.scale.y = 0.7;

    //loadInside();
}
function actionOnClickUpgradeButton(){
    console.log("actionOnClickUpgradeButton");
    if (money_counter >= panel_size*100){
    	money_counter = money_counter - panel_size*100;
    	panel_size = panel_size + 1.0;
    }

    upgradeButton.visible =! upgradeButton.visible;
    goInsideButton.visible =! goInsideButton.visible;
}
function actionOnloadInsideButton(){
    // loading house inside sprits
    // load house inside
    timer.pause();
    game.world.removeAll();
    currency = game.add.sprite(1700, 0, 'currency');
    moneyString = ' X ';
    moneyText = game.add.text(1800, 50, moneyString + money_counter, { font: '32px Arial', fill: '#fff' });
    houseInside = game.add.sprite(game.world.centerX-600, 0, 'house_inside');
    houseInside.scale.setTo(2,2.5);

    //add an go back button
    goBackButton = game.add.button(200, 200, 'goback_button', actionOnClickExitButton, this, 3, 4, 0);
    goBackButton.anchor.set(0.5);
    goBackButton.scale.x = 0.5;
    goBackButton.scale.y = 0.5;

    graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(1400,1100, 100);

}
function actionOnClickExitButton () {
    console.log("goback");
    //console.log('houseInside.visible');
    game.world.removeAll();
    create();
    timer.resume()

}
function fadePictures() {

    //  Cross-fade the two pictures
    // var tween;
    if (timer.duration == 0  && day){
        day = false;
    }
    else {
        day = true;
        sun_img.x = width;
    }

    if (timer.duration == 0){
        changePicture();
    }
    // if (pictureDay.alpha === 1)
    // {
    //     tween = game.add.tween(pictureDay).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    //     game.add.tween(pictureNight).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    // }
    // else
    // {
    //     game.add.tween(pictureDay).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    //     tween = game.add.tween(pictureNight).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    // }

    // //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    // tween.onComplete.add(changePicture, this);

}

function changePicture() {

    // if (pictureDay.alpha === 0)
    // {
    //     pictureDay.loadTexture('picture' + current);
    // }
    // else
    // {
    //     pictureNight.loadTexture('picture' + current);
    // }

    // current++;

    // if (current > 2)
    // {
    //     current = 1;
    // }

    //  And set a new TimerEvent to occur after 3 seconds
    timer.add(time_duration, fadePictures, this);
    if(day){
        sun_img.x = 2200;
    }


}
function change_time(){

}
function update(){

    if (day && timer.paused == false)
    {
        money_counter = money_counter +
        	panel_size * Math.exp(
        		-((timer.duration - time_duration/2)/time_duration)*
        		((timer.duration-time_duration/2)/time_duration)/0.2);
        money_counter = Math.round((money_counter));
        moneyText.text = moneyString + money_counter;
        feeText.text = "Fee: $" + fee;
        savingText.text = "Saving: $" + saving_count;
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