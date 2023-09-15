import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getAllTables } from "../../redux/tablesRedux";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";

const AllTables = () => {

    const [isLoading, setIsLoading] = useState(true);
    const tables = useSelector(getAllTables);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false); // dane zostały wczytane
        }, 1000); //opóźn. 1 sec
    }, []);

    return (
        <section>
            {isLoading ? ( // jeśli dane są akt. ładowane, pokaż spinner
                <Loader />
            ) : (
            <ListGroup variant="flush" className="mt-4">  
                {tables.map(table => (
                    <ListGroupItem key={table.id} className='d-flex justify-content-between align-items-start ' > 
                        <div className='d-flex align-items-center' style={{ hight: '100%' }} >
                            <h4 style={{ marginRight: '20px' }}>Table {table.id}</h4>
                            <h6><strong>  Status:</strong> {table.status}</h6>                                                       
                        </div> 
                        <Button variant="primary" as={Link} key={table.id} to={`/table/${table.id}`} 
                                style={{ width: '130px', height: '40px', fontSize: '16px', textAlign: "center"}}>Show more</Button>                                          
                    </ListGroupItem>              
                ))}
            </ListGroup>
            )}           
        </section>
    )
}

export default AllTables;