let spritesheet;
let spritedata;
var explode_animation;

const locList = [ "chairL", "chairR", "whiteBoardL", "whiteBoardR", "tableL", "tableC", "tableR", "windowL", "windowR"]
const locXY = [[20,250], [250,250], [350,200], [460,200], [430,260], [570,200], [730,250], [160,180], [650,180]]
let loc = [0,1,2,3,4,5,6,7,8]  // index as char id, loc[1] ==> bi's loc  //last one is dummy
let locschar = [0, 0, 0, 0, 0, 0, 0, 0, 0] //index as loc id, locschar[0] ==> who's in chairL // val==8 ==> no one there
for (var i=0; i<9; ++i)
{
    locschar[loc[i]] = i
}


let isHere = [0, 0, 0, 0, 0, 0, 0, 0]
shuffle(loc)
console.log(loc)

let All = []
let script = []
let img = []

function preload()
{
    spriteSheet = loadSpriteSheet('./src/background/day.png', 900, 500, 3);
    explode_animation = loadAnimation(spriteSheet);
    fetch("./data.json")
    .then(response => { return response.json(); })
    .then(jsondata => {
        for(var i=0; i<8; ++i) {
            let mem = jsondata["members"][i]
            let present = Math.random() < mem.presentChance? 1:0
            let char = new Character(mem.code, mem.name, mem.presentChance, loc[i], present)
            isHere[i] = present
            All.push(char)
            script.push(mem["script"])
            let temp = []
            for (var j=0; j < 9; ++j)
            {
                loadImage(mem['img'][j], e => {
                    temp.push(e)
                    img[mem.code] = temp
                })
            }
        }
        console.log(isHere)
        console.log(All)
    });
}

function setup()
{
    createCanvas(900, 500);
    frameRate(12);
}

function draw()
{
    clear();
    line(0, 0, 900, 500);
    animation(explode_animation, 450, 250);

    for(var i=0; i<8; ++i)
    {
        if(isHere[i])
        {
            let l = loc[i]
            image(img[i][l], locXY[l][0], locXY[l][1], 160, 200)
        }
    }


}

function setScene()
{
    
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }