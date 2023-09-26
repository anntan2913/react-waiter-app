import  { Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Table from './components/pages/Table';
import NotFound from './components/pages/NotFound';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './redux/tablesRedux';
import { fetchTableStatus } from './redux/tableStatusRedux';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchTableStatus()), [dispatch]);

  return (
    <main>
      <Container>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Container>
    </main>    
  );
};

export default App;
