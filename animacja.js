var element = document.getElementById('main-content');
// var top=element.top
// var left=element.left;
// console.log(element,top,left);

//alert("Twoja rozdzielczość ekranu to: " + screen.width + "x" + screen.height);

/*
wyszukiwanie: js reading screen pixel
https://www.google.com/search?client=firefox-b-d&q=js+reading+screen+pixel
https://stackoverflow.com/questions/8751020/how-to-get-a-pixels-x-y-coordinate-color-from-an-image

*/

var shapeDimesion = 20;
var globalXstart, globalYstart, globalXend, globalYend;
var sectionsQuantity = 10;
var yline;
var animationForward ;



// document.addEventListener("click", handleClick, false);

// function handleClick(Event) {
//     var viewPortx = Event.x;
//     var viewPorty = Event.y;
//     console.log('x= ', viewPortx);
//     document.writeln('x=', viewPortx);
//     document.writeln('y= ', viewPorty);
// }


var shape = document.getElementById('shape');
shape.style.width = shapeDimesion + 'px';
shape.style.height = shapeDimesion + 'px';
shape.style.top = (221 + -(shapeDimesion * 0.5)) + 'px';
shape.style.left = (305 - (shapeDimesion * 0.5)) + 'px';

function CalculateYposition(y) {
    var sizeToString = (y - shapeDimesion * 0.5).toString();
    return sizeToString + 'px';
}

function CalculateXposition(x) {
    var sizeToString = (x - shapeDimesion * 0.5).toString();
    return sizeToString + 'px';
}

var buttonForward=document.getElementById('forward');
buttonForward.addEventListener('click',SetForward)
var buttonReverse=document.getElementById('reverse');
buttonReverse.addEventListener('click',SetReverse)
function SetForward() {
    animationForward=true;
}
function SetReverse() {
    animationForward=false;   
}




class MainData {
    constructor(sectionNumber) {
        this.sectionNumber = sectionNumber;
        this.initialization();
    }
     animationForward /* = true */;  //if
    static currentSection = 0;
    currentX;

    sectionNumber;
    slope;
    XmaxCoordinate;
    XminCoordinate;
    part;


    //  coordinates of actual section defining by sectionNumber
    XDstart;
    YDstart;
    XDend;
    YDend;
    //end of coordinates of actual section
    YActual;
    coordinatesArray = [coordinatesTableSection0, coordinatesTableSection1, coordinatesTableSection2, coordinatesTableSection3,
        coordinatesTableSection4, coordinatesTableSection5, coordinatesTableSection6, coordinatesTableSection7,
        coordinatesTableSection8, coordinatesTableSection9, coordinatesTableSection10
    ]



    getXstart() {
        return XDstart;
    }
    getYstart() {
        return YDstart;
    }
    getXend() {
        return Xend;
    }

    getYend() {
        return Yend;
    }



    setAnimationDirectionForward(value) {
        animationDirection = value;
    }

    getActualY() {
        return this.YActual;
    }

    getSectionNumber() {
        return this.sectionNumber;
    }

    getSlope() {
        return this.slope;
    }

    setSectionNumber(number) {
        this.sectionNumber = number;
    }

    getcurrentX() {
        return this.currentX;
    }

    loadSectionsCoordinates() {
        this.XDstart = this.coordinatesArray[this.sectionNumber].Xstart;
        this.YDstart = this.coordinatesArray[this.sectionNumber].Ystart;
        this.XDend = this.coordinatesArray[this.sectionNumber].Xend;
        this.YDend = this.coordinatesArray[this.sectionNumber].Yend;
    };

    setNewSectionNumberAndReloadCoordinates(number) {
        console.assert(number <= sectionsQuantity, 'section numner greater than maxnumber, function setNewSectionNumberAndReloadCoordinates')
        this.sectionNumber = number;
        this.loadSectionsCoordinates();
        this.calculateSope();
    }

    readRandomSectionCoordinates(index) {
        console.assert((index >= 0) && (index <= sectionsQuantity), 'notvalid index in readRandomSectionCoordinates function')
        globalXstart = this.coordinatesArray[index].Xstart;
        globalYstart = this.coordinatesArray[index].Ystart;
        globalXend = this.coordinatesArray[index].Xend;
        globalYend = this.coordinatesArray[index].Yend;
    };

    calculateSope() {
        this.slope = (this.YDend - this.YDstart) / (this.XDend - this.XDstart);
    };

    calculateYActual(XCoordinate) {
        this.YActual = (((XCoordinate - this.XDstart)) * this.slope) + this.YDstart;
    };

    initialization() {
        this.loadSectionsCoordinates();
        this.XmaxCoordinate = this.coordinatesArray[4].Xend;
        this.XminCoordinate = this.coordinatesArray[9].Xend;
        this.part = 0;
        this.currentX = this.coordinatesArray[0].Xstart;
        this.calculateSope();
        animationForward = true;
    }

    incrementX_part1() {
        switch (this.sectionNumber) {
            case 5: this.currentX--; break;
            case 6: this.currentX++; break;
            case 7: this.currentX--; break;
            case 8: this.currentX++; break;
            case 9: this.currentX--; break;
        }
        if (this.currentX == this.XminCoordinate) {//the shape heighst point reached
            this.part = 2;
            this.sectionNumber++;
            console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part1')
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
            this.calculateYActual(this.currentX);
            return this.YActual;
        }
        else if (this.currentX == this.coordinatesArray[this.sectionNumber].Xend) {
            this.sectionNumber++;
            console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part1')
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
            this.calculateYActual(this.currentX);
            return this.YActual;
        }
        else {
            this.calculateYActual(this.currentX);
            return this.YActual;
        }


    }

    incrementX_part2() {
        this.currentX--;
        if (this.currentX > this.coordinatesArray[0].Xstart) {
            this.calculateYActual(this.currentX);
            return this.YActual;
        }
        else {
            clearInterval(animationTimer);
        }
    }


    // incrementX_part0() {
    //     switch (this.sectionNumber) {
    //         case 0: this.currentX++; break;
    //         case 1: this.currentX--; break;
    //         case 2: this.currentX++; break;
    //         case 3: this.currentX--; break;
    //         case 4: this.currentX++; break;
    //     }
    //     if (this.currentX == this.XmaxCoordinate) {//the shape most bottom point reached
    //         this.part = 1;
    //         this.sectionNumber++;
    //         console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part0')
    //         this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
    //         this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
    //         this.calculateYActual(this.currentX);
    //         return this.YActual;
    //     }
    //     else if (this.currentX == this.coordinatesArray[this.sectionNumber].Xend) {
    //         this.sectionNumber++;
    //         console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part0')
    //         this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
    //         this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
    //         this.calculateYActual(this.currentX);
    //         return this.YActual;
    //     }
    //     else {
    //         this.calculateYActual(this.currentX);
    //         return this.YActual;
    //     }
    // }//incrementX_part0()

    incrementP0Forward() {
        switch (this.sectionNumber) {
            case 0: this.currentX++; break;
            case 1: this.currentX--; break;
            case 2: this.currentX++; break;
            case 3: this.currentX--; break;
            case 4: this.currentX++; break;
        }
        if (this.currentX == this.XmaxCoordinate) {//the shape most bottom point reached
            this.part = 1;
            this.sectionNumber++;
            console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part0')
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
            this.calculateYActual(this.currentX);
            return this.YActual;
        }
        else if (this.currentX == this.coordinatesArray[this.sectionNumber].Xend) {
            this.sectionNumber++;
            console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part0')
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
            this.calculateYActual(this.currentX);
            return this.YActual;
        }
        else {
            this.calculateYActual(this.currentX);
            return this.YActual;
        }

    }//incrementP0Forward()

    incrementP0Reverse() {
        switch (this.sectionNumber) {
            case 0: this.currentX--; break;
            case 1: this.currentX++; break;
            case 2: this.currentX--; break;
            case 3: this.currentX++; break;
            case 4: this.currentX--; break;
        }
        if ((this.sectionNumber==0) && (this.currentX <= this.coordinatesArray[this.sectionNumber].Xstart)) {//the shape most bottom point reached
            clearInterval(animationTimer);
        }
else if (this.currentX == this.coordinatesArray[this.sectionNumber].Xstart) {
            this.sectionNumber--;
            console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part0')
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xend;
            this.calculateYActual(this.currentX);
            return this.YActual;
        }
        else {
            this.calculateYActual(this.currentX);
            return this.YActual;
        }

    }//incrementP0Reverse


