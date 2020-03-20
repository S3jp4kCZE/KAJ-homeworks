class World
{
    constructor()
    {
        this.viruses = []
        this.pandemicLoad = 0;
        this.image = new Image();
        this.image.src = "./map.png";
        this.generateTime = 1300;
        this.lastGenerate = 0;

        this.speedTime = 4000;
        this.lastSpeed = 0;
        this.valueSpeedUp = 100;
    }

    draw(ctx)
    {
        if(this.image.complete)
            ctx.drawImage(this.image,0,0);
        else
            this.image.onload= () => {ctx.drawImage(this.image,0,0)};

        for(var i = 0;i < this.viruses.length;i++)
            this.viruses[i].draw(ctx);
        console.log(this.pandemicLoad);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = 'red';
        ctx.fillRect(0,0,this.pandemicLoad,this.image.height);
        ctx.globalAlpha = 1;
    }

    pandemic(value)
    {
        this.pandemicLoad += value;
        if(this.pandemicLoad < 0)
            this.pandemicLoad = 0;
    }

    isMaxPandemic()
    {
        return (this.pandemicLoad >= this.image.width);
    }

    generate()
    {
        var datenow = Date.now();
        if(datenow - this.lastSpeed >= this.speedTime)
        {
            this.lastSpeed = datenow;
            this.generateTime -= this.valueSpeedUp;
            this.speedTime += 500;
        }
        if((datenow - this.lastGenerate) >= this.generateTime)
        {
            this.lastGenerate = datenow;
            this.viruses.push(new Virus(Math.random()*694 ,Math.random()*429));
        }
    }
}