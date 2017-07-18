console.log("... script.js loaded ...");

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// Draw some squares.
for(var i = 0; i < 40; i++) {
	
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	var red = Math.random() * 256;
	var green = Math.random() * 256;
	var blue = Math.random() * 256;
	var transparency = Math.floor(Math.random() * 10);
	
	if (transparency < 3) {
		transparency = 3;
	}
	
	if (transparency > 3) {
		transparency = 7;
	}
	
	c.fillStyle = "rgba(" + red + ", " + green + ", " + 
			blue + ", ." + transparency + ")";
			
	c.fillRect(x, y, 100, 100);
	console.log(transparency);
}

// Draw some lines.
var x = Math.random() * window.innerWidth;
var y = Math.random() * window.innerHeight;

c.beginPath();
c.moveTo(x, y);

for(var i = 0; i < 20; i++) {

	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	
	var red = Math.random() * 256;
	var green = Math.random() * 256;
	var blue = Math.random() * 256;
	
	c.lineTo(x, y);
	c.lineWidth = 10;
	c.lineJoin = "round";
	c.strokeStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
}
c.stroke();

  
// Draw some circles.
for(var i = 0; i < 10; i++) {
	
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;

	var red = Math.random() * 256;
	var green = Math.random() * 256;
	var blue = Math.random() * 256;

	c.beginPath();
	c.arc(x, y, 30, 0, Math.PI * 2, false);
	c.lineWidth = 5;
	c.strokeStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
	c.stroke();
}
