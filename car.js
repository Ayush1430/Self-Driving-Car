//box2d can be used
class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.6;
        this.maxSpeed=10;
        this.friction=0.05;
        this.angle=0;

        this.sensor=new Sensor(this);
        this.control=new Controls();
    }

    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
    }
    #move(){
        if(this.control.forward){
            this.speed+=this.acceleration;
        }
        if(this.control.backward){
            this.speed-=this.acceleration;
        }
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.control.left){
                this.angle+=0.03*flip;
            }
            if(this.control.right){
                this.angle-=0.03*flip;
            }
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
    draw(ctx){
        
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        //ctx.beginPath();
        var image = new Image();
        image.src = "./ironman.png";
        ctx.drawImage(image, -this.width/2, -this.height/2, this.width, this.height);
        // ctx.rect(
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // );
        //ctx.fillStyle = "yellow";
        //ctx.fill();

        ctx.restore();
        //console.log(this.sensor.rays[0][0].x);
        this.sensor.draw(ctx);
    }
}