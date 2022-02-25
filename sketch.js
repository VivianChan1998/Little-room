let spritesheet;
let spritedata;
var explode_animation;

const locList = [ "chairL", "chairR", "whiteBoardL", "whiteBoardR", "tableL", "tableC", "tableR", "windowL", "windowR"]
const locXY = [[20,250], [250,250], [350,200], [460,200], [430,260], [570,200], [730,250], [160,180], [650,180]]
let loc = [0,1,2,3,4,5,6,7,8]  // index as char id, loc[1] ==> bi's loc  //last one is dummy
let locschar = [0, 0, 0, 0, 0, 0, 0, 0, 0] //index as loc id, locschar[0] ==> who's in chairL // val==8 ==> no one there
const frontLoc = [0,1,4,6]
const backLoc = [2,3,7,8,5]

let isHere = [0, 0, 0, 0, 0, 0, 0, 0]
setLoc()

let All = []
let script = []
let img = []
let blackboard = []
let blackboardID = 0
let table = ''

let t_m = 0
let t_h = 0
let resetFlag = false
let clock;
let hourhand;
let minutehand;

function preload()
{
    spriteSheet = loadSpriteSheet('/src/background/day.png', 900, 500, 3);
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
            loadNext(0, temp, img, mem)
        }
    });
    for (var j=0; j < 5; ++j)
    {
        loadImage(`/src/background/blackboard/${j}.png`, e => blackboard.push(e) )
    }
    blackboardID = Math.floor(Math.random() * 10) 
    loadImage('/src/background/front.png', e => table = e)
    loadImage('./src/background/clock.png', e => clock = e)
    loadImage('./src/background/hour.png', e => hourhand = e)
    loadImage('./src/background/minute.png', e => minutehand = e)
}

function loadNext (j, temp, img, mem)
{
    loadImage(mem['img'][j], e => {
        temp.push(e)
        img[mem.code] = temp
        if (j+1 < 9) loadNext(j+1, temp, img, mem)
    })
}

function setup()
{
    createCanvas(900, 500);
    frameRate(10);
    t_m = minute()
    t_h = hour()
    let timeoutID = window.setInterval(( () => resetScene() ), 60000);
}

function draw()
{
    clear();

    //background
    animation(explode_animation, 450, 250);

    //blackboard
    if (blackboardID < 5) image(blackboard[blackboardID], 0, 0, 900, 500)

    //members in back
    for (var i=0; i<backLoc.length; ++i)
    {
        let who = locschar[backLoc[i]]
        if (who != 8 && isHere[who])
        {
            let l = loc[who]
            image(img[who][l], 0, 0, 900, 500)
        }
    }

    //tables
    image(table, 0, 0, 900, 500)

    //members in front
    for (var i=0; i<frontLoc.length; ++i)
    {
        let who = locschar[frontLoc[i]]
        if (who != 8 && isHere[who])
        {
            let l = loc[who]
            image(img[who][l], 0, 0, 900, 500)
        }
    }

    //clock
    t_m = minute()
    t_h = hour()
    image(clock, 450, 20, 84, 84)

    push()
    translate(492, 62);
    rotate(2 * PI/60*t_m);
    image(minutehand, -42, -42, 84, 84)
    pop()

    translate(492, 62);
    rotate(2 * PI / 12 * (t_h%12));
    image(hourhand, -42, -42, 84, 84)

}

function resetScene()
{
    blackboardID = Math.floor(Math.random() * 10) 
    setLoc()
    resetFlag = true
}

function setLoc()
{
    console.log(loc)
    loc = shuffle(loc)
    for (var i=0; i<9; ++i)
    {
        locschar[loc[i]] = i
    }
    console.log(loc)
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}