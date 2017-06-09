import 'jquery';
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Layer, Stage} from 'react-konva';
import Column from "./Column";
import _ from 'lodash';
import WinnerChecker from './WinnerChecker';

export default class ConnectFourCanvas extends Component {

    constructor(){
        super();
        this.winnerChecker = new WinnerChecker(this);
    }

    get COLUMN_COUNT() {
        return 7;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-lg-10 offset-lg-1">
                    {
                        _.range(this.COLUMN_COUNT).map((x) =>
                            <button key={`btn-${x}`} className="btn-place-token"
                                onClick={() => this.dropToken(x)}
                                disabled={this.getColumn(x) ? this.getColumn(x).isAllCellsOwned : false}
                                style={{backgroundColor: this.props.currentPlayer.color}}
                            >
                                {x}
                            </button>
                        )
                    }
                </div>
                <Stage width='700' height='700' className="col-md-12 col-lg-10 offset-lg-1">
                    <Layer>
                        {
                            _.range(this.COLUMN_COUNT).map((x) => <Column x={x} key={`col-${x}`} ref={`col-${x}`}/>)
                        }
                    </Layer>
                </Stage>
            </div>
        );
    }

    dropToken(index){
        let column = this.getColumn(index);
        column.assignCellToPlayer(this.props.currentPlayer);

        this.winnerChecker
            .checkIfCurrentPlayerWins().map((hasWon) =>{
                if(!hasWon){
                    let allOwned = true;
                    for(let x = 0; x < this.COLUMN_COUNT; x++){
                        allOwned = allOwned && this.getColumn(x).isAllCellsOwned;
                    }

                    if(allOwned){
                        throw new Error("No more possible moves. Game is draw.");
                    }
                }
                return hasWon;
            }).subscribe(
                (hasWon) => this.props.onDropTokenCallback(hasWon),
                (error) => this.props.onGameDraw(error)
        );
    }

    getColumn(index){
        return this.refs[`col-${index}`];
    }
}
