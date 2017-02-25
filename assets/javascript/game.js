$(document).ready(function() {
    var winSound = new Audio('./assets/audio/crush.mp3'),
        loseSound = new Audio('./assets/audio/pacman-die.mp3'),
        btnClick = new Audio('./assets/audio/click.mp3'),
        theme = new Audio('./assets/audio/tetris.mp3');

    theme.volume = 0.4;
    theme.loop = true;
    winSound.volume = 0.5;
    loseSound.volume = 0.4;


    //shortcuts to html elements
    var win = $("#win"),
        loss = $("#loss"),
        targetPoint = $("#targetPoint"),
        currentPoint = $("#currentPoint");


    //global variables
    var currPoint = 0,
        randomPoint = 0,
        winCounter = 0,
        lossCounter = 0;

    //start game
    var initGame = () => {
        theme.play();

        win.html(winCounter);
        loss.html(lossCounter);
        initValues();

    };

    //initialize random values
    var initValues = () => {
        var ruby = randomGenerator(1, 12),
            saphire = randomGenerator(1, 12),
            obsidian = randomGenerator(1, 12),
            amethyst = randomGenerator(1, 12);

        randomPoint = randomGenerator(19, 120);
        currPoint = 0;
        targetPoint.html(randomPoint);
        currentPoint.html(currPoint);

        $(".ruby").attr("data-value", ruby);
        $(".saphire").attr("data-value", saphire);
        $(".obsidian").attr("data-value", obsidian);
        $(".amethyst").attr("data-value", amethyst);

    };

    //helper function to generate random numbers between range
    var randomGenerator = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //give each gem a click function and add value to it
    $(".gem").on("click", function() {
        btnClick.play();
        currPoint += parseInt($(this).attr("data-value"));
        currentPoint.html(currPoint);
        var fadeValue = $(this).parent().find(".fading-value");
        fadeValue.html("+" + $(this).attr("data-value"));

        $(fadeValue).finish().animate({
            opacity: 1,
            top: -40

        }, 500, function() {
            $(this).removeAttr('style');
        });


        if (currPoint === randomPoint) {
            winCounter++;
            win.html(winCounter);
            winSound.play();
            initValues();

        }

        if (currPoint >= randomPoint) {
            lossCounter++;
            loss.html(lossCounter);
            loseSound.play();
            initValues();

        }

    });

    TweenMax.to(cloud, 60, {
        left: "-500px",
        repeat: -1

    });
    TweenMax.to(cloud2, 30, {
        left: "-500px",
        repeat: -1

    });



    initGame();

});
