import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
    }
`;

const CharDetailsSpan = styled.span`
    font-weight: bold;
`;

export default class CharDetails extends Component {

    gotService = new gotService(); 

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
    }

    render() {

        if(!this.state.char) {
            return <span className='select-error'>Please select a character</span>     
        }

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <CharDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Gender</CharDetailsSpan>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Born</CharDetailsSpan>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Died</CharDetailsSpan>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Culture</CharDetailsSpan>
                        <span>{culture}</span>
                    </li>
                </ul>
            </CharDetailsBlock>
        );
    }
}