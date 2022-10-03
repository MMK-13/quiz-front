import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Components/Header';
import ListQuiz from '../Components/ListQuiz';

const Home = () => {
    const navigate = useNavigate();
    const [connected, setConnected] = useState(false);
    
    useEffect(() => {
        const ID = localStorage.getItem('ID');
        if (ID === null) {
            navigate('/account/login');           
        } else {
            setConnected(true);
        }
    }, [connected]);

    

    return (
        <div className='Home'>
            <Header connected={ connected } />
            <div className='container'>
                <ListQuiz />
            </div>
        </div>
    );
}

export default Home;