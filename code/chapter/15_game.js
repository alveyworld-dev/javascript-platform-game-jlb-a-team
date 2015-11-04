function Player(){}
function Enemy(){}
function Coin(){}
function DOMDisplay(){}
function Lava(){}
function Level(){}
function Vector(){}

var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];

var actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};

var scale = 20;

var maxStep = 0.05;

var wobbleSpeed = 8, wobbleDist = 0.07;

var playerXSpeed = 7;

var gravity = 30;
var jumpSpeed = 17;

var arrowCodes = {37: "left", 38: "up", 39: "right"};

