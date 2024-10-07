import React, { useState } from 'react';
import axios from 'axios';
import MediaDisplay from './components/MediaDisplay';
import InteractivePanel from './components/InteractivePanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState({ message: '', mediaUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse({ message: '', mediaUrl: '' });
    setError('');

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (input) formData.append('message', input);

    try {
      let res;
      switch (activeTab) {
        case 'chat':
          res = await axios.post('http://localhost:5000/api/chat', { message: input });
          setResponse({ message: res.data.response, mediaUrl: '' });
          break;
        case 'tts':
          res = await axios.post('http://localhost:5000/api/tts', { message: input }, { responseType: 'blob' });
          const audioUrl = URL.createObjectURL(new Blob([res.data]));
          setResponse({ message: '', mediaUrl: audioUrl });
          break;
        case 'transcribe':
          res = await axios.post('http://localhost:5000/api/transcribe', formData);
          setResponse({ message: res.data['audio transcript'], mediaUrl: '' });
          break;
        case 'translate':
          res = await axios.post('http://localhost:5000/api/translate', formData);
          setResponse({ message: res.data.translated, mediaUrl: '' });
          break;
        case 'imgEdit':
          res = await axios.post('http://localhost:5000/api/imgEdit', formData);
          setResponse({ message: 'Your edited image', mediaUrl: res.data.saved_path });
          break;
        case 'imgVariation':
          res = await axios.post('http://localhost:5000/api/imgVariation', formData);
          setResponse({ message: res.data.message, mediaUrl: res.data.saved_path });
          break;
        case 'imggen':
          res = await axios.post('http://localhost:5000/api/imggen', { prompt: input });
          setResponse({ message: res.data.message, mediaUrl: res.data.saved_path });
          break;
        case 'vtt':
          res = await axios.post('http://localhost:5000/api/vtt', formData);
          setResponse({ message: res.data.message, mediaUrl: res.data.file_path });
          break;
        
        default:
          setResponse({ message: 'Invalid operation', mediaUrl: '' });
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App container-fluid">
      <header className="row">
        <div className="col-12">
          <h1>OpenAI Integration App</h1>
        </div>
      </header>
      <nav className="row">
        <div className="col-12">
          <ul className="nav nav-pills flex space justify">
            <li className="nav-item dropdown">
              <button className={`nav-link dropdown-toggle ${['imggen', 'imgEdit', 'imgVariation'].includes(activeTab) ? 'active' : ''}`} data-toggle="dropdown">
                Image Operations
              </button>
              <div className="dropdown-menu">
                <button onClick={() => setActiveTab('imggen')} className={`dropdown-item ${activeTab === 'imggen' ? 'active' : ''}`}>Image Generation</button>
                <button onClick={() => setActiveTab('imgEdit')} className={`dropdown-item ${activeTab === 'imgEdit' ? 'active' : ''}`}>Image Edit</button>
                <button onClick={() => setActiveTab('imgVariation')} className={`dropdown-item ${activeTab === 'imgVariation' ? 'active' : ''}`}>Image Variation</button>
              </div>
            </li>
            <li className="nav-item dropdown">
              <button className={`nav-link dropdown-toggle ${['chat', 'tts', 'transcribe', 'translate', 'vtt'].includes(activeTab) ? 'active' : ''}`} data-toggle="dropdown">
                Text Operations
              </button>
              <div className="dropdown-menu">
                <button onClick={() => setActiveTab('chat')} className={`dropdown-item ${activeTab === 'chat' ? 'active' : ''}`}>Chat</button>
                <button onClick={() => setActiveTab('tts')} className={`dropdown-item ${activeTab === 'tts' ? 'active' : ''}`}>Text to Speech</button>
                <button onClick={() => setActiveTab('transcribe')} className={`dropdown-item ${activeTab === 'transcribe' ? 'active' : ''}`}>Transcribe</button>
                <button onClick={() => setActiveTab('translate')} className={`dropdown-item ${activeTab === 'translate' ? 'active' : ''}`}>Translate</button>
                <button onClick={() => setActiveTab('vtt')} className={`dropdown-item ${activeTab === 'vtt' ? 'active' : ''}`}>VTT Generation</button>
              </div>
            </li>
             
               
          </ul>
        </div>
      </nav>
      <main className="row">
        <div>
          <InteractivePanel activeEndpoint={activeTab} handleSubmit={handleSubmit} input={input} setInput={setInput} file={file} setFile={setFile} loading={loading} />
        </div>
        <div>
          <MediaDisplay response={response} isLoading={loading} error={error} />
        </div>
      </main>
    </div>
  );
}

export default App;