class Virus
{
    constructor(x,y)
    {
        this.position = {"x": x,"y": y}
        this.time = 0;
        this.lastInvoked = Date.now();
        this.maxTime = 1500;
        this.image = new Image();
        this.image.src = "./virus.png";
    }

    draw(ctx)
    {
        if(this.image.complete)
            ctx.drawImage(this.image,this.position.x,this.position.y);
        else
            this.image.onload= () => {ctx.drawImage(this.image,this.position.x,this.position.y)};
    }

    addTime()
    {
        this.time += Date.now() - this.lastInvoked;
        this.lastInvoked = Date.now();
    }

    isOvertime()
    {
        return this.time > this.maxTime;
    }
}