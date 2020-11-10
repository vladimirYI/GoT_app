import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
    }
`;

const ItemDetailsSpan = styled.span`
    font-weight: bold;
`;

const SelectItemSpan = styled.span`
    color:#fff;
    font-size: 22px;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <ItemDetailsSpan>{label}</ItemDetailsSpan>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    state = {
        item: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            item: null
        })
    }

    updateItem() {
        const{itemId, getData} = this.props;

        if(!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then(this.onItemDetailsLoaded)
            .catch(this.onError)
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <SelectItemSpan>Please select item</SelectItemSpan>
        }

        const {item} = this.state;
        const {name} = item;

        if (this.state.loading) {
            return (
                <ItemDetailsBlock className="rounded">
                    <Spinner/>
                </ItemDetailsBlock>
            )
        }

        return (
            <ItemDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                       React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                       })
                   }
                </ul>
            </ItemDetailsBlock>
        );
    }
}