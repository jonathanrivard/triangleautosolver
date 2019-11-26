console.log("JavaScript File Loaded");

class Triangle {
    constructor(){
        this.A = null;
        this.B = null;
        this.C = null;
        this.a = null;
        this.b = null;
        this.c = null;
    }

    printInfo(){
        console.log("Angles: " + this.A + " | " + this.B + " | " + this.C);
        console.log("Sides:  " + this.a + " | " + this.b + " | " + this.c);
    }

    solve(){
        var angles = 0;
        var sides = 0;
        //Get number of angles and sides
        if(this.A != "") angles++;
        if(this.B != "") angles++;
        if(this.C != "") angles++;
        if(this.a != "") sides++;
        if(this.b != "") sides++;
        if(this.c != "") sides++;

        if(angles + sides >= 3){ //Then we can solve
            //Create 3x3 matrix
            var matrix = new Array(3);
            for(var i = 0; i < matrix.length; i++){
                matrix[i] = new Array(3);
            }

            //Add angles and sides into matrix
            matrix[0][0] = 'a';
            matrix[0][1] = 'b';
            matrix[0][2] = 'c';
            matrix[1][0] = this.A;
            matrix[1][1] = this.B;
            matrix[1][2] = this.C;
            matrix[2][0] = this.a;
            matrix[2][1] = this.b;
            matrix[2][2] = this.c;

            //Setup matrix for solving
            var allSides = false; //Do we only have sides
            var allAngles = false; //Do we only have angles
            var noPair = false; //Will we need to use law of cossine
            for(var i = 0; i < 3; i++){ //Try to get the first angle and side to not be null
                if(matrix[1][0] != "" && matrix[2][0] != ""){
                    break;
                }

                //Make temp matrix
                var temp = new Array(3);
                for(var r = 0; r < 3; r++){
                    temp[r] = new Array(3);
                }

                for(var r = 0; r < matrix.length; r++){
                    for(var c = 0; c < matrix[r].length; c++){
                        temp[r][c] = matrix[r][(c+1)%3];
                    }
                }
                matrix = temp;
            }
            
            if(matrix[1][0] == "" || matrix[2][0] == ""){ //If after the loop, there still isn't a pair
                if(matrix[1][0] == "" && matrix[1][1] == "" && matrix[1][2] == ""){ //If there are no angles
                    allSides = true;
                }else if(matrix[2][0] == "" && matrix[2][1] == "" && matrix[2][2] == ""){ //If there are no sides
                    allAngles = true;
                }else {
                    noPair = true;
                }
            }

            if(allSides == true){ //SSS
                //Get largest side
                var largest = 0;
                for(var i = 0; i < 3; i++){
                    if(parseFloat(matrix[2][largest]) < parseFloat(matrix[2][i])){
                        largest = i;
                    }
                }

                if(largest == 0){ //First angle is hypotonuse
                    matrix[1][1] = asin(parseFloat(matrix[2][1]) / parseFloat(matrix[2][largest]));
                    var temp = new Array(3);
                    //Save column one
                    temp[0] = matrix[0][0];
                    temp[1] = matrix[1][0];
                    temp[2] = matrix[2][0];
                    //Column two to column one
                    matrix[0][0] = matrix[0][1];
                    matrix[1][0] = matrix[1][1];
                    matirx[2][0] = matrix[2][1];
                    //Old column one to column two
                    matrix[0][1] = temp[0];
                    matrix[1][1] = temp[1];
                    matirx[2][1] = temp[2];
                }else {
                    matrix[1][0] = asin(parseFloat(matrix[2][0]) / parseFloat(matrix[2][largest]));
                }
            }else if(allAngles == true){ //AAA
                //Get smallest angle in [1][0]
                var smallest = 0;
                for(var i = 1; i < 3; i++){
                    if(parseFloat(matrix[i][0]) < parseFloat(matrix[1][smallest])){
                        smallest = i;
                    }
                }
                
                //Set the smallest angle's side equal to 1
                matrix[2][smallest] = 1;

            }else if(noPair == true){ //Two angles and a side
                if(angles > sides){ 
                    //Loop so side is in [2][0]
                    for(var i = 0; i < 3; i++){
                        if(matrix[2][0] != ""){
                            break;
                        }else { //Cycle matrix
                            //Make temp matrix
                            var temp = new Array(3);
                            for(var r = 0; r < 3; r++){
                                temp[r] = new Array(3);
                            }

                            for(var r = 0; r < matrix.length; r++){
                                for(var c = 0; c < matrix[r].length; c++){
                                    temp[r][c] = matrix[r][(c+1)%3];
                                } 
                            }
                            matrix = temp;
                        }
                    }

                    //Now there is a side in [2][0]
                    //Get the angle matching it
                    matrix[1][0] = 180 - (parseFloat(matrix[1][1]) + parseFloat(matrix[1][2]));
                }else if(sides > angles){
                    //Loop so angle is in [1][0]
                    for(var i = 0; i < 3; i++){
                        if(matrix[1][0] != ""){
                            break;
                        }else { //Cycle matrix
                            //Make temp matrix
                            var temp = new Array(3);
                            for(var r = 0; r < 3; r++){
                                temp[r] = new Array(3);
                            }

                            for(var r = 0; r < matrix.length; r++){
                                for(var c = 0; c < matrix[r].length; c++){
                                    temp[r][c] = matrix[r][(c+1)%3];
                                } 
                            }
                            matrix = temp;
                        }
                    }

                    //Now there is an angle in [1][0]
                    matrix[2][0] = Triangle.lawOfCosineSide(matrix[1][0], matrix[2][1], matrix[2][2]);

                }else {
                    console.log("ERROR: Number of sides and angles are the same!");
                }
            }

            for(var i = 0; i < 3; i++){ //Try to get the first angle and side to not be null
                if(matrix[1][0] != "" && matrix[2][0] != ""){
                    break;
                }

                //Make temp matrix
                var temp = new Array(3);
                for(var r = 0; r < 3; r++){
                    temp[r] = new Array(3);
                }

                for(var r = 0; r < matrix.length; r++){
                    for(var c = 0; c < matrix[r].length; c++){
                        temp[r][c] = matrix[r][(c+1)%3];
                    }
                }
                matrix = temp;
            }

            //Get a value in column two
            if(matrix[1][1] == "" && matrix[1][2] == ""){ //Column two has no values
                matrix[1][1] = matrix[1][2];
                matrix[2][1] = matrix[2][2];
                matrix[1][2] = "";
                matrix[2][2] = "";
                //Switch letters
                var temp = matrix[0][1];
                matrix[0][1] = matrix[0][2];
                matrix[0][2] = temp;
            }

            //Now we know there is a value somewhere in column two
            if(matrix[1][1] != ""){ //Get the side
                matrix[2][1] = Triangle.lawOfSineSide(matrix[1][0], matrix[2][0], matrix[1][1]);
            }else if(matrix[2][1] != ""){ //Get the angle
                matrix[1][1] = Triangle.lawOfSineAngle(matrix[1][0], matrix[2][0], matrix[2][1]);
            }

            //Finish column three
            //Get angle
            matrix[1][2] = 180 - (parseFloat(matrix[1][0]) + parseFloat(matrix[1][1]));
            if(matrix[2][2] == ""){
                matrix[2][2] = Triangle.lawOfSineSide(matrix[1][0], matrix[2][0], matrix[1][2]);
            }

            /*
            //Print matrix
            var output = "";
            for(var r = 0; r < matrix.length; r++){
                for(var c = 0; c < matrix[r].length; c++){
                    output += matrix[r][c] + "\t";
                }
                console.log(output);
                output = "";
            }
            */

            //Update Triangle values to match
            for(var i = 0; i < 3; i++){
                if(matrix[0][i] == "a"){
                    this.A = matrix[1][i];
                    this.a = matrix[2][i];
                }else if(matrix[0][i] == "b"){
                    this.B = matrix[1][i];
                    this.b = matrix[2][i];
                }else if(matrix[0][i] == "c"){
                    this.C = matrix[1][i];
                    this.c = matrix[2][i];
                }else {
                    console.log("ERROR: " + matrix[0][i] + " is not a, b, or c");
                }
            }
        }
    }

