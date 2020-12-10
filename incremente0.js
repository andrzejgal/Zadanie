    incrementP0Forward() {
	           switch (this.sectionNumber) {
                case 0: this.currentX++; break;
                case 1: this.currentX--; break;
                case 2: this.currentX++; break;
                case 3: this.currentX--; break;
                case 4: this.currentX++; break;
	
	}//incrementP0Forward()
	
	incrementX_part0() {

        if (this.animationForward) {
            switch (this.sectionNumber) {
                case 0: this.currentX++; break;
                case 1: this.currentX--; break;
                case 2: this.currentX++; break;
                case 3: this.currentX--; break;
                case 4: this.currentX++; break;
            }
        }
        else {
 
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
		
		
		else
		{
	           switch (this.sectionNumber) {
                case 0: this.currentX--; break;
                case 1: this.currentX++; break;
                case 2: this.currentX--; break;
                case 3: this.currentX++; break;
                case 4: this.currentX--; break;
            }
	        if (this.currentX == this.coordinatesArray) {//the shape start position reached
				clearInterval(animationTimer);
                this.part = 1;
                this.sectionNumber=0;
                console.log(this.sectionNumer <= sectionsQuantity, 'sectionNumer greater then max number,function incrementX_part0')
                this.setNewSectionNumberAndReloadCoordinates(this.sectionNumber);
                this.currentX = this.coordinatesArray[this.sectionNumber].Xstart;
                this.calculateYActual(this.currentX);
                return this.YActual;
            }
        else if (this.currentX == this.coordinatesArray[this.sectionNumber].Xstart) {
            this.sectionNumber--;
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
	
		
		
    