class Player
{
    constructor()
    {
        this.position = {"x": 0,"y": 0}
        this.missed = 0;
        this.eliminated = 0;
        this.control = "mouse";
        this.image = new Image();
        this.image.src = "./crosshair.png";
        this.strike = false;
    }

    draw(ctx)
    {
        if(this.image.complete)
            ctx.drawImage(this.image,this.position.x - (this.image.width/2),this.position.y - (this.image.height/2));
        else
            this.image.onload= () => {ctx.drawImage(this.image,this.position.x - (this.image.width/2),this.position.y - (this.image.height/2))};
    }

    virusOverLapping(virus)
    {
        var x = this.position.x;
        var y = this.position.y;
        var virX = virus.position.x;
        var virY = virus.position.y;
        var virW = virus.image.width;
        var virH = virus.image.height;
        return ((x > virX && x < (virX+virW)) && (y > virY && y < (virY+virH)));
    }

    mouseEvents(canvas)
    {
        var move = function(event){
            if(this.control != "mouse")
                return
            var rect = canvas.getBoundingClientRect();
            this.position.x = event.clientX - rect.left;
            this.position.y = event.clientY - rect.top;
        }
        var strike = function(event){
            if(this.control != "mouse")
                return
            this.strike = true;
        }

        canvas.addEventListener("mousemove",move.bind(this));
        canvas.addEventListener("click",strike.bind(this));
    }

    keyboardEvnets()
    {
        var move = function(event){
            if(this.control != "keyboard")
                return
            if(event.key == "w")
                this.position.y -= 25;
            if(event.key == "s")
                this.position.y += 25;
            if(event.key == "a")
                this.position.x -= 25;
            if(event.key == "d")
                this.position.x += 25;
            if(event.key == " ")
                this.strike = true;
        }

        window.addEventListener("keydown",move.bind(this));
    }
}