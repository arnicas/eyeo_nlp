

/*
The spiral is an SVG path initializeded with an M command at its center, with enough following S command points to
provide a 'smooth' curve. The points are created using the equation for a spiral.
*/

function getSpiralPath(dir, points, center, separation, revs) {

    // 1, 300, [200,200], 30, 4
    //---dir=1: clockwise, dir=-1: counterclockwise
    var dir=1;

    var SpiralPnts=points;
    var CenterX=center[0];
    var CenterY=center[1];
    var Separation=separation;
   // ---distance between each turn---
    var S=Separation/(2*Math.PI);
    var Revs=revs;
    //---degrees of seperation between points---
    var DegSep=(2*Math.PI*Revs/SpiralPnts);

    //---the path element---
    for(var i=0;i<SpiralPnts;i++)
    {
        var NextAngle=dir*DegSep*i;
        var Ax=(S*NextAngle)*Math.cos(NextAngle)+CenterX;
        var Ay=(S*NextAngle)*Math.sin(NextAngle)+CenterY;
        if (i==0) {
            var pathPnts="M"+rnd1(Ax)+" "+rnd1(Ay)+" S ";
            }
        else {
           pathPnts+=rnd1(Ax)+" "+rnd1(Ay)+" ";
        }
    }
    if (SpiralPnts/2+"".indexOf(".5")!=-1) {
        pathPnts+=rnd1(Ax)+" "+rnd1(Ay) //---last point 'odd' to finish curve--
    }

    return pathPnts;
}

//--returns 1 decimal place---
function rnd1(num) {
    var dp1=Math.round(num*10)/10;
    return dp1;
}