    incrementX_part0() {
        if (animationForward) {
            return this.incrementP0Forward();
        }
        else {
            return this.incrementP0Reverse();
        }

    }



}//class MainData end

var coordinatesTableSection0 = {
    Xstart: 305,
    Ystart: 213,
    Xend: 544,
    Yend: 280
};


var coordinatesTableSection1 = {
    Xstart: 544,
    Ystart: 280,
    Xend: 471,
    Yend: 295
};

var coordinatesTableSection2 = {
    Xstart: 471,
    Ystart: 295,
    Xend: 690,
    Yend: 359
};

var coordinatesTableSection3 = {
    Xstart: 690,
    Ystart: 359,
    Xend: 630,
    Yend: 375
};



var coordinatesTableSection4 = {
    Xstart: 630,
    Ystart: 375,
    Xend: 1002,
    Yend: 477
};


var coordinatesTableSection5 = {
    Xstart: 1002,
    Ystart: 477,
    Xend: 778,
    Yend: 340
};


var coordinatesTableSection6 = {
    Xstart: 778,
    Ystart: 340,
    Xend: 835,
    Yend: 328
};

// 


var coordinatesTableSection7 = {
    Xstart: 835,
    Ystart: 328,
    Xend: 666,
    Yend: 255
};

var coordinatesTableSection8 = {
    Xstart: 666,
    Ystart: 255,
    Xend: 710,
    Yend: 240
};




var coordinatesTableSection9 = {
    Xstart: 710,
    Ystart: 240,
    Xend: 575,
    Yend: 154
};

var coordinatesTableSection10 = {
    Xstart: 575,
    Ystart: 154,
    Xend: 305,
    Yend: 213
};





pMainData = new MainData(0);


var animationTimer = setInterval(TimerXPlus, 50);
var lineY;

function TimerXPlus() {
    console.assert((pMainData.part >= 0) && (pMainData.part <= 2), 'function TimerXPlus - not valid pMainData.part')
    switch (pMainData.part) {
        case 0:
            lineY = pMainData.incrementX_part0();
            break;
        case 1:
            lineY = pMainData.incrementX_part1();
            break;
        case 2:
            lineY = pMainData.incrementX_part2();
            break;
    }
    shape.style.top = CalculateYposition(lineY);
    shape.style.left = CalculateXposition(pMainData.currentX);



}



//dla section=10
// var MData = new MainData(10);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=575;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);


// //dla section=9
// var MData = new MainData(9);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=575;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);


//dla section=8
// var MData = new MainData(8);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=710;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);


// //dla section=7
// var MData = new MainData(7);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=666;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);




// dla section=6
// var MData = new MainData(6);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=835;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);




//dla section=5 
// var MData = new MainData(5);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=778;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);




// //dla section=4 
// var MData = new MainData(4);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=1002;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);




//dla section=3 
// var MData = new MainData(3);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=630;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);




// dla section=2
// var MData = new MainData(2);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=690;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);



// dla section=1
// var MData = new MainData(1);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=471;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);




// dla section=0
// var MData = new MainData(0);
// MData.loadSectionsCoordinates();
// MData.calculateSope();
// var slope=MData.getSlope();
// var xIn=305;
// MData.calculateYActual(xIn);
// var YAc=MData.getActualY();
// shape.style.top = CalculateYposition(YAc);
// shape.style.left = CalculateXposition(xIn);











/*
współrzędne odcinków
    numer   Xpocz   Ypocz   Xkoniec     Ykoniec         nachylenie
    1       305     221     542         283
    2       542     283     474         302
    3       474     302     694         363
    4       604     363     1004        477
    5       1004    477     782         347
    6       782     347     833         337
    7       833     337     667         260
    8       667     260     715         247
    9       715     247     577         163
    10      577     163     305         221
*/