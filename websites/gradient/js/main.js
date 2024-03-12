var count = 0;

// convert hex to decimal
const hexToDecimal = hex => parseInt(hex, 16);

// grab json obj
// async function loadNames() {
//   response = await fetch('../data/data.json');
//   dataObj = await response.json();
// }
// loadNames();

// this data is there to not have the webserver running
dataObj = [{"name":"Winter Blue","color_one":"#a2d7e5", "color_two":"#59a1d9"},
{"name":"Cold Evening","color_one":"#ea498b", "color_two":"#59a1d9"},
{"name":"Bourbon","color_one":"#ec6f66", "color_two":"#f3a183"},
{"name":"Stellar","color_one":"#7474BF", "color_two":"#348AC7"},
{"name":"Clouds","color_one":"#ECE9E6", "color_two":"#FFFFFF"},
{"name":"Moonrise","color_one":"#DAE2F8", "color_two":"#D6A4A4"},
{"name":"Peach","color_one":"#ED4264", "color_two":"#FFEDBC"},
{"name":"Dracula","color_one":"#DC2424", "color_two":"#4A569D"},
{"name":"Mantle","color_one":"#24C6DC", "color_two":"#514A9D"},
{"name":"Hard Gradient","color_one":"#000000", "color_two":"#ffffff"}];

dataObj = createJsonGradients();

changeColor();

function copyGradient(){
  console.log("hello")
  var copyText = `linear-gradient(90deg, ${dataObj[count].color_one}, ${dataObj[count].color_two})`;

  navigator.clipboard.writeText(copyText);

  // Alert the copied text
  alert("Copied the text: " + copyText);
}

function lastColor(){
  if ((count) == 0) {
    count = Object.keys(dataObj).length;
  }

  count -= 1;
  changeColor();
}

function nextColor(){
  // console.log(Object.keys(dataObj).length);
  // console.log(count);

  if ((count + 1) == Object.keys(dataObj).length) {
    count = -1;
  }

  count += 1;
  changeColor();
}

function changeColor(){
  document.getElementById('bg').style.background = `linear-gradient(90deg, ${dataObj[count].color_one}, ${dataObj[count].color_two})`;
  // document.getElementById('gradientNameH1').innerHTML = `${dataObj[count].name}`;
  document.getElementById('colorOne').innerHTML = `${dataObj[count].color_one}`;
  document.getElementById('colorTwo').innerHTML = `${dataObj[count].color_two}`;

  textColToLight();
}

function textColToLight(){
  // geting the light val of the avg of the r g b value
  // the threshold can be changed in the if

  var hexCodeOne = `${dataObj[count].color_one}`.slice(1);
  var hexCodeTwo = `${dataObj[count].color_two}`.slice(1);

  var lightValueOne = getLightLvl(hexCodeOne);
  var lightValueTwo = getLightLvl(hexCodeTwo);

  var lightAvg = (lightValueOne + lightValueTwo) / 2;

  // 175 is a working threshold
  // more testing needed
  if (lightAvg > 175) {
    var textCol = '#00000030';
    var hexTextCol = '#00000050';
    var buttonCol = '#00000030';
  }
  else {
    var textCol = '#ffffff30';
    var hexTextCol = '#ffffff';
    var buttonCol = '#ffffff60';
  }

  document.getElementById('gradientNameH1').style.color = textCol;
  document.getElementById('colorOne').style.color = hexTextCol;
  document.getElementById('colorTwo').style.color = hexTextCol;
  document.getElementById('back').style.color = buttonCol;
  document.getElementById('next').style.color = buttonCol;
}

// the one line func would be
// const getLightLvl = color => (hexToDecimal(color.slice(0, 2)) + hexToDecimal(color.slice(2, 4)) + hexToDecimal(color.slice(4, 6))) / 3;
// sometimes there should not be one :)

function getLightLvl(color){
  var r = hexToDecimal(color.slice(0, 2));
  var g = hexToDecimal(color.slice(2, 4));
  var b = hexToDecimal(color.slice(4, 6));

  return (r + g + b) / 3;
}

// ----------------------------------------------------------------------------------------------------
// i'm having trouble importing an other js file so here is the rest of the other file

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
  // creates a Json obj with 1000 random gradients
  var data = [];

  for (var i = 0; i < 1000; i++) {
    var colors = generateGradient();
    var colorOne = colors[0];
    var colorTwo = colors[1];

    var newLine = {"name":`${i}`,"color_one":`${colorOne}`, "color_two":`${colorTwo}`};
    console.log(newLine);

    data.push(newLine);
  }

  return data;
}
