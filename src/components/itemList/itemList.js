import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemListBlock = styled.ul`
    cursor: pointer;    
`;

export default class ItemList extends Component {
 
    gotService = new gotService(); 

    state = {
        charList: null,
        error: false,
        /* loading: true */
    }

    onError = (status) => {
        this.setState({
            error: true,
            charList: null
            /* loading: false */
        })
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList,
                    /* loading: false, */
                    error: false
                })
            })
            .catch(() => {this.onError()})
    }

    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item, index) => {
            return (
                <li 
                    key={index}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(41 + index)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList, error} = this.state; 

        
        
         if (error) {
            return <ErrorMessage/>
        }

        if (!charList) {
            return <Spinner/>
        }
        
        const items = this.renderItems(charList);

        return (
            <ItemListBlock>
                {items}
            </ItemListBlock>
        );
    }
}