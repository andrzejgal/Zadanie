var element = document.getElementById('main-content');

var shapeDimesion = 20;
var shapeDimension_mouse_over=40;
var globalXstart, globalYstart, globalXend, globalYend;
var sectionsQuantity = 10;
var yline;
var animationForward;



// document.addEventListener("click", handleClick, false);

// function handleClick(Event) {
//     var viewPortx = Event.x;
//     var viewPorty = Event.y;
//     console.log('x= ', viewPortx);
//     document.writeln('x=', viewPortx);
//     document.writeln('y= ', viewPorty);
// }
var coordinatesTableSection0_B = {
    Xstart: 82,
    Ystart: 100,
    Xend: 345,
    Yend: 167
};

function hexToString(hex){
    return hex.toString(16).toUpperCase();
}

var shape = document.getElementById('shape');
shape.style.width = shapeDimesion + 'px';
shape.style.height = shapeDimesion + 'px';
shape.style.top = (coordinatesTableSection0_B.Xstart + -(shapeDimesion * 0.5)) + 'px';
shape.style.left = (coordinatesTableSection0_B.Ystart - (shapeDimesion * 0.5)) + 'px';


function CalculateYposition(y) {
    var sizeToString = (y - shapeDimesion * 0.5).toString();
    return sizeToString + 'px';
}

function CalculateXposition(x) {
    var sizeToString = (x - shapeDimesion * 0.5).toString();
    return sizeToString + 'px';
}

var buttonForward = document.getElementById('forward');
buttonForward.addEventListener('click', SetForward)
var buttonReverse = document.getElementById('reverse');
buttonReverse.addEventListener('click', SetReverse)

function SetForward() {
    animationForward = true;
    shape.style.width = shapeDimesion + 'px';
    shape.style.height = shapeDimesion + 'px';

}
function SetReverse() {
    animationForward = false;
    shape.style.width = shapeDimension_mouse_over + 'px';
    shape.style.height = shapeDimension_mouse_over + 'px';
}

shape.addEventListener('mouseover',SetReverse);
shape.addEventListener('mouseout',SetForward);

var ColorsArray=['red','salmon',
                'skyblue','cyan','green','yellow','blue','silver','plum','gold'];


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

    incrementP1Reverse() {
        switch (this.sectionNumber) {
            case 5: this.currentX++; break;
            case 6: this.currentX--; break;
            case 7: this.currentX++; break;
            case 8: this.currentX--; break;
            case 9: this.currentX++; break;
        }
        if ((this.sectionNumber == 5) && (this.currentX >= this.coordinatesArray[this.sectionNumber].Xstart)) {
            this.part--;
            this.sectionNumber--;
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xend/*Xstart*/;
            this.calculateYActual(this.currentX);
        }
        else if (this.currentX == this.coordinatesArray[this.sectionNumber].Xstart) {
            this.sectionNumber--;
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xend;
            this.calculateYActual(this.currentX);
        }
        else {
            this.calculateYActual(this.currentX);
            return this.YActual;
        }

    }

    
    incrementP1Forward() {
        switch (this.sectionNumber) {
            case 5: this.currentX--; break;
            case 6: this.currentX++; break;
            case 7: this.currentX--; break;
            case 8: this.currentX++; break;
            case 9: this.currentX--; break;
        }
        if (this.currentX == this.XminCoordinate) {//the shape lowest point reached
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
        if (animationForward) {
            this.currentX--;
            if (this.currentX > this.coordinatesArray[0].Xstart) {
                this.calculateYActual(this.currentX);
                return this.YActual;
            }
            else {
                clearInterval(animationTimer);
            }
        }
        else   {
            this.currentX++;
            if (this.currentX == this.coordinatesArray[this.sectionNumber].Xstart) {
            this.part--;
            this.sectionNumber--;
            this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
            this.currentX = this.coordinatesArray[this.sectionNumber].Xend;
            this.calculateYActual(this.currentX);
            return this.YActual;
            }
            else {
                this.calculateYActual(this.currentX);
                return this.YActual;
           }

        }
    }





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
        if ((this.sectionNumber == 0) && (this.currentX <= this.coordinatesArray[this.sectionNumber].Xstart)) {//the shape most bottom point reached
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

    incrementX_part1() {
        if (animationForward) {
            return this.incrementP1Forward();
        }
        else {
            //            alert('X='+this.currentX+ 'sekcja='+this.sectionNumber);
            return this.incrementP1Reverse();
        }

    }


}//class MainData end

var coordinatesTableSection0 = {
    Xstart: 82,
    Ystart: 100,
    Xend: 345,
    Yend: 167
};


var coordinatesTableSection1 = {
    Xstart: 345,
    Ystart: 167,
    Xend: 259,
    Yend: 187
};

var coordinatesTableSection2 = {
    Xstart: 259,
    Ystart: 187,
    Xend: 500,
    Yend: 249
};

var coordinatesTableSection3 = {
    Xstart: 500,
    Ystart: 249,
    Xend: 432,
    Yend: 268
};



var coordinatesTableSection4 = {
    Xstart: 432,
    Ystart: 268,
    Xend: 830,
    Yend: 375
};


var coordinatesTableSection5 = {
    Xstart: 830,
    Ystart: 375,
    Xend: 587,
    Yend: 236
};


var coordinatesTableSection6 = {
    Xstart: 587,
    Ystart: 236,
    Xend: 652,
    Yend: 221
};



var coordinatesTableSection7 = {
    Xstart: 652,
    Ystart: 221,
    Xend: 468,
    Yend: 145
};

var coordinatesTableSection8 = {
    Xstart: 468,
    Ystart: 145,
    Xend: 521,
    Yend: 128
};




var coordinatesTableSection9 = {
    Xstart: 521,
    Ystart: 128,
    Xend: 377,
    Yend: 34
};

var coordinatesTableSection10 = {
    Xstart: 377,
    Ystart: 34,
    Xend: 82,
    Yend: 100
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
     var col=ColorsArray[pMainData.sectionNumber];
     shape.style.backgroundColor=col;
     shape.style.top = CalculateYposition(lineY);
    shape.style.left = CalculateXposition(pMainData.currentX);



}

