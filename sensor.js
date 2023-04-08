class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;
        this.rayLength=150;
        this.raySpread=Math.PI/3;

        this.rays=[];
        this.readings=[];
    }
    update(roadBorders){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders)
            );
        }
    }

    #getReading(ray,roadBorders){
        
    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x,y:this.car.y};
            const end={
                x:this.car.x-Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-Math.cos(rayAngle)*this.rayLength
            };
            //console.log(start,end);
            this.rays.push([start,end]);
        }
    }

    draw(ctx){

        //console.log(this.rays[0][0].x);

        for(let i=0;i<this.rayCount;i++){
            //console.log(i);
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="#20dcfc";
            ctx.moveTo(
                this.rays[i][0].x, 
                this.rays[i][0].y
            );
            ctx.lineTo(
                this.rays[i][1].x, 
                this.rays[i][1].y
            );
            ctx.stroke();
            // var image = new Image();
            // image.src = "./beam.png";
            // ctx.drawImage(image, this.rays[i][0].x, this.rays[i][0].y, this.rays[i][1].x, this.rays[i][1].y);
            //ctx.moveTo()
        }
    }
    
}