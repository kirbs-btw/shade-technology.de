var bar1 = document.getElementById('info-banner-bar-1');
var bar2 = document.getElementById('info-banner-bar-2');
var bar3 = document.getElementById('info-banner-bar-3');
var bar4 = document.getElementById('info-banner-bar-4');
var bar5 = document.getElementById('info-banner-bar-5');

;(function(){

  var throttle = function(type, name, obj){
    var obj = obj || window;
    var running = false;
    var func = function(){
      if (running){ return; }
      running = true;
      requestAnimationFrame(function(){
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("scroll", "optimizedScroll");
})();

window.addEventListener("optimizedScroll", function(){

  console.log(window.pageYOffset);
  if (window.matchMedia("(max-width: 1200px)").matches){
    bar1.style.width = (window.pageYOffset * 0.3) + "px";
    bar2.style.width = (window.pageYOffset * 0.45) + "px";
    bar3.style.width = (window.pageYOffset * 0.2) + "px";
    bar4.style.width = (window.pageYOffset * 0.35) + "px";
    bar5.style.width = (window.pageYOffset * 0.4) + "px";
  }
  else{
    bar1.style.width = (window.pageYOffset * 0.6) + "px";
    bar2.style.width = (window.pageYOffset * 0.9) + "px";
    bar3.style.width = (window.pageYOffset * 0.4) + "px";
    bar4.style.width = (window.pageYOffset * 0.7) + "px";
    bar5.style.width = (window.pageYOffset * 0.8) + "px";
  }
})
