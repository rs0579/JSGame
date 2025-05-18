// THIS MAKES SURE THAT ALL IMAGES ARE LOADED BEFORE THE SCRIPT RUNS. THIS IS IMPORTANT BECAUSE WE NEED TO KNOW THE SIZE OF THE IMAGES. TO CALCULATE THE SIZE OF THE CANVAS N.B. THE COMMENT IN THE STYLES.
window.addEventListener('load', function () {
    //WE FIRST MUST POINT JS TO THE CANVAS ELEMENT
    const canvas = document.getElementById('canvas1');
    //2D IS A CONTEXT TYPE THAT ALLOWS US TO DRAW 2D SHAPES AND IMAGES.WE THEN SET THE CANVAS SIZE TO THE WINDOW SIZE. WE THEN GET THE 2D CONTEXT OF THE CANVAS, WHICH IS BUILT INTO HTML5. 
    const ctx = canvas.getContext('2d');

    canvas.width = 1280;
    canvas.height = 720;
    //THE BELOW ARE STYLES THAT I IMPLAMENTED TO MAKE THE CANVAS WIDER. HOWEVER, THIS AFFECTED THE X AND Y MOUSEMOVE COORDINATES. THE CANVAS HAS TO BE THE ABOVE SIZE FOR THE MOUSEMOVE TO WORK PROPERLY. I THINK THIS IS BECAUSE THE CANVAS SIZE AFFECTS THE MOUSE COORDINATES. I THINK THIS IS BECAUSE THE CANVAS SIZE AFFECTS THE MOUSE COORDINATES.
    // canvas.width = 1366;
    // canvas.height = 599;

    //THESE ARE DEFINED IN THE GLOBALE SCOPE BECAUSE THEY WILL ONLY LOAD UP ONCE ON PAGE LOAD. THIS APPLIES THE STYLES BUT DOESN'T CONSTANTLY RUN THEM - WHICH COULD AFFECT PERFORMANCE.
    ctx.fillStyle = 'white'
    ctx.lineWidth = 5; // THIS SETS THE LINE WIDTH FOR THE STROKE STYLE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE LINES ARE THICK ENOUGH TO SEE.
    ctx.strokeStyle = 'white'; // THIS SETS THE STROKE STYLE FOR THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE LINES ARE THICK ENOUGH TO SEE.

    class Player {
        //BY PASSING IN THE GAME OBJECT, WE CAN ACCESS THE GAME OBJECT AND ITS PROPERTIES. THIS IS IMPORTANT BECAUSE WE NEED TO KNOW THE SIZE OF THE CANVAS TO CALCULATE THE SIZE OF THE PLAYER.
        constructor(game) {
            this.game = game;
            //IN GAMING X AND Y CORDINATES ARE USUALLY MEASURED FROM THE TOP LEFT CORNER OF THE CANVAS. THIS MEANS THAT THE X COORDINATE INCREASES AS YOU MOVE TO THE RIGHT AND THE Y COORDINATE INCREASES AS YOU MOVE DOWN. THEY ARE NECESSARY BECAUSE THIS IS THE PLAYERS POSITION ON THE CANVAS.
            this.collisionX = this.game.width * 0.5; // THIS MEANS THAT THE PLAYER WILL START IN THE MIDDLE OF THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT THE PLAYER TO START IN THE MIDDLE OF THE SCREEN ( * 0.5) but we can change the starting postion by changing the number you multiply by.
            this.collisionY = this.game.height * 0.5; // THIS MEANS THAT THE PLAYER WILL START IN THE MIDDLE OF THE CANVAS.
            this.collisionRadius = 30;


            this.dx = 0; // THIS SETS THE HORIZONTAL DISTANCE BETWEEN THE PLAYER AND THE MOUSE.
            this.dy = 0; // THIS SETS THE VERTICLE DISTANCE BETWEEN THE PLAYER AND THE MOUSE.
            this.speedModifier = 5; // THIS SETS THE SPEED OF THE PLAYER.

        }
        //passing context allows us to specify which canvas we want to draw on.
        draw(context) {//firrst you will draw a circle to represent the player.

            context.beginPath(); // THIS STARTS A NEW PATH. A PATH IS A SERIES OF POINTS THAT DEFINE A SHAPE.
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2)//this takes at least 5 arguments: X & Y coordinates, radius, start & end angles (in radians measured from the positive x-axis).

            context.save() // THIS SAVES THE CURRENT STATE OF THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT WE CAN RESTORE THE CANVAS TO ITS ORIGINAL STATE LATER. "THIS SAVES A SNAPSHOT OF THE CANVAS STATE, INCLUDING THE CURRENT TRANSFORM, CLIP, AND STROKE/FILL STYLES."
            context.globalAlpha = 0.5; // THIS SETS THE GLOBAL ALPHA FOR THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER IS SEMI-TRANSPARENT.

            context.fill(); // THIS FILLS THE PATH WITH THE CURRENT FILL STYLE. BY DEFAULT, THE FILL STYLE IS BLACK.

            context.restore(); // THIS RESTORES THE CANVAS TO ITS ORIGINAL STATE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT WE CAN RESTORE THE CANVAS TO ITS ORIGINAL STATE LATER.

            context.stroke(); // THIS DRAWS THE PATH WITH THE CURRENT STROKE STYLE. BY DEFAULT, THE STROKE STYLE IS BLACK.

            context.beginPath(); // THIS STARTS A NEW PATH. A PATH IS A SERIES OF POINTS THAT DEFINE A SHAPE.
            context.moveTo(this.collisionX, this.collisionY); // THIS MOVES THE CURRENT POINT TO THE SPECIFIED X AND Y COORDINATES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            context.lineTo(this.game.mouse.x, this.game.mouse.y); // THIS DRAWS A LINE TO THE SPECIFIED X AND Y COORDINATES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            context.stroke(); // THIS DRAWS THE PATH WITH THE CURRENT STROKE STYLE. BY DEFAULT, THE STROKE STYLE IS BLACK.

        }
        update() {
            this.dx = this.game.mouse.x - this.collisionX; // THIS SETS THE HORIZONTAL DISTANCE BETWEEN THE PLAYER (THIS.COLLISIONX) AND THE MOUSE (THIS.GAME.MOUSE.X). THIS ENSURES THAT PLAYER FOLLOWS THE MOUSE MOVEMENTS ALONG THE X AXIS (HORIZONTALLY).
            this.dy = this.game.mouse.y - this.collisionY; // THIS SETS THE VERTICLE DISTANCE BETWEEN THE PLAYER (THIS.COLLISIONY) AND THE MOUSE (THIS.GAME.MOUSE.Y). THIS ENSURES THAT PLAYER FOLLOWS THE MOUSE MOVEMENTS ALONG THE Y AXIS (VERTICALLY).

            const distance = Math.hypot(this.dy, this.dx); // THIS CALCULATES THE DISTANCE BETWEEN THE PLAYER AND THE MOUSE ALONG THE HYPOTENUS. DY MUST GO FIRST IN THIS BUILT IN METHOD
            if (distance > this.speedModifier) {
                //I moved the below to a conditional statement because once the player arrives at the mouse press location, it stops but the players vibrates, I do not want it to do this so we need to make it be still here.
                this.speedx = this.dx / distance || 0; // THIS SETS THE HORIZONTAL SPEED OF THE PLAYER. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
                this.speedy = this.dy / distance || 0; // THIS SETS THE VERTICLE SPEED OF THE PLAYER. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            } else {
                this.speedx = 0;
                this.speedy = 0;
            }
            //THE BELOW THREE LINES ARE APART OF THE FIRST TECHNIQUE OF MOVEMENT THAT IS NOT NEEDED FOR THIS PARTICULAR GAME, AS THE PLAYER GETS CLOSER TO THE PRESSED COORDINATES, IT SLOWS DOWN. WITH THE ABOVE TECHNIQUE WHICH IS FOLLLOWED UP BY LINES ~66-67, MOTION IS CONSISTANT.

            //WHEN YOU DIVIDE BY A NUMBER, YOU'RE DETERMINING HOW FAST THE PLAYER MOVES TOWARDS THE MOUSE. THE SMALLER THE NUMBER, THE FASTER THE PLAYER MOVES. IN GAMES, YOU DON'T WANT THE PLAYER TO MOVE TOO FAST, SO YOU DIVIDE BY A NUMBER THAT'S NOT TOO SMALL. 
            // this.speedx = this.dx/20; // THIS SETS THE HORIZONTAL SPEED OF THE PLAYER. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            // this.speedy = this.dy/20; // THIS SETS THE VERTICLE SPEED OF THE PLAYER. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.

            this.collisionX += this.speedx * this.speedModifier; // THIS SETS THE X POSITION OF THE PLAYER. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            this.collisionY += this.speedy * this.speedModifier; // THIS SETS THE Y POSITION OF THE PLAYER. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            // this.collisionX = this.game.mouse.x; // THIS SETS THE X POSITION OF THE PLAYER TO THE MOUSE POSITION. THIS IS IMPORTANT BECAUSE WE WANT THE PLAYER TO FOLLOW THE MOUSE.
            // this.collisionY = this.game.mouse.y; // THIS SETS THE Y POSITION OF THE PLAYER TO THE MOUSE POSITION. THIS IS IMPORTANT BECAUSE WE WANT THE PLAYER TO FOLLOW THE MOUSE.
        }
    }

    class Obstacle {
        constructor(game) {
            this.game = game;
            this.collisionX = Math.random() * this.game.width;
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 60;
            this.image = document.getElementById('obstacles'); // THIS GETS THE IMAGE ELEMENT FROM THE HTML. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE IMAGE IS LOADED BEFORE WE DRAW IT ON THE CANVAS.
            this.spriteWidth = 250;
            this.spriteHeight = 250; 
            //The above are the height and width of each individual image in the sprite sheet. If you do not know what the specific height and width of the image, you can get the width by dividing the width of the entire image by the number of coloumns (images)(imageWidth/# of columns). And the height is the same but with the number of rows (images)(imageHeight/# of rows).
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;

            this.spriteX = this.collisionX - this.width * 0.5; // THIS SETS THE X POSITION OF THE IMAGE ON THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE IMAGE IS DRAWN IN THE CORRECT POSITION.
            this.spriteY = this.collisionY - this.height * 0.5 - 70; // THIS SETS THE Y POSITION OF THE IMAGE ON THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE IMAGE IS DRAWN IN THE CORRECT POSITION. The -70 is to make the image sit on the ground. I think this is because the image is 250px tall and the canvas is 720px tall, so we need to move it up by 70px to make it sit on the ground.
        }
        draw(context) {

            context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height); // THIS DRAWS THE IMAGE ON THE CANVAS. If I want to excise an individual image from the sprite sheest, I have to use the maximum number of arguments the drawImage method can take. The first four arguments are: 1) the IMAGE, 2 - 3) the X and Y COORDINATES of the top left corner of the image, and the 4- 5) WIDTH and HEIGHT of the image. The last four arguments are the 6 - 7) X and Y COORDINATES of where to draw the image on the canvas, and the 8 - 9) WIDTH and HEIGHT of the image on the canvas.
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2)
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
            context.stroke();
        }
    }
    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            const topMargin = 260 // this is the top area of the canvas that the obstacles will not be able to go into. The amount of pixels are not totally clear, but you should be able to estimate them and test as you go. The base of the obstacles will not enter the space.
            this.player = new Player(this); //  THIS CREATES A NEW PLAYER OBJECT WHEN WE CREATE AN INSTANCE OF THE GAME CLASS. BY STRUCTURING IT LIKE THIS (INCLUNDING WITH THE THIS KEYWORD PASSED AS AN ARGUMENT), WE ENSURE THAT THE PLAYER LOADS WHEN THE GAME LOADS.

            this.numberOfObstacles = 10; // THIS SETS THE NUMBER OF OBSTACLES TO 5. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THERE ARE ENOUGH OBSTACLES TO AVOID.
            this.obstacles = []; // THIS CREATES AN EMPTY ARRAY TO STORE THE OBSTACLES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT WE CAN ACCESS THE OBSTACLES LATER.

            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false,
            }

            //USE CANVAS INSTEAD OF WINDOW TO GET THE MOUSE POSITION RELATIVE TO THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE POSITION IS RELATIVE TO THE CANVAS AND NOT THE WINDOW.
            window.addEventListener('mousedown', e => {
                this.mouse.x = e.offsetX; // THIS GETS THE X POSITION OF THE MOUSE RELATIVE TO THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE POSITION IS RELATIVE TO THE CANVAS AND NOT THE WINDOW. this is pulled from line 52.
                this.mouse.y = e.offsetY

                this.mouse.pressed = true; // THIS SETS THE MOUSE PRESSED PROPERTY TO TRUE. This sets the action for when you press down with the mouse button.
            })

            window.addEventListener('mouseup', e => {
                this.mouse.x = e.offsetX
                this.mouse.y = e.offsetY
                this.mouse.pressed = false;
            })

            window.addEventListener('mousemove', e => {
                //THE BELOW CONDITIONAL STATEMENT ENSURES THAT WHERE WE PRESS, THE PLAYER WILL FOLLOW. BEFORE, WHEREEVER WE MOVED THE MOUSE, THE PLAYER WOULD FOLLOW. NOW YOU HAVE TO PRESS WHERE YOU WANT IT TO GO.
                if (this.mouse.pressed) {
                    this.mouse.x = e.offsetX
                    this.mouse.y = e.offsetY
                }

                // this.mouse.x = e.offsetX
                // this.mouse.y = e.offsetY
            })
        }

        render(context) { //this method performs the drawing of the player on the canvas. It takes a context argument, which is the 2D context of the canvas.
            this.player.draw(context);
            this.player.update(); // THIS UPDATES THE PLAYER POSITION. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
            this.obstacles.forEach(obstacle =>
                obstacle.draw(context)); // THIS DRAWS THE OBSTACLES ON THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE DRAWN ON THE CANVAS.
        }
        init() {
            let attempts = 0;
            //The below while loop ensures that the obstacles are not overlapping with each other. It does this by checking the distance between each obstacle and the player. If the distance is less than the sum of the radii of the two circles, it means that they are overlapping.
            //The while loop will keep trying to create a new obstacle until it finds one that is not overlapping with the player or any other obstacles. If it can't find one after 500 attempts, it will stop trying.
            while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
                let testObstacle = new Obstacle(this); // THIS CREATES A NEW OBSTACLE OBJECT WHEN WE CREATE AN INSTANCE OF THE GAME CLASS. BY STRUCTURING IT LIKE THIS (INCLUNDING WITH THE THIS KEYWORD PASSED AS AN ARGUMENT), WE ENSURE THAT THE PLAYER LOADS WHEN THE GAME LOADS.
                let overlap = false;
                this.obstacles.forEach(obstacle => {
                    const dx = testObstacle.collisionX - obstacle.collisionX;
                    const dy = testObstacle.collisionY - obstacle.collisionY;

                    const distance = Math.hypot(dy, dx); // THIS CALCULATES THE DISTANCE BETWEEN THE PLAYER AND THE MOUSE ALONG THE HYPOTENUS. DY MUST GO FIRST IN THIS BUILT IN METHOD
                    // The below puts distance between the obstacles by 100px. I then added that new variable to ny sumofRadii variable. It is by putting it there that I added the space.
                    const distanceBuffer = 100; 
                    const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer; // THIS CALCULATES THE SUM OF THE RADIUSES OF THE TWO CIRCLES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.
                    if (distance < sumOfRadii) {
                        overlap = true; // THIS SETS THE OVERLAP VARIABLE TO TRUE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.
                    }
                });
                const margin = testObstacle.collisionRadius
                if (!overlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.spriteX && testObstacle.collisionY > 260 && testObstacle.collisionY < this.height) { // THIS CHECKS IF THE OBSTACLE IS NOT OVERLAPPING WITH THE PLAYER OR ANY OTHER OBSTACLES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.
                   // I added the && to the condition to make sure that the obstacles stay within the canvas and are not partially hidden behind the edges - I could have done this in the Obstacle class constructor but because there aren't so many, I can do it here.
                    this.obstacles.push(testObstacle); // THIS ADDS THE OBSTACLE TO THE OBSTACLES ARRAY. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.

                }
                attempts++;
            }
        }
    }
    const game = new Game(canvas); // THIS CREATES A NEW GAME OBJECT WHEN THE PAGE LOADS.
    game.init(); //This fills the obstacles array with new instances of the Obstacle class.
    console.log(game);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // THIS CLEARS THE CANVAS. If we don't clear the canvas, a trail of white circles will be left behind. It takes all those arguments: the x and y coordinates of the top left corner of the rectangle to clear, and the width and height of the rectangle to clear.
        //IF WE WANT TO SEE MOVEMENT, WE HAVE TO CALL REDER OVER AND OVER AGAIN. THIS IS DONE BY CALLING THE ANIMATE FUNCTION RECURSIVELY.
        game.render(ctx); // THIS CALLS THE RENDER METHOD OF THE GAME OBJECT, WHICH DRAWS THE PLAYER ON THE CANVAS.
        requestAnimationFrame(animate); // THIS CALLS THE ANIMATE FUNCTION AGAIN. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE ANIMATION CONTINUES TO RUN.

    }
    animate(); // THIS CALLS THE ANIMATE FUNCTION FOR THE FIRST TIME. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE ANIMATION STARTS RUNNING.

});