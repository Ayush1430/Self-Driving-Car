const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx=carCanvas.getContext("2d");
const networkCtx=networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const N=100;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
        localStorage.getItem("bestBrain")
    );
    if(i!=0){
        NeuralNetwork.mutate(cars[i].brain,0.08);
    }
    }
    
}

const traffic=[
    new Car(road.getLaneCenter(1),-122,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-323,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-343,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-455,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-467,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-680,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-664,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1200,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-880,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-820,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-909,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-998,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1010,30,50,"DUMMY",2)
];
//console.log(road.getLaneCenter(7));
//car.draw(ctx);

animate();

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=0;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"))
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );
    
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,carCanvas.height*0.7-bestCar.y);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    //to update canvas size and redraw canvas again and again
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);
    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
    //it cause animate method again and again may times per second it gives the illusion of movement.

}