import React, { Component } from 'react';
import {Group} from 'react-konva';
import Cell from './Cell';
import _ from 'lodash';

export default class Column extends Component {

    get ROW_COUNT(){
        return 6;
    }

    render() {
        return (
            <Group>
                {
                    _.range(this.ROW_COUNT).map((y) => <Cell x={this.props.x} y={y} key={`cell-${this.props.x}-${y}`} ref={`cell-${this.props.x}-${y}`}/>)
                }
            </Group>
        );
    }

    assignCellToPlayer(player){
        //the lowest cell with no player will take that cell;
        for(let y = this.ROW_COUNT - 1; y >= 0; y--){
            let cell = this.refs[`cell-${this.props.x}-${y}`];
            if(cell.setPlayer(player)){
                break;
            }
        }
    }
}
