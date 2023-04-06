count = 0;

slideCount = 4;
slidePercent = 100 / slideCount;

function swipeRight(){
  console.log(count);
  if (count == (slideCount-1)) {
    count = -1;
  }
  count++;
  text = "translateX(" + (-(count)) * slidePercent + "%)";
  console.log(text);
  document.getElementById("scroll-container").style.transform=text;
  console.log("");
}

function swipeLeft(){
  console.log(count);
  if (count == 0) {
    count = slideCount;
  }
  count--;
  text = "translateX(" + (-(count)) * slidePercent + "%)";
  console.log(text);
  document.getElementById("scroll-container").style.transform=text;
  console.log("");
}
