//var simpleLevel = new Level(simpleLevelPlan);

elt = function(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
};

trackKeys = function(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
};

runAnimation = function(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      console.log(timeStep);
      /*var frameMil = 1000/60.0;
      var wait = frameMil-(time-lastTime);
      console.log(time);
      if (wait < 0)
        wait = 0;
      console.log(wait);*/
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};

var arrows = trackKeys(arrowCodes);

var g_level;
function runLevel(level, Display, andThen) {
  g_level = level
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}


runGame = function(plans, Display) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
};
