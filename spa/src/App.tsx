/* eslint-disable-next-line */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LocationInfo } from './pages/LocationInfo';
import { Login } from './pages/Login';
import { LocationRegistration } from './pages/LocationRegistration';
import { useStateSelector } from './hooks/useRedux';
import { Loading } from './pages/Loading';

const App = () => {
    const { loading } = useStateSelector((state: any) => state.map);

    return (
        <Router>
            <Routes>
                {loading ? <Route path="/" element={<Loading />} /> : <Route path="/" element={<Home />} />}
                <Route path="/location-info" element={<LocationInfo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/location-registration" element={<LocationRegistration />} />
            </Routes>
        </Router>
    );
};

export default App;
