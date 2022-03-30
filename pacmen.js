let pos = 0;
const pacArray = [
    ['./images/PacMan1.png', './images/PacMan2.png'], 
    ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
let focus = 0;
const pacMen = []; //array to hold all the pacmen

//Function to return random values
function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale,
    };
}

//Factory to make PacMen in random places with random velocities
function makePac() {
    //return an object with random values
    let velocity = setToRandom(10);
    let position = setToRandom(200);

    //add image to game div
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './images/PacMan1.png';
    newimg.width = 100;

    //set position
    newimg.style.left = position.x;
    newimg.style.right = position.y;

    //add new Child image to game
    game.appendChild(newimg);

    //return details in an object
    return {
        position,
        velocity,
        newimg,
    };
}

function update() {
    //loop over pacment array and move each one and move image in the DOM
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    });
    setTimeout(update, 20);
}

function checkCollisions(item) {
    //detect collisions with walls and make pacmen bounce
    if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
    if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}

function makeOne() {
    pacMen.push(makePac()); //add a new PacMan
}