class Game
{
    constructor()
    {
        this.world = new World();
        this.player = new Player();
        this.canvas = document.querySelector("#game-canvas");
        this.context = this.canvas.getContext("2d");
        this.player.mouseEvents(this.canvas);
        this.player.keyboardEvnets();
        this.gameOver = new Image();
        this.gameOver.src = "./gameover.png";

    }

    exec()
    {
        var start = function(){
            this.world = new World();
            this.player = new Player();
            this.start = true;
            this.player.mouseEvents(this.canvas);
            this.player.keyboardEvnets();
            if(document.querySelector("#mouse-control").checked == true)
                this.player.control = "mouse";
            else
                this.player.control = "keyboard";
        }

        document.querySelector("#new-game").addEventListener("click",start.bind(this));
        setInterval(this.gameLoop.bind(this),60);
    }

    gameLoop()
    {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.world.draw(this.context);
        this.player.draw(this.context);
        if(!this.start)
            return;
        var viruses = this.world.viruses;
        if(this.world.isMaxPandemic())
        {
            this.context.drawImage(this.gameOver,766/2 - 349/2,499/2 - 196/2);
            return;
        }

        for(var i = 0;i < viruses.length;i++)
        {
            if(this.player.virusOverLapping(viruses[i]) && this.player.strike)
            {
                console.log("bom");
                this.player.strike = false;
                this.player.eliminated += 1;
                this.world.pandemic(-10);
                viruses.splice(i--,1)
                continue;
            }
            else if(viruses[i].isOvertime())
            {
                this.player.missed += 1;
                this.world.pandemic(+50);
                viruses.splice(i--,1)
                continue;
            }
            viruses[i].addTime();
        }
        this.player.strike = false;
        this.world.generate();
        this._updateData();
    }

    _updateData()
    {
        var summary = this.player.eliminated - this.player.missed;
        document.querySelector("#score").textContent = "Summary Score: " + summary;
        document.querySelector("#pandemic").textContent = "Pandemic Percent: " + ((this.world.pandemicLoad*100)/this.canvas.width).toFixed(2);
        document.querySelector("#eliminated").textContent = "Eliminated Viruses: " + this.player.eliminated;
        document.querySelector("#missed").textContent = "Missed Viruses: " + this.player.missed;
    }
}

var coronavirus = new Game();
coronavirus.exec();

