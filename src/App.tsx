import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Upload to S3</h1>
      <FileUpload />
      <h1>Download from S3</h1>
      <FileList />
    </div>
  );
};

export default App;
