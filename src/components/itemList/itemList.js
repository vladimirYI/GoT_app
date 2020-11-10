import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemListBlock = styled.ul`
    cursor: pointer;    
`;

export default class ItemList extends Component {
 
    state = {
        itemList: null,
        error: false
    }

    onError = () => {
        this.setState({
            error: true,
            itemList: null
        })
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList,
                    error: false
                })
            })
            .catch(this.onError);
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList, error} = this.state; 
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList) {
            return <Spinner/>
        }
        
        const items = this.renderItems(itemList);

        return (
            <ItemListBlock>
                {items}
            </ItemListBlock>
        );
    }
}