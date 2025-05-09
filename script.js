// THIS MAKES SURE THAT ALL IMAGES ARE LOADED BEFORE THE SCRIPT RUNS. THIS IS IMPORTANT BECAUSE WE NEED TO KNOW THE SIZE OF THE IMAGES. TO CALCULATE THE SIZE OF THE CANVAS N.B. THE COMMENT IN THE STYLES.
window.addEventListener('load', function () {
    //WE FIRST MUST POINT JS TO THE CANVAS ELEMENT
    const canvas = document.getElementById('canvas1');
    //2D IS A CONTEXT TYPE THAT ALLOWS US TO DRAW 2D SHAPES AND IMAGES.WE THEN SET THE CANVAS SIZE TO THE WINDOW SIZE. WE THEN GET THE 2D CONTEXT OF THE CANVAS, WHICH IS BUILT INTO HTML5. 
    const ctx = canvas.getContext('2d');

    // canvas.width = 1280;
    // canvas.height = 720;
    canvas.width = 1366;
    canvas.height = 599;

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
            this.collisionY = this.game.height * 0.5; // THIS MEANS THAT THE PLAYER WILL START IN THE MIDDLE OF THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT THE PLAYER TO START IN THE MIDDLE OF THE SCREEN.
            this.collisionradius = 30;

        }
        //passing context allows us to specify which canvas we want to draw on.
        draw(context) {//firrst you will draw a circle to represent the player.

            context.beginPath(); // THIS STARTS A NEW PATH. A PATH IS A SERIES OF POINTS THAT DEFINE A SHAPE.
            context.arc(this.collisionX, this.collisionY, this.collisionradius, 0, Math.PI * 2)//this takes at least 5 arguments: X & Y coordinates, radius, start & end angles (in radians measured from the positive x-axis).

            context.save() // THIS SAVES THE CURRENT STATE OF THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT WE CAN RESTORE THE CANVAS TO ITS ORIGINAL STATE LATER. "THIS SAVES A SNAPSHOT OF THE CANVAS STATE, INCLUDING THE CURRENT TRANSFORM, CLIP, AND STROKE/FILL STYLES."
            context.globalAlpha = 0.5; // THIS SETS THE GLOBAL ALPHA FOR THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE PLAYER IS SEMI-TRANSPARENT.

            context.fill(); // THIS FILLS THE PATH WITH THE CURRENT FILL STYLE. BY DEFAULT, THE FILL STYLE IS BLACK.

            context.restore(); // THIS RESTORES THE CANVAS TO ITS ORIGINAL STATE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT WE CAN RESTORE THE CANVAS TO ITS ORIGINAL STATE LATER.

            context.stroke(); // THIS DRAWS THE PATH WITH THE CURRENT STROKE STYLE. BY DEFAULT, THE STROKE STYLE IS BLACK.


        }
    }

    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this); //  THIS CREATES A NEW PLAYER OBJECT WHEN WE CREATE AN INSTANCE OF THE GAME CLASS. BY STRUCTURING IT LIKE THIS (INCLUNDING WITH THE THIS KEYWORD PASSED AS AN ARGUMENT), WE ENSURE THAT THE PLAYER LOADS WHEN THE GAME LOADS.

            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false,
            }

            //USE CANVAS INSTEAD OF WINDOW TO GET THE MOUSE POSITION RELATIVE TO THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE POSITION IS RELATIVE TO THE CANVAS AND NOT THE WINDOW.
            window.addEventListener('mousedown', e => {
                this.mouse.x = e.offsetX; // THIS GETS THE X POSITION OF THE MOUSE RELATIVE TO THE CANVAS. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE POSITION IS RELATIVE TO THE CANVAS AND NOT THE WINDOW. this is pulled from line 52.
                this.mouse.y = e.offsetY

                this.mouse.pressed = true; // THIS SETS THE MOUSE PRESSED PROPERTY TO TRUE. THIS IS IMPORTANT BECAUSE WE WANT TO MAKE SURE THAT THE MOUSE IS PRESSED WHEN WE CLICK ON THE CANVAS.
            })

            window.addEventListener('mouseup', e => {
                this.mouse.x = e.offsetX
                this.mouse.y = e.offsetY
                this.mouse.pressed = false;
            })

            window.addEventListener('mousemove', e => {
                this.mouse.x = e.offsetX
                this.mouse.y = e.offsetY

                console.log(this.mouse.x, this.mouse.y);
            })
        }

        render(context) { //this method performs the drawing of the player on the canvas. It takes a context argument, which is the 2D context of the canvas.
            this.player.draw(context);
        }
    }
    const game = new Game(canvas); // THIS CREATES A NEW GAME OBJECT WHEN THE PAGE LOADS.
    game.render(ctx); // THIS CALLS THE RENDER METHOD OF THE GAME OBJECT, WHICH DRAWS THE PLAYER ON THE CANVAS.
    console.log(game);


    function animate() {

    }

});