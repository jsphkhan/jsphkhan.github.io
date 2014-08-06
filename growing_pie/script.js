(function () {
    //Variables - following single variable pattern
    var colorArr = [ '#bca37d','#94ca23','#fcf579','#fdda2a','#8adbd0','#4dbeaa','#945a13','#fdb724','#7eac1a','#f28d36','#917f6d','#b3f2c4'], //sample color data
        pieData = [95, 60, 38, 45, 23, 56, 88, 120, 73], //sample data        
        startAngle = 0,
        endAngle = 0,
        sectorAngle = 0,
        total = 0,        
        radius = 150, 
        donutRadius = 70,
        cx = 200,
        cy = 200,
        animSpeed = 500,
        paper = Raphael('canvas'),
        path = null; 

    //creates a custom attribute 'sector' for a Rapahel path
    paper.customAttributes.sector = function(cx, cy, r, startAngle, endAngle) {
        var rad = Math.PI / 180,
            x1 = cx + r * Math.cos(startAngle * rad),
            x2 = cx + r * Math.cos(endAngle * rad),
            y1 = cy + r * Math.sin(startAngle * rad),
            y2 = cy + r * Math.sin(endAngle * rad),
            flag = (Math.abs(endAngle - startAngle) > 180);

        return {
            path:[["M", cx, cy,],["L", x1, y1,],["A", r, r, 0, +flag, 1, x2, y2,],["z"]]
        }
    }


    //CALCULATE THE TOTAL
    for(var k=0; k < pieData.length; k++){
        total += pieData[k];
    }
    
    //CALCULATE THE ANGLES THAT EACH SECTOR SWIPES AND STORE IN AN ARRAY
    for(k=0; k < pieData.length; k++){
        sectorAngle = 360 * pieData[k]/total;   //calculate the sector angle for a pie slice
        
        startAngle = endAngle;  //the start angle for each pie slice
        endAngle = startAngle + sectorAngle;  //the end angle for each pie slice

        //create a rapahel path with the custom pie 'sector' attribute that we defined above. Start angle initially is 0
        path = paper.path().attr({sector:[cx, cy, radius, 0, 0], stroke:'#fff', "stroke-width":1, "stroke-linejoin" : "round","stroke-linecap" : "round", fill:colorArr[k]}).data("id", k).click(function() {
            alert(this.data("id")); //I have also added a click event for each slice. This is just in case you need to handle a pie slice click
        });

        //change the pie sector attribute over time - this is where the animation happens
        path.animate({sector:[cx, cy, radius, startAngle, endAngle]}, animSpeed, function() {
            console.log('callback function called after animation');
        });          
    }    
    
    //create the donut for the pie chart. If you don't need it then remove this part
    paper.circle(cx, cy, donutRadius).attr({"fill":"#fff", "stroke": "#fff"});
})();

