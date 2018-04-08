var leftBtn = $('#slideLeft');
var rightBtn = $('#slideRight');
var charBox = $('.box');
var chooseHero = $('#pickHero'); // button
var chooseEnemy = $('#pickEnemy'); // button
var battleScreen = $('.battleScreen');
var battleTime; // var for timer to delay battle after choosing characters
var attackTime; // var for timer to delay comp attack
var victoryTime; // var for timer to delay character selector appearing
// Setting var for current slide so I can stop user from scrolling past available options
var currentSlide = 3;
// Initializing an empty array that I will push the chosen characters charNum to block user from choosing the same enemy twice; also blocks user from choosing to battle themselves
var chosenCharacters = [];
var userChar, enemyChar;
var choosingHero = true;
var choosingEnemy = true;
var wins = 0;
// Object holding all of the characters
var characters = {
    luke: {
        value: 'luke',
        name: 'Luke Skywalker',
        bio: 'A Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known.The location of the famed Jedi master is one of the galaxy’s greatest mysteries.',
        hp: 115,
        attack: 15,
        counter: 10,
        charNum: 1,
        display: '<div class="charImg" id="charImage-luke"></div><div id="charName">Luke Skywalker</div><div id="charBio-luke"><p class="bio" id="bio-luke"></p></div><div id="charStats"><ul><h3 class="stats">Stats:</h3><li id="charHp-luke"></li><li id="attackPwr-luke"></li><li id="cAttackPwr-luke"></li></ul></div>',
        battleDisp: '<div class="charImg" id="charImage-luke"></div>',
    },
    obi: {
        value: 'obi',
        name: 'Obi-Wan Kenobi',
        bio: 'A legendary Jedi Master, a noble man and gifted in the ways of the Force. He trained Anakin Skywalker, served as a general in the Republic Army during the Clone Wars, and guided Luke Skywalker as a mentor.',
        hp: 130,
        attack: 10,
        counter: 15,
        charNum: 2,
        display: '<div class="charImg" id="charImage-obi"></div><div id="charName">Obi-Wan Kenobi</div><div id="charBio-obi"><p class="bio" id="bio-obi"></p></div><div id="charStats"><ul><h3 class="stats">Stats:</h3><li id="charHp-obi"></li><li id="attackPwr-obi"></li><li id="cAttackPwr-obi"></li></ul></div>',
        battleDisp: '<div class="charImg" id="charImage-obi"></div>',
    },
    kylo: {
        value: 'kylo',
        name: 'Kylo Ren',
        bio: 'The son of Han Solo and Leia Organa, Ben Solo was seduced by the dark side of the Force and renamed himself Kylo Ren, becoming the First Order’s champion and Supreme Leader Snoke’s student',
        hp: 150,
        attack: 15,
        counter: 20,
        charNum: 3,
        display: '<div class="charImg" id="charImage-kylo"></div><div id="charName">Kylo Ren</div><div id="charBio-kylo"><p class="bio" id="bio-kylo"></p></div><div id="charStats"><ul><h3 class="stats">Stats:</h3><li id="charHp-kylo"></li><li id="attackPwr-kylo"></li><li id="cAttackPwr-kylo"></li></ul></div>',
        battleDisp: '<div class="charImg" id="charImage-kylo">',
    },
    yoda: {
        value: 'yoda',
        name: 'Master Yoda',
        bio: 'A legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years and played integral roles in the Clone Wars.',
        hp: 105,
        attack: 20,
        counter: 15,
        charNum: 4,
        display: '<div class="charImg" id="charImage-yoda"></div><div id="charName">Master Yoda</div><div id="charBio-yoda"><p class="bio" id="bio-yoda"></p></div><div id="charStats"><ul><h3 class="stats">Stats:</h3><li id="charHp-yoda"></li><li id="attackPwr-yoda"></li><li id="cAttackPwr-yoda"></li></ul></div>',
        battleDisp: '<div class="charImg" id="charImage-yoda">',
    },
    vader: {
        value: 'vader',
        name: 'Darth Vader',
        bio: 'Once a heroic Jedi Knight, Darth Vader was seduced by the dark side of the Force, became a Sith Lord, and led the Empire’s eradication of the Jedi Order.',
        hp: 125,
        attack: 25,
        counter: 10,
        charNum: 5,
        display: '<div class="charImg" id="charImage-vader"></div><div id="charName">Darth Vader</div><div id="charBio-vader"><p class="bio" id="bio-vader"></p></div><div id="charStats"><ul><h3 class="stats">Stats:</h3><li id="charHp-vader"></li><li id="attackPwr-vader"></li><li id="cAttackPwr-vader"></li></ul></div>',
        battleDisp: '<div class="charImg" id="charImage-vader">',
    },
}
// Array containing the keys of the characters object above
var charNumber = Object.keys(characters);


