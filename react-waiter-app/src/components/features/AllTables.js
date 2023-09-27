import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getAllTables, getTableLoadingState } from "../../redux/tablesRedux";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";

const AllTables = () => {

    const loading = useSelector(getTableLoadingState); //zmiana z uż. loading jako stanu lok. w komp. w magaz
    const tables = useSelector(getAllTables);

    return (
        <section>
            {loading ? ( // jeśli dane są akt. ładowane, pokaż spinner
                <Loader />
            ) : (
            <ListGroup variant="flush" className="mt-4">  
                {tables.map(table => (
                    <ListGroupItem key={table.id} className='d-flex justify-content-between align-items-start px-0' > 
                        <div className='d-flex align-items-center' style={{ hight: '100%' }} >
                            <h4 style={{ marginRight: '16px' }}>Table {table.id}</h4>
                            <h6 style={{ margin: '0'}} ><strong>  Status:</strong> {table.status}</h6>                                                       
                        </div> 
                        <Button variant="primary" as={Link} key={table.id} to={`/table/${table.id}`} 
                                style={{ width: '130px', height: '40px', fontSize: '15px', textAlign: "center", marginTop: '3px'}}>Show more</Button>                                          
                    </ListGroupItem>              
                ))}
            </ListGroup>
            )}           
        </section>
    )
}

export default AllTables;