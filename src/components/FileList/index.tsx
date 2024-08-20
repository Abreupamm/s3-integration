import React from 'react';
import { useFileContext } from '../../context/FileContext';

const FileList: React.FC = () => {
  const { files, fetchFiles } = useFileContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Arquivos disponíveis</h2>
      {files.length === 0 ? <span>No files</span> : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {files.map((file) => (
            <li key={file.fileName} style={{ margin: '10px', display: 'flex', alignItems: 'center', width: '500px' }}>
              <img 
                src={file.url} 
                alt={file.fileName} 
                width='200px'
                height='100%'
                style={{ objectFit: 'cover', marginRight: '10px', background: 'black' }} 
              />
              <div style={{ flex: 1 , textAlign: 'center'}}>
                {file.fileName}
              </div>
              <button 
                onClick={() => window.open(file.url, '_blank')}
                style={{ padding: '5px 10px', cursor: 'pointer' }}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
