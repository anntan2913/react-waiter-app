import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTableById, updateTableRequest } from "../../redux/tablesRedux";
import { useEffect, useState } from "react";
import { Form, Row, Col, Button  } from "react-bootstrap";
import { getTableStatus } from "../../redux/tableStatusRedux";

const TableForm = () => {

    const { id } = useParams();
    const tableData = useSelector(state => getTableById(state, id));    
    const tableStatus = useSelector(getTableStatus);

    const[status, setStatus] = useState(tableData?.status || '');
    const[peopleAmount, setPeopleAmount] = useState(tableData?.peopleAmount || 0);
    const[maxPeopleAmount, setMaxPeopleAmount] = useState(tableData?.maxPeopleAmount || 0);
    const[bill, setBill] = useState((tableData?.bill || 0));
    const [isBillVisible, setIsBillVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e =>{
    e.preventDefault();
    dispatch(updateTableRequest({status, peopleAmount, maxPeopleAmount, bill, id}));
    navigate('/');
    };

    useEffect(() => {
        if(tableData){
            setStatus(tableData.status);
            setPeopleAmount(tableData.peopleAmount);
            setMaxPeopleAmount(tableData.maxPeopleAmount);
            setBill(tableData.bill);                    
        }         
    }, [tableData]);

    useEffect(() => {
        if (status === "Busy") {
        setIsBillVisible(true);
        } else {
        setIsBillVisible(false);
        setBill(0);
        }

        if (status === "Cleaning" || status === "Free") {
            setPeopleAmount(0); // Feld "People amount" = 0
        }
    }, [status]);

    useEffect(() => {
        if (maxPeopleAmount > 10) {
            setMaxPeopleAmount(10);
        }
        if (maxPeopleAmount < 0) {
            setMaxPeopleAmount(0);
        }
        // PeopleAmount should be <= maxPeopleAmount
        if (peopleAmount >= maxPeopleAmount) {
            setPeopleAmount(maxPeopleAmount);
        }
    }, [maxPeopleAmount, peopleAmount]);


  if (!tableData) {
    navigate('/');
  } else
    return (      
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3 justify-content-start" controlId="formHorizontalStatus">
            <Form.Label column sm={2} style={{ width: '100px'}}>
                <h6><strong>Status: </strong></h6>
            </Form.Label>
            <Col sm={4}>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)} style={{ width: "80%" }} >
                    {tableStatus.map(status => (
                    <option key={status}>{status}</option>
                    ))}
                </Form.Select>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPeople">
            <Form.Label column sm={2} style={{ width: '100px'}}>
                <h6><strong>People: </strong></h6>
            </Form.Label>
            <Col sm={3} style={{ width: '160px'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Control  value={peopleAmount} onChange={e => setPeopleAmount(parseInt(e.target.value))} style={{ flex: 1, marginRight: '10px' }} />
                    <span style={{ fontWeight: 'bold' }}> / </span>
                    <Form.Control  value={maxPeopleAmount} onChange={e => setMaxPeopleAmount(e.target.value)} style={{ flex: 1, marginLeft: '10px' }} />
                </div>
            </Col>
        </Form.Group>

        {isBillVisible && (
         <Form.Group as={Row} className="mb-3" controlId="formHorizontalBill">
            <Form.Label column sm={2} style={{ width: '80px'}}>
                <h6><strong>Bill: </strong></h6>
            </Form.Label>
            <Col sm={3} style={{ display: 'flex', alignItems: 'center', width: "140px" }}>
                <span>$ </span>
                <Form.Control value={bill} onChange={e => setBill(e.target.value)} style={{  marginLeft: '10px' }} />
            </Col>
        </Form.Group>      
        )}
        <Form.Group as={Row} className="mb-3 d-flex align-items-center">
            <Col sm={6}>
            <Button type="submit" className="mb-3" >Update</Button>
            </Col>
        </Form.Group>
      </Form>
    );
};

export default TableForm;