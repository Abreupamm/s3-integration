import React from 'react';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import { FileProvider } from './context/FileContext';

const App: React.FC = () => {
  return (
    <FileProvider>
      <div>
        <FileUpload />
        <FileList />
      </div>
    </FileProvider>
  );
};

export default App;
