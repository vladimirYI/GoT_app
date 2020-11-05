import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


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
        char: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char, loading: false})
            })
            .catch(this.onError)
    }

    render() {
        const {char, error, loading} = this.state; 

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const items = !(loading || errorMessage) ? <View char ={char}/> : null;

        /* if (!this.state.char) {
            return <Spinner/>
        } */

        /* if(!this.state.char) {
            return <span className='select-error'>Please select a character</span>     
        } */

        return (
            <CharDetailsBlock className="rounded">
               {errorMessage}
               {spinner}
               {items}
            </CharDetailsBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
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
        </>
    )
}