class canvasObj {
  constructor(x,y,r) {
    this.X = x;
    this.Y = y;
    this.radius = r;
  }
}

class staticRing extends canvasObj {
  constructor(x,y,r) {
    super(x,y,r);
    this.angle = Math.PI/2;
    this.speed = -.01;
    this.debugCircleOutlineLine = "1";
    this.debugCircleOutlineStyle = "#008fff";
    this.debugDotLine = "2";
    this.debugDotStrokeStyle = "#1db992";
    this.debugDotFillStyle = "#1db992";

    this.pointOnCX = this.X + this.radius * Math.sin(this.angle);
    this.pointOnCY = this.Y + this.radius * Math.cos(this.angle);
    this.circleDotRadius = 5;
    
    this.pointsOnRing = 8;
    this.allRings = [];

    this.setupRingDist();
  }

  setupRingDist() {
    let dist = (360 / this.pointsOnRing) * Math.PI / 180;
    this.allRings = [];
    for(let i=0;i<=this.pointsOnRing;i++) {
      this.allRings[i] = new moveRingz(this.X,this.Y,this.radius,this.pointOnCX,this.pointOnCY);
      this.allRings[i].setAngle = this.angle + (dist * i);
    }
  }

  draw(debug) {
    this.pointOnCX = this.X + this.radius * Math.sin(this.angle);
    this.pointOnCY = this.Y + this.radius * Math.cos(this.angle);

    if(debug||false) {
      // Outline Circle
      CTX.beginPath();
      CTX.lineWidth = this.debugCircleOutlineLine;
      CTX.strokeStyle = this.debugCircleOutlineStyle;
      CTX.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI, false);
      CTX.stroke();

      // Dot on the Circle outline
      CTX.beginPath();
      CTX.lineWidth = this.debugDotLine;
      CTX.strokeStyle = this.debugDotStrokeStyle;
      CTX.arc(this.pointOnCX, this.pointOnCY, this.circleDotRadius , 0, 2 * Math.PI, false);
      CTX.fillStyle = this.debugDotFillStyle;
      CTX.fill();
      CTX.stroke();
    }
    
    // Draw moveing rings
    for(let i=0;i<=this.pointsOnRing;i++) {
      this.allRings[i].setAngle = this.allRings[i].angle + this.speed;
      this.allRings[i].pointToStartX = this.pointOnCX;
      this.allRings[i].pointToStartY = this.pointOnCY;
      this.allRings[i].draw(debug);
    }
  }

  set setAngle(newAngle) {
    this.angle = newAngle;
  }
}

class godRing extends staticRing {
  constructor(x,y,r) {
    super(x,y,r);
    this.setupRingDist();
  }

  setupRingDist() {
    this.allRings = new staticRing(100,200,50);
  }
}

class moveRingz extends canvasObj {
  constructor(x,y,r,startX,startY) {
    super(x,y,r);
    this.angle = Math.PI/2;

    this.circleLineWidth = "1";
    this.circleLineStyle = '#008fff';
    this.circleDebugDotWidth = 2;
    this.circleDebugDotStyle = '#1db992';
    this.circleDebugDotFill = '#1db992';

    this.pointToStartX = startX;
    this.pointToStartY = startY;
    this.pointOnCX = 0;
    this.pointOnCY = 0;
    this.circleDotRadius = 5;
  }

  draw(debug) {
    this.pointOnCX = this.X + this.radius * Math.sin(this.angle);
    this.pointOnCY = this.Y + this.radius * Math.cos(this.angle);

    let distRadius = Math.sqrt( Math.pow(this.pointOnCX-this.pointToStartX,2) + Math.pow(this.pointOnCY-this.pointToStartY,2) );

    // Draw Circle
    CTX.beginPath();
    CTX.lineWidth = this.circleLineWidth;
    CTX.strokeStyle = this.circleLineStyle;
    CTX.arc(this.pointOnCX, this.pointOnCY, distRadius, 0, 2 * Math.PI, false);
    CTX.stroke();

    if(debug||false) {
      // Dot in the center
      CTX.beginPath();
      CTX.lineWidth = this.circleDebugDotWidth;
      CTX.strokeStyle = this.circleDebugDotStyle;
      CTX.arc(this.pointOnCX, this.pointOnCY, this.circleDotRadius , 0, 2 * Math.PI, false);
      CTX.fillStyle = this.circleDebugDotFill;
      CTX.fill();
      CTX.stroke();
    }
  }

  set setAngle(newAngle) {
    this.angle = newAngle;
  }
}