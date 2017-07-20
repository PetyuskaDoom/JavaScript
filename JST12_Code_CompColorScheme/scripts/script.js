console.log("...JST12 loaded scripts.js file ...");

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
	
	// Unobstrusive events with addEventListener
	document.getElementById("toggleDivH").addEventListener("click", toggle);
	
	// Need to set the height of div value before transition will work
	var htmlElement = document.getElementById("toggleDiv");
	divOrigHeight = parseFloat(window.getComputedStyle(htmlElement, null).getPropertyValue("height"));
	htmlElement.style.height = divOrigHeight + "px";

});

var divOrigHeight = "0px";

function toggle() {
	var htmlElement = document.getElementById("toggleDiv");
	if (htmlElement.style.opacity == "0") {
		console.log("Fading In");
		htmlElement.style.opacity = "1";
		htmlElement.style.height = divOrigHeight + "px";
	}
	else {
		console.log("Fading Out");		
		htmlElement.style.opacity = "0";
		htmlElement.style.height = "0px";
    }
    
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    
    // Convert the rgb values to hex values. 
    // Send the individual colors to the the rgbToHex function which returns the color value in hex format.
    var hexColorVal = rgbToHex(red, green, blue);
    
    // Assign the new hex color to random color and apply to the style.color
    // to change the text color in the div.
    var randomColor = hexColorVal; 
    
    htmlElement.style.color = randomColor; // Text color.

    // Function sourced from stackoverflow, no modifications needed.
    var compColor = hexToComplimentary(randomColor);
    
    // To confirm complementary colors, I used a color picker and got the hex color value of
    // the background and the hex color value of the text. I then input the results into a 
    // complementary colors website https://www.sessions.edu/color-calculator/ 
    // to confirm the results. For a more thourough test, each background color 
    // and it's corresponding text color should be run in a loop to capture a wide selection of data. 
    // This data could then be batch tested using an existing online tool or a bespoke testing solution.
    htmlElement.style.backgroundColor = compColor;
}


// Send the red, green and blue values to the hexValue function.
// Each color sent so this function will be called three times 
// thus building the six digit hex value with the # added to the start.
function rgbToHex(red, green, blue) {

    return "#" + hexValue(red) + hexValue(green) + hexValue(blue);
}

function hexValue(colorValue) {
    // toString(16) gets a hex value from the numeric value supplied.
    var hex = colorValue.toString(16);
    
    return hex;
}

/* hexToComplimentary : Converts hex value to HSL, shifts
 * hue by 180 degrees and then converts hex, giving complimentary color
 * as a hex value
 * @param  [String] hex : hex value  
 * @return [String] : complimentary color as hex value
 */
function hexToComplimentary(hex){

    // Convert hex to rgb
    // Credit to Denis http://stackoverflow.com/a/36253499/4939630
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0], g = rgb[1], b = rgb[2];

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if(max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if(max == r && g >= b) {
            h = 1.0472 * (g - b) / d ;
        } else if(max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if(max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if(max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h+= 180;
    if (h > 360) { 
        h -= 360; 
    }
    
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if(s === 0) {
        r = g = b = l; // achromatic
    } 
    else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255); 
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16); 
    
    return "#" + (0x1000000 | rgb).toString(16).substring(1);
}  
