var game = new Phaser.Game(640, 480, 'gameDiv');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('overview', overviewState);
game.state.add('inview', inviewState);
game.state.start('boot');