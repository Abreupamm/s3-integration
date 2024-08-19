import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Upload to S3</h1>
      <FileUpload />
    </div>
  );
};

export default App;
