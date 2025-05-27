// THIS MAKES SURE THAT ALL IMAGES ARE LOADED BEFORE THE SCRIPT RUNS. THIS IS IMPORTANT BECAUSE WE NEED TO KNOW THE SIZE OF THE IMAGES. TO CALCULATE THE SIZE OF THE CANVAS N.B. THE COMMENT IN THE STYLES.
window.addEventListener('load', function () {
    //WE FIRST MUST POINT JS TO THE CANVAS ELEMENT
    const canvas = document.getElementById('canvas1');
    //2D IS A CONTEXT TYPE THAT ALLOWS US TO DRAW 2D SHAPES AND IMAGES.WE THEN SET THE CANVAS SIZE TO THE WINDOW SIZE. WE THEN GET THE 2D CONTEXT OF THE CANVAS, WHICH IS BUILT INTO HTML5. 
    const ctx = canvas.getContext('2d'); //ctx is the player

    canvas.width = 1280;
    canvas.height = 720;
    //THE BELOW ARE STYLES THAT I IMPLAMENTED TO MAKE THE CANVAS WIDER. HOWEVER, THIS AFFECTED THE X AND Y MOUSEMOVE COORDINATES. THE CANVAS HAS TO BE THE ABOVE SIZE FOR THE MOUSEMOVE TO WORK PROPERLY. I THINK THIS IS BECAUSE THE CANVAS SIZE AFFECTS THE MOUSE COORDINATES. I THINK THIS IS BECAUSE THE CANVAS SIZE AFFECTS THE MOUSE COORDINATES.
    // canvas.width = 1366;
    // canvas.height = 599;

    //These are the player's styles. THEY ARE DEFINED IN THE GLOBALE SCOPE BECAUSE THEY WILL ONLY LOAD UP ONCE ON PAGE LOAD. THIS APPLIES THE STYLES BUT DOESN'T CONSTANTLY RUN THEM - WHICH COULD AFFECT PERFORMANCE.
    ctx.fillStyle = 'white'
    ctx.lineWidth = 5; // THIS SETS THE LINE WIDTH FOR THE STROKE STYLE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE LINES ARE THICK ENOUGH TO SEE.
    ctx.strokeStyle = 'white'; // THIS SETS THE STROKE STYLE FOR THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE LINES ARE THICK ENOUGH TO SEE.

    class Player {
        //BY PASSING IN THE GAME OBJECT, WE CAN ACCESS THE GAME OBJECT AND ITS PROPERTIES. THIS IS IMPORTANT BECAUSE WE NEED TO KNOW THE SIZE OF THE CANVAS TO CALCULATE THE SIZE OF THE PLAYER.
        constructor(game) {
            this.game = game;
            // The following three lines define the players position on the canvas - the bubble. Used collisionX and Y to make it easy to follow.  
            this.collisionX = this.game.width * 0.5; // CollisionX and CollisionY are the player's position. Where the players is located are these variables
            this.collisionY = this.game.height * 0.5; // By setting these to 0.5, we ensure that the player starts in the middle of the canvas.
            this.collisionRadius = 30; // Without the radius, the player does not appear on the the canvas. The collision radius defines the size of the player.

            this.speedX = 0;
            this.speedY = 0;
            this.dx = 0; // Horizontal (straight across) distance between the player in the mouse. Given value of 0 as a default. Changed later in the update method.
            this.dy = 0; // Vertical (straight up and down) distance between the player in the mouse. Given value of 0 as a default. Changed later in the update method.
            this.speedModifier = 5; // THIS SETS THE SPEED OF THE PLAYER.

            this.spriteWidth = 255;
            this.spriteHeight = 255;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;

            //The bottom two lines are the top left corner of the image on the canvas, not the bubble. The collisionX and collisionY are the center point of the player, so we subtract half of the width and height to get the top left corner of the image. You can define these here or in the update method.
            this.spriteX;
            this.spriteY;

            this.frameX = 0; // Refer to Obstacle class for explanation of frameX and frameY.
            this.frameY = 0;
            this.image = document.getElementById('bull');

        }
        //passing context allows us to specify which canvas we want to draw on.
        draw(context) {//first you will draw a circle to represent the player.
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height); //Used spriteX and spriteY instead of collision because I want bull image to go over my bubble. 
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
            this.dx = this.game.mouse.x - this.collisionX; // dx is the distance between the player and the mouse in a straight line across (horizontally). THIS SETS THE HORIZONTAL DISTANCE BETWEEN THE PLAYER (THIS.COLLISIONX) AND THE MOUSE (THIS.GAME.MOUSE.X). THIS ENSURES THAT PLAYER FOLLOWS THE MOUSE MOVEMENTS ALONG THE X AXIS (HORIZONTALLY).
            this.dy = this.game.mouse.y - this.collisionY; // dy is the distance between the player and the mouse up and down (veritically). THIS SETS THE VERTICLE DISTANCE BETWEEN THE PLAYER (THIS.COLLISIONY) AND THE MOUSE (THIS.GAME.MOUSE.Y). THIS ENSURES THAT PLAYER FOLLOWS THE MOUSE MOVEMENTS ALONG THE Y AXIS (VERTICALLY).

            //Sprite Animations
            const angle = Math.atan2(this.dy, this.dx); //Math.atan2() is a built-in method. It returns the angle in radians between the positive x-axis and the line to the point (dx, dy). This is used to determine the direction the player is facing. The angle is calculated using the horizontal distance (dx) and vertical distance (dy) between the player and the mouse. Based on this I will choose which image to draw dynamically. ** This is quite tricky because you have to keep in mind that it is measured in radians, which are not like degrees. Radians are a unit of angle measurement where 2π radians is equal to 360 degrees. So, if you want to convert radians to degrees, you can multiply by 180/π.** You can use the console.log to find these measurements and calculate the angle you need yourself.
            if (angle < -2.74 || angle > 2.74) this.frameY = 6;
            else if (angle < -1.96) this.frameY = 7;
            else if (angle < -1.17) this.frameY = 0;
            else if (angle < -0.39) this.frameY = 1;
            else if (angle < 0.39) this.frameY = 2;
            else if (angle < 1.17) this.frameY = 3;
            else if (angle < 1.96) this.frameY = 4;
            else if (angle < 2.74) this.frameY = 5;// The frameY value determines the position on the sprite sheet. Please refer to the obstacle class for more information on the sprite sheet.  


            const distance = Math.hypot(this.dy, this.dx); // THIS CALCULATES THE DISTANCE BETWEEN THE PLAYER AND THE MOUSE ALONG THE HYPOTENUS. DY MUST GO FIRST IN THIS BUILT IN METHOD
            if (distance > this.speedModifier) {
                //I moved the below to a conditional statement because once the player arrives at the mouse press location, it stops but the players vibrates, I do not want it to do this so we need to make it be still here.
                this.speedx = this.dx / distance || 0; // Horizontal speed is the ratio between the horizontal distance (straight across) and the actually distance, AKA the hypotenuse. The || 0 is just in case these values are undefined it will go to 0.
                this.speedy = this.dy / distance || 0; // Vertical speed is the ratio between the vertical distance (up and down) and the actually distance, AKA the hypotenuse. The || 0 is just in case these values are undefined it will go to 0.
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
            this.spriteX = this.collisionX - this.width * 0.5; // The value assigned to the this.spriteX is the bubble's x position on the canvas. This moves the player there. collisionX (bubble center) - half the width of the bubble (bubble radius) = top left corner of the bubble on the canvas.
            this.spriteY = this.collisionY - this.height * 0.5 - 100; //Please refer to the above.

            this.game.obstacles.forEach(obstacle => { //forEah allows us to check out player and obstacles spatial relationship to each other.
                let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obstacle); // This is saying: Create 5 variables and pairs them with the values that sit at the specific indices in the array returned by checkCollision method.  
                if (collision) {
                    const unit_x = dx / distance; // This is a vector, small line between 0 and 1px, that points in the direction the player will be pushed. This ensures that the player is pushed away from the obstacle in the direction of the obstacle. This will always be a value between 0 and 1, so it will not push the player too far away from the obstacle.
                    const unit_y = dy / distance; // Please refer to the above. 

                    this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x; //This pushes it outside of the obstacle's radius/center point (bubble). obstacle.collisionX is the center point of the obstacle, so we add the sum of the radii to it to push the player outside of the obstacle's radius. The +1 is to ensure that the player is not touching the obstacle. * unit_x gives it the correct direction to push the player away. 
                    this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unit_y; //Please refer to the above.
                }
            })
        }
    }

    class Obstacle {
        constructor(game) {
            this.game = game; //This allows use access the game properties like width and height.
            this.collisionX = Math.random() * this.game.width; // Like the collisionX and collisionY in the Player class, this positions the obstacle on the canvas. Unlike the Player class, I want them to be randomly placed so I used the math.random() method and not the *0.5.
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 60;
            this.image = document.getElementById('obstacles'); // THIS GETS THE IMAGE ELEMENT FROM THE HTML. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE IMAGE IS LOADED BEFORE WE DRAW IT ON THE CANVAS.
            this.spriteWidth = 250;
            this.spriteHeight = 250;
            //The above are the height and width of each individual image in the sprite sheet. If you do not know what the specific height and width of the image, you can get the width by dividing the width of the entire image by the number of coloumns (images)(imageWidth/# of columns). And the height is the same but with the number of rows (images)(imageHeight/# of rows).
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;

            this.spriteX = this.collisionX - this.width * 0.5; // THIS SETS THE X POSITION OF THE IMAGE ON THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE IMAGE IS DRAWN IN THE CORRECT POSITION.
            this.spriteY = this.collisionY - this.height * 0.5 - 70; // THIS SETS THE Y POSITION OF THE IMAGE ON THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE IMAGE IS DRAWN IN THE CORRECT POSITION. The -70 is to make the bubble the player will have to walk around lower on the obstacle image.

            this.frameX = Math.floor(Math.random() * 4) // This randomly sets the X position of the image in the sprite sheet FOR the context.drawImage method. Multiplying by 4 because there are 5 images in the sprite sheet (0-4). Math.floor, which rounds down to the nearest whole number keeps us on the sheet.
            this.frameY = Math.floor(Math.random() * 3); // Please refer to the above. 
        }
        draw(context) {

            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height); // This is a built-in method that draws the image on the canvas. If I want to excise an individual image from the sprite sheest, I have to use the maximum number of arguments the drawImage method can take. The first four arguments are: 1) the IMAGE, 2 - 3) the X and Y COORDINATES of the top left corner of the image, and the 4- 5) WIDTH and HEIGHT of the image and they all are the excised image. The last four arguments are the 6 - 7) X and Y COORDINATES of where to draw the image on the canvas, and the 8 - 9) WIDTH and HEIGHT of the image on the canvas.
            // The above: When you multiply argument 2 by the spriteWidth, you are specifying which image in the sprite sheet you want to draw moving across. In this case, it is the second image in the sprite sheet (index 1). If you want to draw a different image, you can change the number before the * to the index of the image you want to draw. And the same for the 3rd argument, which when multiplied by the spriteHeight, specifies which row of images you want to draw (up and down). In this case, it is the first row (index 0). If you want to draw a different row, you can change the number before the * to the index of the row you want to draw.
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
            this.topMargin = 260 // this is the top area of the canvas that the obstacles will not be able to go into. The amount of pixels are not totally clear, but you should be able to estimate them and test as you go. The base of the obstacles will not enter the space.
            this.player = new Player(this); //  THIS CREATES A NEW PLAYER OBJECT WHEN WE CREATE AN INSTANCE OF THE GAME CLASS. BY STRUCTURING IT LIKE THIS (INCLUNDING WITH THE THIS KEYWORD PASSED AS AN ARGUMENT), WE ENSURE THAT THE PLAYER LOADS WHEN THE GAME LOADS.

            this.numberOfObstacles = 10; // THIS SETS THE NUMBER OF OBSTACLES TO 5. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THERE ARE ENOUGH OBSTACLES TO AVOID.
            this.obstacles = []; // This is an array that will hold all obstacle objects. It starts off empty because we will fill it with new instances of the Obstacle class when we call the init method.

            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false,
            }

            //USE CANVAS INSTEAD OF WINDOW TO GET THE MOUSE POSITION RELATIVE TO THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE POSITION IS RELATIVE TO THE CANVAS AND NOT THE WINDOW.
            window.addEventListener('mousedown', e => { //if I set this to canvas, the Player will not follow the mouse. This is because the canvas is not the same size as the window, so the mouse position will not be relative to the canvas.
                this.mouse.x = e.offsetX; // THIS GETS THE X POSITION OF THE MOUSE RELATIVE TO THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE POSITION IS RELATIVE TO THE CANVAS AND NOT THE WINDOW. this is pulled from line 52. offSet x is an event property that is produced automatically when the mouse is pressed down in the browser window.
                this.mouse.y = e.offsetY

                this.mouse.pressed = true; // When the mouse is down, ofc pressed is true. 
            })

            window.addEventListener('mouseup', e => { //if I set this to canvas, the Player will not follow the mouse. This is because the canvas is not the same size as the window, so the mouse position will not be relative to the canvas.
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
            this.obstacles.forEach(obstacle => obstacle.draw(context)); // THIS DRAWS THE OBSTACLES ON THE CANVAS. Originally, I had this underneath the player.draw method, but I moved it here so that the obstacles are drawn first, and then the player is drawn on top of them. This way, the player will always be on top of the obstacles.
            this.player.draw(context);
            this.player.update(); // THIS UPDATES THE PLAYER POSITION. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER FOLLOWS THE MOUSE.
        }
        checkCollision(a, b) { //This method will check if two objects are touching 
            const dx = a.collisionX - b.collisionX; //The distance between the center point of bubble a and bubble b on the x-axis.
            const dy = a.collisionY - b.collisionY; //The distance between the center point of bubble a and bubble b on the y-axis.
            const distance = Math.hypot(dy, dx);
            const sumOfRadii = a.collisionRadius + b.collisionRadius;//To determine if the two bubbles are touching, we need to add the radii of both bubbles together. If the distance between the two bubbles is LESS THAN the sum of their radii, then they are overlapping.
            return [(distance < sumOfRadii), distance, sumOfRadii, dx, dy]; //This returns true if the two bubbles are overlapping, and false if they are not. This is important because we want to make sure that the player does not overlap with any obstacles - I could have used an if statement, but I wanted to return a boolean value that could be used in other parts of the code.
            //The return above I transformed into the an array with distance, sumOfRadii, dx, and dy so that it would return more than just true or false as it did originally. By doing this, I can use it in Player class to calculate collision resolution vector. REMEMBER THE ORDER OF THE VALUES AND THEIR INDECES: [0] = true/false, [1] = distance, [2] = sumOfRadii, [3] = dx, [4] = dy.
        }
        init() {
            let attempts = 0;
            //The below while loop ensures that the obstacles are not overlapping with each other. It does this by checking the distance between each obstacle and the player. If the distance is less than the sum of the radii of the two circles, it means that they are overlapping. If they the sum is equal it means they are touching but not overlapping. If they are overlapping, it will try to create a new obstacle until it finds one that is not overlapping with the player or any other obstacles.
            //The while loop will keep trying to create a new obstacle until it finds one that is not overlapping with the player or any other obstacles. If it can't find one after 500 attempts, it will stop trying.
            while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
                let testObstacle = new Obstacle(this); // THIS CREATES A NEW OBSTACLE OBJECT WHEN WE CREATE AN INSTANCE OF THE GAME CLASS. BY STRUCTURING IT LIKE THIS (INCLUNDING WITH THE THIS KEYWORD PASSED AS AN ARGUMENT), WE ENSURE THAT THE PLAYER LOADS WHEN THE GAME LOADS.
                let overlap = false;
                this.obstacles.forEach(obstacle => {
                    const dx = testObstacle.collisionX - obstacle.collisionX;
                    const dy = testObstacle.collisionY - obstacle.collisionY;

                    const distance = Math.hypot(dy, dx); // THIS CALCULATES THE DISTANCE BETWEEN THE PLAYER AND THE MOUSE ALONG THE HYPOTENUS. DY MUST GO FIRST IN THIS BUILT IN METHOD
                    // The below puts distance between the obstacles by 100px. I then added that new variable to ny sumofRadii variable. It is by putting it there that I added the space.
                    const distanceBuffer = 100; //Adds more space between the obstacles in addition to the collision radius bubble that was accounted for in the while loop above.
                    const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer; // THIS CALCULATES THE SUM OF THE RADIUSES OF THE TWO CIRCLES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.
                    if (distance < sumOfRadii) {
                        overlap = true; // THIS SETS THE OVERLAP VARIABLE TO TRUE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.
                    }
                });
                const margin = testObstacle.collisionRadius
                if (!overlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.spriteX && testObstacle.collisionY > this.topMargin + margin && testObstacle.collisionY < this.height - margin) { // THIS CHECKS IF THE OBSTACLE IS NOT OVERLAPPING WITH THE PLAYER OR ANY OTHER OBSTACLES. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE OBSTACLES ARE NOT OVERLAPPING.
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