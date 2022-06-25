//Բարևևևև:  
//Սկսիր ֆայլերը նայել հետևյալ հաջոդականությամբ.
//0.index.html
//1.LivingCreature
//2.Grass
//3.GrassEater
//4.server 
//5.script
//6.server

//դե ինչ, բարի ընթացք:


//Նայիր, եթե ուզում ես օգտվել որևէ մոդուլից, չպետք է մոռանաս require անել այն
// Այստեղ մենք պետք է օգտվենք LivingCreature մոդուլից , այդ պատճառով գրում ենք ներքևի տողը:
let LivingCreature = require('./LivingCreature')

// Grass մոդուլը էքսպորտ ենք անում
module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x, y)
    }

    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}