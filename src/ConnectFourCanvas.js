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

    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-lg-10 offset-lg-1">
                    {
                        _.range(7).map((x) =>
                            <button key={`btn-${x}`} className="btn-place-token"
                                onClick={() => this.dropToken(x)}
                                disabled={this.refs[`col-${x}`] ? this.refs[`col-${x}`].isAllCellsOwned : false}
                            >
                                {x}
                            </button>
                        )
                    }
                </div>
                <Stage width='700' height='700' className="col-md-12 col-lg-10 offset-lg-1">
                    <Layer>
                        {
                            _.range(7).map((x) => <Column x={x} key={`col-${x}`} ref={`col-${x}`}/>)
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
            .checkIfCurrentPlayerWins()
            .subscribe((hasWon) => this.props.onDropTokenCallback(hasWon));
    }

    getColumn(index){
        return this.refs[`col-${index}`];
    }
}
