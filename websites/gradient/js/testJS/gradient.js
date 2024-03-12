function generateHslColor(){
  var h = Math.floor(Math.random() * 360);
  var s = Math.floor(Math.random() * 30 + 60 )
  var l = Math.floor(Math.random() * 80 + 20)

  return [h, s, l];
}

function hexToHsl(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return [h, s, l];
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateGradient(){
  var colorOneHsl = generateHslColor();
  var colorOne = hslToHex(colorOneHsl[0], colorOneHsl[1], colorOneHsl[2]);

  var hChange = Math.floor(Math.random() * 14 + 18);
  var sChange = Math.floor(Math.random() * 10 + 20);
  var lChange = Math.floor(Math.random() * 10 + 10);

  var colorTwoValues = [(colorOneHsl[0] + hChange), (colorOneHsl[1] - sChange) ,(colorOneHsl[2] - lChange)];
  var colorTwo = hslToHex(colorTwoValues[0], colorTwoValues[1], colorTwoValues[2]);

  return [colorOne, colorTwo];
}

function changeBG(){
  var colors = generateGradient();
  var colorOne = colors[0];
  var colorTwo = colors[1];

  document.getElementById('bg').style.background = `linear-gradient(90deg, ${colorOne}, ${colorTwo})`;
}

function createJsonGradients(){
  // creates a Json obj with 100 random gradients
  var data = [];

  for (var i = 0; i < 100; i++) {
    var colors = generateGradient();
    var colorOne = colors[0];
    var colorTwo = colors[1];

    var newLine = {"name":"","color_one":`${colorOne}`, "color_two":`${colorTwo}`};
    console.log(newLine);

    data.push(newLine);
  }

  return data;
}
