import 'jquery';
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Layer, Stage} from 'react-konva';
import Column from "./Column";
import _ from 'lodash';

export default class ConnectFourCanvas extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-lg-10 offset-lg-1">
                    {
                        _.range(7).map((x) => <button key={`btn-${x}`} className="btn-place-token" onClick={() => this.dropToken(x)}>{x}</button>)
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
        console.log(`index: ${index}`);
        let column = this.refs[`col-${index}`];
        column.assignCellToPlayer(this.props.currentPlayer);
        this.props.onDropTokenCallback();
    }
}
