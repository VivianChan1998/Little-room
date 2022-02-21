let spritesheet;
let spritedata;
var explode_animation;

function preload()
{
    spriteSheet = loadSpriteSheet('./src/bg1/bg.png', 800, 600, 3);
    explode_animation = loadAnimation(spriteSheet);
}

function setup()
{
    console.log("here")
    createCanvas(900, 500);
    frameRate(12);
    
    /*loadImage('./src/bgtest.png', img => {
        image(img, 0, 0, width, height);
        console.log("done")
    });*/
    
}

function draw()
{
    clear();
    line(0, 0, 900, 500);
    animation(explode_animation, 400, 300);
}
