import React, {Component} from 'react';
import styled from 'styled-components';

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

    render() {
        return (
            <CharDetailsBlock className="rounded">
                <h4>John Snow</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Gender</CharDetailsSpan>
                        <span>male</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Born</CharDetailsSpan>
                        <span>1783</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Died</CharDetailsSpan>
                        <span>1820</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <CharDetailsSpan>Culture</CharDetailsSpan>
                        <span>First</span>
                    </li>
                </ul>
            </CharDetailsBlock>
        );
    }
}