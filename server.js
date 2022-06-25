//առաջին 10 տողը նույնությամբ գրիր, որպեսզի լոկալհոստ ունենաս
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
// const Virus = require('./virus');
var time = 0

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

let grassQAN = 0;
let grassetQAN = 0;
let predatorQAN = 0;
let virusQAN = 0;

//10

//քո սկրիպտ ֆայլից տպի մատրիցդ գեներացնոլու հատվածը և դատարկ զանգվածը
// ինձ մոտ այն չի գեներացվում,,,քեզ մոտ լաաաավ կլինի , որ գեներացվի
function generate(matLen, gr, grEat, pRed, GB, vr) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pRed; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < GB; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }

    for (let i = 0; i < vr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
    return matrix
}

vr_spawn = Math.round(Math.random())


matrix = generate(25, 15, 10, 9, 1, 1);

//այստեղ քո պատրաստի թվերով լցված զանգվածը ուղարկում ես կլիենտին:
//սոքեթի emit մեթոդը թույլ է տալիս առաջին արգումենտով ստեղծել իվենթի անունը, 
//2-րդ արգումենտով ուղղարկել տվյալը, այն ինչ ուզում ես ուղարկել

io.sockets.emit('send matrix', matrix)

// հիմա գնա կլիենտի ֆայլ

//.........................................լոադինգ

//եթե գնացիր ու ամենինչ գրեցիր, արի էստեղ, դեռ անելիք ունենք

//էստեղ բեր քո գազանիկների դատարկ զանգվածները
grassArr = [];
grassEaterArr = []
predaTor = []
goblin = []
virus = []


io.sockets.emit('grassEaterArr', matrix)

//քանի որ քո կլասս-երը արդեն մոդուլներ են և ոչ մի կապ չունեն html ֆայլիդ հետ՝
//այլ աշխատում են սերվերի վրա:
//Դու պետք է նրանց իմպորտ անես: Ինձ մոտ նրանք երկուսն են, քեզ մոտ ավելի շատ
Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./predatpr")
Goblin = require("./goblin")
Virus = require("./virus")

//Այժմ լցնենք մատրիցը օբյեկտներով
//սարքի մի հատ ֆունկցիա օրինակ createObject անունով
//և էստեղ բեր քո սկրիպտ ֆայլի օբյեկտներով լցնող հատվածը
function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predaTor.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Goblin(x, y)
                goblin.push(gr)

            }
            else if (matrix[y][x] == 5) {
                let gr = new Virus(x, y)
                virus.push(gr)
            }

        }
    }
    // և կրկին ուղարկի կլիենտիդ: 
    //չմոռանաս , որ emit-ը տվյալ ուղարկողն է, իսկ on-ը ստացողը և կատարողը
    //այս դեպքում 2-րդ արգումենտը տվյալն է
    io.sockets.emit('send matrix', matrix)


}


//հիմա անցնենք նրանց վայրենի գործունեությանը
//որևէ անունով կոչիր ֆունկցիադ և մեջը դիր մեթոդների հատվածը:

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
        // console.log(lol);
    }
    for (let i in predaTor) {
        predaTor[i].eat()
    }
    for (let i in goblin) {
        goblin[i].move()
        goblin[i].do_spawn(grassArr.length, grassEaterArr.length, predaTor.length)
    }
    for (let i in virus) {
        virus[i].move()
        virus[i].viruss()
        // goblin[i].do_spawn(grassArr.length, grassEaterArr.length, predaTor.length)
    }
    //այո, դու ճիշտ ես տեսնում, կրկին և կրկին
    io.sockets.emit("send matrix", matrix);
}

//մեր խաղի շարժը լինելու է 1 վարկյանը մեկ
setInterval(game, 1000)
setInterval(() => {
    time += 1
    // console.log(time)
    if (time < 30) {
        io.sockets.emit("time", "summer")
        console.log(`The time is: ${time}`)
    }
    else if (time < 61 && time > 30) {
        io.sockets.emit("time", "winter")
        console.log(`The time is: ${time}`)
        if (time >= 60){
            time = 0
        }
    }
}, 1000);
// var ashot = 5;
function find(matrixx) {
    finded_xy = []
    // console.log(matrixx)
    for (let y = 0; y < matrixx.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            for (let z = 0; z <= 5; z++){
                if (matrix[y][x] == z && z != 4){
                    finded_xy.push([x, y])
                }
            }
        }
    }
    return finded_xy[Math.floor(Math.random() * finded_xy.length)]
}
function jsonn(){
    let jsonData = `{"Spawned":[
        {"name":"Grass","number":"${grassQAN}"},
        {"name":"Grass Eater","number":"${grassetQAN}"},
        {"name":"Predator","number":"${predatorQAN}"},
        {"name":"Virus","number":"${virusQAN}"}
        ]}`;

    // parse json
    var jsonObj = JSON.parse(jsonData);
    console.log(jsonObj);

    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
    console.log(jsonContent);

    fs.appendFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

}
setInterval(() => {
    grassQAN = grassArr.length
    grassetQAN = grassEaterArr.length
    predatorQAN = predaTor.length
    virusQAN = virus.length
    console.log(grassEaterArr)
    jsonn()
}, 60000);

io.on('connection', function (socket) {
    // let matrix = matrix
    console.log();
    createObject(matrix)
    socket.on("button", (stream) => {
        xy = find(matrix)
        console.log(xy)
        if (stream == "gr") {
            let gr = new Grass(xy[0], xy[1])
            matrix[xy[1]][xy[0]] = 1
            grassArr.push(gr)
            console.log("Spawning grass")
        }
        else if (stream == "ge") {
            let gr = new GrassEater(xy[0], xy[1])
            matrix[xy[1]][xy[0]] = 2
            grassEaterArr.push(gr)
            console.log("Spawning grass eater")

        }
        else if (stream == "pr") {
            let gr = new Predator(xy[0], xy[1])
            matrix[xy[1]][xy[0]] = 3
            predaTor.push(gr)
            console.log("Spawning predator")

        }
        else if (stream == "vr") {
            let gr = new Virus(xy[0], xy[1])
            matrix[xy[1]][xy[0]] = 5
            virus.push(gr)
            console.log("Cleaning matrix")
        }
        else if (stream == "cr") {
            console.log("Cleaning matrix")
            grassArr = [];
            grassEaterArr = []
            predaTor = []
            goblin = []
            virus = []
            matrix = generate(25, 15, 10, 9, 1, 1)
        }
        io.sockets.emit("send matrix", matrix);
    })
    console.log(grassQAN)

})


// json data

//դե ինչ այսօր այսքանը:

//ինձ համար շատ կարևոր է , որ հենց դու շատ լավ հասկանաս էս
//ամենը ու լինես լավագույնը քո ընտրած ոլորտում:



//Հնարավոր է, որ լիիիիիքը սխալ լինի գրաիս մեջ: Դուք ճիշտը գրեք :PPPPP