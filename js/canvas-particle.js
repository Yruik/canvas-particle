function Canvas(){
    if(this.isntance){
        return this.isntance;
    }else{
        this.particles = new Array();
        return this;
    }
}

//初始化canvas
Canvas.prototype.Init = function(){
    // 清除默认边距样式
    document.styleSheets.length || document.head.appendChild(document.createElement('style'));
    document.styleSheets[0].addRule("*","margin:0px;padding:0px;");
    // 创建画布
    var canvas = document.createElement("canvas");
    // 设置画布样式
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    canvas.style.backgroundColor = "white";
    // canvas.style.background= "linear-gradient(skyblue,grey,grey,grey,#7888aa)";
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
}

Canvas.prototype.generateParticle = function(){
    var e = this;
    var canvas = e.canvas;
    var particles = e.particles;
    if(particles.length<600){
        var particle ={
            // cX:Math.ceil(Math.random()*canvas.width),
            cX:Math.ceil(canvas.width/2),
            cY:canvas.height+20,
            cO:1,
            cR:Math.ceil(Math.random()*20),
            colorR:Math.floor(Math.random()*255),
            colorG:Math.floor(Math.random()*255),
            colorB:Math.floor(Math.random()*255),
            sX:Math.random()*4-2,
            sY:Math.random()*2,
            sO:Math.random()*0.01,
            sR:0.05
        }
        particles.push(particle);
    }
}
Canvas.prototype.drawParticle = function(){
    var e = this;
    var canvas = e.canvas;
    var ctx = e.ctx;
    var particles = e.particles;
    e.generateParticle();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<particles.length;i++){
        ctx.beginPath();
        ctx.fillStyle = "rgba("+particles[i].colorR+","+particles[i].colorG+","+particles[i].colorB+","+particles[i].cO+")";
        ctx.arc(particles[i].cX,particles[i].cY,particles[i].cR,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        particles[i].cX += particles[i].sX;
        particles[i].cY -= particles[i].sY;
        particles[i].cO -= particles[i].sO;
        if(particles[i].cR<60){
            particles[i].cR += particles[i].sR;
        }
        if(particles[i].cX<=0||particles[i].cX>=canvas.width||particles[i].cY<=0||particles[i].cO<=0){
            particles.splice(i,1);
            i=i-1;
        }
    }
}
var canvas = new Canvas();
window.onload = function(){
    canvas.Init();
    canvas.interval = setInterval(function(){
        canvas.drawParticle();
    },25);
}
window.onresize = function(){
    document.body.removeChild(canvas.canvas);
    canvas.Init();
    clearInterval(canvas.interval);
    canvas.interval = setInterval(function(){
        canvas.drawParticle();
    },25);
}