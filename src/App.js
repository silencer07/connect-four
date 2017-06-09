import 'jquery';
import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ConnectFourCanvas from './ConnectFourCanvas';
import Player from './Players';

class App extends Component {

    constructor() {
        super();

        this.state = {
            players : [
                new Player('Player 1', 'red'),
                new Player('Player 2', 'yellow'),
            ],
            currentPlayerIndex: 0
        };
    }


    cycleThroughPlayers(){
        this.setState({currentPlayerIndex : ++this.state.currentPlayerIndex});
        if(this.state.currentPlayerIndex === this.state.players.length){
            this.setState({currentPlayerIndex : 0});
        }
    }

    render() {
        return (
            <div>
                <h1 className="col-12 col-sm-12 col-md-8 offset-md-2">Welcome to Connect Four</h1>
                <ConnectFourCanvas currentPlayer={this.state.players[this.state.currentPlayerIndex]}
                                   onDropTokenCallback={(playerHasWon) => {
                                       if(playerHasWon){
                                           alert(`${this.state.players[this.state.currentPlayerIndex].name} won`);
                                           //reset canvas
                                       } else {
                                           this.cycleThroughPlayers();
                                       }
                                   }}
                />
                <footer className="card-footer">
                    This game was developed using react.js and react-konva libraries. This is for educational purposes
                    only
                </footer>
            </div>
        );
    }
}

export default App;
