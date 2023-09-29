import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllTables, getTableLoadingState, getTableUpdateError } from "../../redux/tablesRedux";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { removeTableRequest } from "../../redux/tablesRedux";
import { ModalHeader, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap";

const AllTables = () => {

    const { id } = useParams();

    const loading = useSelector(getTableLoadingState); //zmiana z uż. loading jako stanu lok. w komp. w magaz
    const tables = useSelector(getAllTables);
    const updateError = useSelector(getTableUpdateError);

    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handleRemoveTable = e => {
        e.preventDefault();
        dispatch(removeTableRequest(id));
        handleClose();     
    };  

    if (updateError) {
        return <div> Server Error: {updateError}</div>;
    } 

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
                        <div className="d-flex flex-wrap align-items-center justify-content-between px-0">
                        <Button variant="primary" as={Link} key={table.id} to={`/table/${table.id}`} 
                                style={{ width: '130px', height: '40px', fontSize: '16px', textAlign: "center", marginTop: '3px', flexBasis: "calc(50% - 20px)" }}>Show more</Button>                                          
                        <Button variant="outline-danger" onClick={handleShow}
                                style={{ width: '120px', height: '40px', fontSize: '16px', textAlign: "center", marginTop: '3px', flexBasis: "calc(50% - 20px)" }} >Delete</Button>                                       
                        </div>
                    </ListGroupItem>              
                ))}
            </ListGroup>
            )} 

            <Modal show={show} onHide={handleClose} style={{ width: '100w' }}>
              <ModalHeader closeButton>
                <ModalTitle>Are you sure?</ModalTitle>
              </ModalHeader>
              <ModalBody>
                This operation will completely remove this table from the app.
                <br/>
                Are you sure you want to do that?
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleRemoveTable}>Remove</Button>
              </ModalFooter>
            </Modal>          
        </section>
       
    );
};

export default AllTables;