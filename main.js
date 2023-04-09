const canvas=document.getElementById("myCanvas");

canvas.width=200;

const ctx=canvas.getContext("2d");

const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50,"KEYS");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];
//console.log(road.getLaneCenter(7));
//car.draw(ctx);

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,canvas.height*0.7-car.y);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    //to update canvas size and redraw canvas again and again
    car.draw(ctx,"blue");

    ctx.restore();
    requestAnimationFrame(animate);
    //it cause animate method again and again may times per second it gives the illusion of movement.

}