import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';

const RandomCharBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const RandomCharSpan = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();  
    state = {
        char: {}
    }

    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar() {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded);
    }
    

    render() {
        const { char: {name, gender, born, died, culture} } = this.state;

        return (
            <RandomCharBlock className="rounded">
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <RandomCharSpan>Gender </RandomCharSpan>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <RandomCharSpan>Born </RandomCharSpan>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <RandomCharSpan>Died </RandomCharSpan>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <RandomCharSpan>Culture </RandomCharSpan>
                        <span>{culture}</span>
                    </li>
                </ul>
            </RandomCharBlock>
        );
    }
}
