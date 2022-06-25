// Socket
var socket = io();



side = 30
var time = "";
let grassQAN = 0;
let grassetQAN = 0;
let predatorQAN = 0;
let virusQAN = 0;


function setup() {
    let button_gr = document.getElementById("Grass-btn");
    let button_ge = document.getElementById("GrassEt-btn");
    let button_pr = document.getElementById("Predator-btn");
    let button_vr = document.getElementById("Virus-btn");
    let button_cr = document.getElementById("Clear-btn");

    // code
    button_gr.onclick = () => { socket.emit("button", "gr"); console.log("Creating Grass") };
    button_ge.onclick = () => { socket.emit("button", "ge"); console.log("Creating Grass Eater") };
    button_pr.onclick = () => { socket.emit("button", "pr"); console.log("Creating Predator") };
    button_vr.onclick = () => { socket.emit("button", "vr"); console.log("Creating Virus") };
    button_cr.onclick = () => { socket.emit("button", "cr"); console.log("Cleaning matrix") };

    canvas = createCanvas(23 * side, 23 * side);
    canvas.parent("canvasParent")
    background("#acacac");
    frameRate(15)
}

setInterval(
    function () {
        socket.on('time', (yearTime) => {

            time = yearTime

        })

    }, 1000
)

function nkarel(matrixx) {
    // console.log(matrix);
    if (time == "summer") {
        console.log(time, "Time");
        document.getElementById("body").style.background = "linear-gradient(100deg, #e1eec3, #f05053)"

    }
    else if (time == "winter") {
        console.log(time, "Time");
        document.getElementById("body").style.background = "linear-gradient(100deg, #000C40, #F0F2F0)"
    }
    for (var y = 0; y < matrixx.length; y++) {
        for (var x = 0; x < matrixx[y].length; x++) {
            if (matrixx[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side)
            }
            else if (matrixx[y][x] == 1) {

                if (time == "summer") {
                    fill("green");
                }
                else if (time == "winter") {
                    fill("#ffffff");
                }
                // console.log("gr", grassArr.length);
            }
            else if (matrixx[y][x] == 2) {

                // console.log("gr_e", grassEaterArr.length);
                fill("yellow");
            }
            else if (matrixx[y][x] == 3) {
                fill("red");

                // console.log("pr", predaTor.length);
            }
            else if (matrixx[y][x] == 4) {
                fill("blue");
            }
            else if (matrixx[y][x] == 5) {
                fill("#66ff33");

            }
            rect(x * side, y * side, side, side);


        }

    }

}
// քանի որ այժմ չունենք draw ֆունկցիա, որ ավտոմատ կանչվի, այդ պատճառով այն կանչում ենք 
// setInterval մեթոդի մեջ:
//էստեղ կլիենտը լսողն է: on մեթոդը լսելով send matrix հրամանը, կատարում է նկարել ֆունկցիան
// և որպես արգումենտ վերցնում սերվերի մատրիցը լցնելուց հետո գրված emit-ի մատրիցը:
setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000

)
