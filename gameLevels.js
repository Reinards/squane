var score = 0;
var gThisColor = 0;
var gray = false;
var maxColors = 5;
var maxRows = 4;

var thisLevel = 0;

function splash(n){
    setTimeout(function(){
        location.replace("menu.html");
    }, n);
}

var level = {
    rows: 2,
    colors: 2,
    speed: 0
};
var actualLevel = {
    rows: 2,
    colors: 2,
    speed: 0
};

var speedData = [
    2500,
    2000,
    1500,
    1000,
    750
];

var clicks = [];
var squanesLeft = 0;

function mainLevelFunction() {
    
    var waitTime = 1500;
    if(thisLevel==0) waitTime = 0;

    setTimeout(function(){
        generateLevelData();
        document.getElementById("lvl").innerHTML = "Līmenis: " + (thisLevel+1);
        resetSquares(level.rows * level.rows);
        document.getElementById("currentPlace").innerHTML = "";
        gThisColor = 0;

        createSquares();
    },waitTime);
}

function resetSquares(n) {
    for (var i = 0; i < n; i++) {
        clicks[i] = 0;
    }
}

var ans = [];

function createSquares() {
    var cellCount = level.rows * level.rows;

    squanesLeft = cellCount;
    var squaneTable = "";

    for (var i = 0; i < cellCount; i++) {
        var thisColor = Math.floor(Math.random() * (level.colors));
        ans[i] = thisColor;
        squaneTable = squaneTable + "<div onclick='choiseDone(" + i + "," + thisLevel + ");' class='block size" + level.rows + " color" + thisColor + "' id='block" + i + "'></div>";
        //alert(squaneTable);
    }
    document.getElementById("gameTable").innerHTML = squaneTable;
    var thisSpeed = speedData[level.speed];
    setTimeout(hideSquares, thisSpeed);
}

function hideSquares() {
    var cellCount = level.rows * level.rows;
    for (var i = 0; i < cellCount; i++) {
        var el = document.getElementById("block" + i);
        el.className = el.className + " no-color";
    }
    
    gray=true;
    startInvestigation();
}

function startInvestigation() {
    document.getElementById("currentPlace").innerHTML = "<div onclick='nextColor();' class='choise color" + gThisColor + "'></div>";
}

function choiseDone(i) {
    var choise = null;
    if ($("#block" + i).hasClass("color0")) choise = 0;
    else if ($("#block" + i).hasClass("color1")) choise = 1;
    else if ($("#block" + i).hasClass("color2")) choise = 2;
    else if ($("#block" + i).hasClass("color3")) choise = 3;
    else if ($("#block" + i).hasClass("color4")) choise = 4;

    if (clicks[i] != 1 && gray) {
        clicks[i] = 1;
        squanesLeft--;
        if (choise == gThisColor) {
            // Izvēlēts pareizais kvadrārs
            score += 1;

        } else {
            // Izvēlēts nepareizais kvadrārs
            score += -2 * ( Math.floor(score / 10) +1 );
        }
    }
    document.getElementById("score").innerHTML = "Punkti: " + Math.max(score,0);
    $("#block" + i).removeClass("no-color");

    if(score<0){
        gameOver();
    }

    if(squanesLeft<1){
        thisLevel++;
        mainLevelFunction();
    }
}

function nextColor(){
    if(squanesLeft>0){

        gThisColor++;
        if(gThisColor==level.colors){
            score = score + squanesLeft*(  -2 * (Math.floor(score / 10) +1 ) );
            document.getElementById("score").innerHTML = "Punkti: " + Math.max(score,0);
            if(score<0){
                gameOver();
            } else {
                thisLevel++;
                mainLevelFunction();
            }
        }
        startInvestigation();
    }
}

function gameOver(){
    $("#currentPlace").hide();
    document.getElementById("gameTable").innerHTML = "<h1 style='text-align:center;'>Spēles beigas!<h1><div style='width:94%;margin-left:3%;margin-right:3%;background-color:#333333;padding-top:4%;border-radius:4px;color:white;'><p style='margin:0px;text-align:center'>Sasniegtais līmenis</p><h3 style='text-align:center;margin-top:5px;'>"+(thisLevel+1)+"<a href='game.html' class='again'>Spēlēt vēlreiz</a></div>";
}

function generateLevelData(){ // level .rows .colors .speed
    var maxSpeed = 4;
    if(actualLevel.colors == 2) {
        maxSpeed = 5;
    }
    ++actualLevel.speed;

    if(actualLevel.speed==maxSpeed){
        actualLevel.speed = 0;
        actualLevel.colors++;
    }
    if(actualLevel.colors==maxColors){
        actualLevel.colors = 2;
        actualLevel.rows++;
    }
    if(actualLevel.rows==maxRows){
        actualLevel.colors = maxColors-1;
        actualLevel.rows--;
    }

    level.rows = actualLevel.rows;
    level.colors = actualLevel.colors;
    level.speed = actualLevel.speed;

    if(thisLevel>=8){
        var thisCase = Math.floor(Math.random() * 7);

        if(thisCase==1){
            level.rows = 4;
            level.colors = 2;
            level.speed = Math.floor(Math.random() * 2);
        }
    }

    gray = false;
}

window.onload = function() {
    mainLevelFunction();
}