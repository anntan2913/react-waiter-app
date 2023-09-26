import { useParams } from 'react-router-dom';
import TableForm from '../features/TableForm';

const Table = () => {
    
    const { id }= useParams();    
    
    return(
        <>
        <h2>Table {id}</h2>
        <TableForm />
        </>
    );
};

export default Table;