// BEGIN GAME FUNCTIONS OBJECT
// =======================================================================================
var gameFunctions = {
    startGame: function(){
        for (var i = 0; i < charNumber.length; i++){
            $('#char' + i).html(characters[charNumber[i]].display);
            $('#bio-' + characters[charNumber[i]].value).text(characters[charNumber[i]].bio);
            $('#charHp-' + characters[charNumber[i]].value).text('HP: ' +characters[charNumber[i]].hp)
            $('#attackPwr-' + characters[charNumber[i]].value).text('Attack: ' + characters[charNumber[i]].attack)
            $('#cAttackPwr-' + characters[charNumber[i]].value).text('Counter: ' + characters[charNumber[i]].counter)
        }
    },
    pickHero: function(){
        choosingHero = false;
        userChar = characters[charNumber[currentSlide -1]];
        chosenCharacters.push(userChar.charNum);
        gameFunctions.charValidity();
        $('#char' + (currentSlide - 1)).css({
            "backgroundColor": 'green',
        });
        if ((choosingHero == false) && (choosingEnemy == false)){
            battleTime = setTimeout(gameFunctions.startBattle, 1000);
        }
    },
    pickEnemy: function(){
        choosingEnemy = false;
        enemyChar = characters[charNumber[currentSlide -1]];
        chosenCharacters.push(enemyChar.charNum);
        gameFunctions.charValidity();
        $('#char' + (currentSlide - 1)).css({
            "backgroundColor": 'rgb(247, 77, 77)',
        });
        if ((choosingHero == false) && (choosingEnemy == false)){
            battleTime = setTimeout(gameFunctions.startBattle, 1000);
        }
    },
    charValidity: function(){
        if (chosenCharacters.indexOf(currentSlide) > -1){
            chooseEnemy.prop('disabled', true);
            chooseHero.prop('disabled', true);
        }
        else {
            chooseEnemy.prop('disabled', false);
        }
    },
    startBattle: function(){
        battleScreen.css({'display': 'block'})
        battleScreen.animate({'opacity': 1});
        $('.vs').html(userChar.name + '<br><br>VS<br><br>' + enemyChar.name)
        $('#heroImg').html(userChar.battleDisp);
        $('#enemyImg').html(enemyChar.battleDisp);
        gameFunctions.updateHp();
    },
    endBattle: function(){
        choosingEnemy = true;
        battleScreen.css({'display': 'none'})
        gameFunctions.startGame();
    },
    userAttack: function(){
        enemyChar.hp -= userChar.attack;
        if (enemyChar.hp > 0){
            attackTime = setTimeout(gameFunctions.enemyAttack, 2000);
            $('#enemyLog').text('You hit ' + enemyChar.name + ' for ' + userChar.attack + ' damage!');
        }
        else if (enemyChar.hp < 0){
            enemyChar.hp = 0;
            $('#enemyLog').text('You killed ' + enemyChar.name + '! Nice going!')
            wins += 1;
            victoryTime = setTimeout(gameFunctions.endBattle, 3000); 
            if (wins == charNumber.length -1){
                alert('Somehow you\'ve managed to win!! Congratulations!')
            }
        }
        userChar.attack += 10;
        this.updateHp();
    },
    enemyAttack: function(){
        userChar.hp -= enemyChar.counter;
        $('#heroLog').text(enemyChar.name + ' countered your attack lowering your HP by ' + enemyChar.counter + '!');
        if (userChar.hp <= 0){
            userChar.hp = 0;
            $('.attack').prop('disabled', true);
            $('#heroLog').text(enemyChar.name + ' killed you! gg!')
            alert('you\'re dead.');
        }
        gameFunctions.updateHp();
    },
    updateHp: function(){
        $('#heroHp').text('HP: ' + userChar.hp);
        $('#enemyHp').text('HP: ' + enemyChar.hp);
    },
}
// END GAME FUNCTIONS OBJECT
// =======================================================================================

gameFunctions.startGame();

// BEGIN SLIDER LOGIC
// =======================================================================================
leftBtn.click(function(){
    if (currentSlide > 1){
        charBox.animate({
            left: '+=405',
        })
        rightBtn.css({'display': 'block'})
        currentSlide -= 1;
        if (currentSlide == 1){
            leftBtn.css({'display': 'none'})
        }
    }
    gameFunctions.charValidity();
})

rightBtn.click(function(){
    if (currentSlide < 5){
        charBox.animate({
            left: '-=405',
        })
        currentSlide +=1;
        leftBtn.css({'display': 'block'})
        if (currentSlide == 5){
            rightBtn.css({'display': 'none'})
        }
    }
    gameFunctions.charValidity();
})

chooseHero.click(function(){
    while (choosingHero){
        gameFunctions.pickHero();
    }
})

chooseEnemy.click(function(){
    while (choosingEnemy){
        gameFunctions.pickEnemy();
    }
})
// END SLIDER LOGIC
// =======================================================================================

$('.attack').click(function(){
    gameFunctions.userAttack();
})