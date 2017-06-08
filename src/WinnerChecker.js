import {Observable} from 'rxjs/Rx';

export default class WinnerChecker {
    constructor(connectFourCanvas){
        this.checkers = [
            new Checker(connectFourCanvas, CheckingDirection.VERTICAL_CHECK),
            new Checker(connectFourCanvas, CheckingDirection.HORIZONTAL_CHECK),
        ];
    }

    checkIfCurrentPlayerWins(){
        return Observable.forkJoin(
            this.checkers.map((checker) => checker.checkIfCurrentPlayerWins()))
                .reduce((acc, curr) => curr.reduce((a, b) => a || b, false), false)
                .delay(0);
    }
}

class Checker{
    constructor(connectFourCanvas, checkingDirection){
        this.connectFourCanvas = connectFourCanvas;
        this.checkingDirection = checkingDirection;
    }

    get ADJACENT_COUNT_WIN(){
        return 4 - 1; //because of react's late update of state. we need to subtract by one
    }

    hasAlreadyWon(adjacentCount){
        return adjacentCount === this.ADJACENT_COUNT_WIN;
    }

    checkIfCurrentPlayerWins(){
        let d = this.checkingDirection;
        let x = d.startCoordinate.x;
        let y = d.startCoordinate.y;
        d.currentCoordinate = d.startCoordinate;

        let adjacentCount = 0;
        let hasWon = false;

        let c = this.connectFourCanvas;
        let p = c.props.currentPlayer;
        // console.log(`d.endCoordinate.x: ${d.endCoordinate.x}, d.endCoordinate.y: ${d.endCoordinate.y}`);
        while(x !== d.endCoordinate.x || y !== d.endCoordinate.y){
            // console.log(`x: ${x}, y: ${y}`);
            let cell = c.getColumn(x).getCell(y);

            if(cell.sameOwner(p)){
                //console.log('same owner');
                ++adjacentCount;

                // console.log(`adjacentCount: ${adjacentCount}`);
                if(this.hasAlreadyWon(adjacentCount)){
                    hasWon = true;
                    break;
                }
            } else {
                //console.log('not same owner');
                adjacentCount = 0;
            }

            x = x + d.xStep;
            y = y + d.yStep;
            if(d.shouldMoveToNextLine(x, y)){
                // console.log('moving to next line');
                d.moveToNextLine();
                x = d.currentCoordinate.x;
                y = d.currentCoordinate.y;
                console.log(`new vals x: ${x}, y: ${y}`);
            } else {
                //console.log('stepping to next cell');
                // console.log(`stepped vals x: ${x}, y: ${y}`);
                // console.log(`will remain in loop: ${x !== d.endCoordinate.x || y !== d.endCoordinate.y}`);
            }
        };

        return Observable.of(hasWon);
    }
}

class CheckingDirection{

    constructor(xStep, yStep, startCoordinate, endCoordinate, moveToNextLine, shouldMoveToNextLine){
        this.xStep = xStep;
        this.yStep = yStep;
        this.startCoordinate  = startCoordinate;
        this.currentCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.moveToNextLine = moveToNextLine.bind(this);
        this.shouldMoveToNextLine = shouldMoveToNextLine.bind(this);
    }

    //steps is negative because checking would start at tail of the column
    static VERTICAL_CHECK = new CheckingDirection(0, -1,
        {x: 0, y: 5},
        {x: 6, y: 0},
        function (){
            let oldCoordinate = this.currentCoordinate;
            this.currentCoordinate = new Coordinate(oldCoordinate.x + 1, 5);
        },
        function(x, y){
            return y === -1;
        }
    );

    static HORIZONTAL_CHECK = new CheckingDirection(1, 0,
        {x:0, y:5},
        {x:6, y:0},
        function(){
            let oldCoordinate = this.currentCoordinate;
            this.currentCoordinate = new Coordinate(0, oldCoordinate.y - 1);
        },
        function(x, y){
            return x === 7;
        }
    );

    // static FORWARD_SLASH_CHECK = new CheckingDirection(1, -1,
    //     new Coordinate(0, 3),
    //     new Coordinate(6, 2),
    //     () => {
    //         // let oldCoordinate = this.startCoordinate;
    //         // this.startCoordinate = new Coordinate(0, --oldCoordinate.y);
    //     },
    //     (x, y) => {
    //         return x === 6;
    //     },
    // );
    //
    // static BACKWARD_SLASH_CHECK = new CheckingDirection(-1, -1,
    //     new Coordinate(6, 3),
    //     new Coordinate(0, 2),
    //     () => {
    //         // let oldCoordinate = this.startCoordinate;
    //         // this.startCoordinate = new Coordinate(0, --oldCoordinate.y);
    //     }
    // );
}

class Coordinate {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
