import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useRef } from 'react';
import { useEffect } from 'react';

const DataTable = ({ data }) => {
    return (
        <Container>
            <Table className='table table-hover table-dark'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>page views</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Cid}</td>
                            <td>{item.NameMMT}</td>
                            <td>{item.Prc}</td>
                            <td>{item.PageViews}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;
/* */