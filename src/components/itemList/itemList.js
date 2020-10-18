import React, {Component} from 'react';
import styled from 'styled-components';

const ItemListBlock = styled.ul`
    cursor: pointer;    
`;

export default class ItemList extends Component {

    render() {
        return (
            <ItemListBlock>
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ItemListBlock>
        );
    }
}