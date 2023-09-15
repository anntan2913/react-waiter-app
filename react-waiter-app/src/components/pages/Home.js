import { Container, Row } from "react-bootstrap";
import  AllTables  from '../features/AllTables';

const Home = () => {
    return (
        <>
        <Container>
            <Row className="mb-2">
                <h2>All tables</h2>
                <AllTables />                        
            </Row>
        </Container>
        </>
    );
};

export default Home;