    static lawOfSineSide(A, a, B){
        A = parseFloat(A);
        a = parseFloat(a);
        B = parseFloat(B);
        return (a * sin(B)) / sin(A);
    }

    static lawOfSineAngle(A, a, b){
        A = parseFloat(A);
        a = parseFloat(a);
        b = parseFloat(b);
        var num = (b * sin(A)) / a;
        if(num > 1) return "no solution";
        else return asin(num);
    }

    static lawOfCosineSide(A, b, c){
        A = parseFloat(A);
        b = parseFloat(b);
        c = parseFloat(c);
        return Math.sqrt((b**2 + c**2) - (2*b*c*cos(A)));
    }

    static lawOfCosineAngle(a, b, c){
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);
        return acos(a**2 - b**2 - c**2 + 2*b*c);
    }

}

//Inputs
const angleA = document.getElementById("angleA");
const angleB = document.getElementById("angleB");
const angleC = document.getElementById("angleC");
const sideA = document.getElementById("sideA");
const sideB = document.getElementById("sideB");
const sideC = document.getElementById("sideC");
//Functions
function updateTriangleValues(tri){
    tri.A = angleA.value;
    tri.B = angleB.value;
    tri.C = angleC.value;
    tri.a = sideA.value;
    tri.b = sideB.value;
    tri.c = sideC.value;
}

function updateInputValues(tri){
    angleA.value = tri.A;
    angleB.value = tri.B;
    angleC.value = tri.C;
    sideA.value = tri.a;
    sideB.value = tri.b;
    sideC.value = tri.c;
}

function update(){
    updateTriangleValues(tri);
    tri.solve();
    updateInputValues(tri);
}

function reset(){
    angleA.value = "";
    angleB.value = "";
    angleC.value = "";
    sideA.value = "";
    sideB.value = "";
    sideC.value = "";
    updateTriangleValues(tri);
}

//My math functions, because I like degrees
function toRadians(degrees){return degrees * (Math.PI / 180);}
function toDegrees(radians){return radians * (180 / Math.PI);}
function sin(degrees){return Math.sin(toRadians(degrees));}
function cos(degrees){return Math.cos(toRadians(degrees));}
function tan(degrees){return Math.tan(toRadians(degrees));}
function asin(degrees){return toDegrees(Math.asin(degrees));}
function acos(degrees){return toDegrees(Math.acos(degrees));}
function atan(degrees){return toDegrees(Math.atan(degrees));}

const tri = new Triangle();
