/**
 * Created by xql on 2016/5/5.
 */
var x, y, cx, cy, spikes, outerRadius, innerRadius, opacity,
    clearRect = false;
    creatStars = [],
    startHeight = 0,
    c = document.getElementById('s'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    getNum = 0,
    ctx = c.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, w, h);

    var con = document.getElementsByClassName('con')[0];
    var complete = document.getElementsByClassName('complete')[0];
    con.style.marginTop = (h-80)/2+'px';

    function genStar(x, y, cx, cy, spikes, outerRadius, innerRadius, opacity){
        this.x = x;
        this.y = y;
        this.cx = cx;
        this.cy = cy;
        this.spikes = spikes;
        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.opacity = opacity;
        this.ctx = ctx;
        this.time = 0;
        this.height = h;
    }
    genStar.prototype = {
        draw:function(){
            var context = this.ctx;
            var opacity = this.opacity?this.opacity:1;
            var outerRadius = this.outerRadius;
            var innerRadius = this.innerRadius;
            var rot = Math.PI / 2 * 3;
            var x = this.x;
            var y = this.y;
            var cx = this.cx;
            var cy = this.cy;
            var spikes = this.spikes;
            var step = Math.PI / spikes;

            // Save the context
            context.save();

            // move into the middle of the canvas, just to make room
            context.translate(this.x, this.y);
            context.beginPath();
            context.moveTo(cx, cy - outerRadius);
            for (i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                context.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                context.lineTo(x, y);
                rot += step;
            }
            context.lineTo(cx, cy - outerRadius);
            context.closePath();
            context.fillStyle = "rgba(255, 255, 200, "+opacity+")";
            context.shadowBlur = 5;
            context.shadowColor = '#ffff33';
            context.fill();

            context.restore();
        },
        update: function(){
            this.y += 9.8*this.time*this.time;
            this.opacity = Math.random().toFixed(1);
            if(this.y>=this.height){
                this.y = this.height;
            }
        }
    };

    animation();
    function animation(){
        if(!clearRect){
            for(var i=0;i<parseInt(Math.random()*10);i++){
                x = parseInt(Math.random()*w);
                y = parseInt(startHeight+10);

                spikes = parseInt(Math.random()*10);
                switch (spikes){
                    case 1:case 2:case 3:
                        spikes = 4;
                        break;
                    case 4:case 5:case 6:
                        spikes = 5;
                        break;
                    case 7:case 8:case 9:
                        spikes = 6;
                        break;
                    default :
                        spikes = 5;
                }

                cx = 0;
                cy = 0;

                outerRadius = parseInt(Math.random()*100)?10:parseInt(Math.random()*10);
                outerRadius = outerRadius==6?10:outerRadius;

                var $genStar = new genStar(x, y, cx, cy, spikes, outerRadius, 6);
                var cols = 0;
                if(creatStars.length>0){
                    for(var i=0;i<creatStars.length;i++){
                        var one = creatStars[i];
                        if(one.x+15>$genStar.x&&one.x-15<$genStar.x){
                            console.log(i)
                            cols++;
                        }
                    }
                    $genStar.height = h-cols*15;
                    if($genStar.height<0){
                        clearRect = true;
                        complete.style.display = 'block';
                    }
                }
                creatStars.push($genStar);
            }
        }

        for(var i=0;i<creatStars.length;i++){
            var one = creatStars[i];
            one.time += 0.5;
            one.draw();
            one.update();
        }
    }

    var interval = setInterval(function(){
        ctx.clearRect(0,0,w,h);
        animation()
    }, 300);


