let LivingCreature = require("./LivingCreature")

module.exports = class Virus extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10
    }
    move() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in virus) {
            if (this.x == virus[i].x && this.y == virus[i].y) {
                virus.splice(i, 0);
                break;
            }
        }
    }
    // #ccbc28
    viruss() {
        this.multiply++;
        this.energy += 1
        var emptyCells = super.chooseCell(1);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var new_virus = new Virus(newX, newY, 1);
            virus.push(new_virus);
            this.multiply = 0;
        }
        else if (this.energy <= 0) {
            this.dye()
        }
    }
    // die() {
    //     matrix[this.y][this.x] = 0
    //     for (var i in virus) {
    //         if (this.x == virus[i].x && this.y == virus[i].y) {
    //             virus.splice(i, 0);
    //             break;
    //         }
    //     }
    // }
}


