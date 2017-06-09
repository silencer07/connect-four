import 'jquery';
import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ConnectFourCanvas from './ConnectFourCanvas';
import Player from './Players';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            players : [
                new Player('Player 1', 'red'),
                new Player('Player 2', 'yellow')
            ],
            currentPlayerIndex: 0,
            playerHasWon: false
        };
    }


    cycleThroughPlayers(){
        if(this.state.currentPlayerIndex + 1 < this.state.players.length){
            this.setState({currentPlayerIndex : ++this.state.currentPlayerIndex});
        } else {
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
                                           this.setState({playerHasWon : playerHasWon});
                                       } else {
                                           this.cycleThroughPlayers();
                                       }
                                   }}
                />
                <footer className="card-footer">
                    This game was developed using react.js and react-konva libraries. This is for educational purposes
                    only
                </footer>
                <Modal isOpen={this.state.playerHasWon} toggle="false">
                    <ModalHeader>Game Finished</ModalHeader>
                    <ModalBody>
                        <p style={{'text-align': 'center'}}>
                            {this.state.players[this.state.currentPlayerIndex].name} wins!
                        </p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

