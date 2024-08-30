import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat'; 
import Home from  './components/Home'; 
import Layout from './components/Layout';
import NotFound from './components/NotFound'; // Optional: For 404 handling
import ImageGeneration from './components/ImageGeneration';
import Transcribe from './components/Transcribe';
import Translate from './components/Translate';
import Vtt from './components/Vtt';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />  
                    <Route path="/chat" element={<Chat  />} />
                    <Route path="/ImageGeneration" element={<ImageGeneration />}/>
                    <Route path="/Transcribe" element={<Transcribe  />} />
                    <Route path="/Translate" element={<Translate  />} /> 
                    <Route path="/Vtt" element={<Vtt  />} /> 
                    <Route path="*" element={<NotFound />} /> {/* Optional: Handle 404 */}
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
