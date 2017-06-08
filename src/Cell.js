import React, { Component } from 'react';
import {Rect, Circle, Group} from 'react-konva';

export default class Cell extends Component {
    constructor(){
        super();
        this.state = {
            player: null
        };
    }
    render() {
        const width = 100;
        const height = width;
        return (
            <Group class="row">
                <Rect
                    x={this.props.x * width} y={this.props.y * height} width={width} height={width}
                    fill='darkblue'
                    stroke='black'
                    strokeWidth={1}
                />
                <Circle
                    x={this.props.x * width + width / 2} y={this.props.y * height + height / 2}
                    fill={this.state.player ? this.state.player.color : 'white'}
                    radius={width / 3}
                />
            </Group>
        );
    }

    setPlayer(player){
        if(!this.state.player){
            this.state.player = player; //workaround to issue where state is not updated immediately
            this.setState({player : player});
            return true;
        }
        return false;
    }

    sameOwner(player){
        //console.log(player.name);
        // console.log(this.state.player? this.state.player.name : 'none');
        return this.state.player === player;
    }
}
