import React, { useState } from 'react';
import { uploadFile } from '../../services/uploadService';
import { useFileContext } from '../../context/FileContext';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const { addFile } = useFileContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.toString().split(',')[1]; // Pega apenas a string base64, sem o prefixo data:<type>;base64,

        if (base64String) {
          try {
            setUploadStatus('Uploading...');
            const response = await uploadFile(base64String, selectedFile.name);
            addFile({ fileName: selectedFile.name, url: `https://teste-devmeeting.s3.amazonaws.com/${selectedFile.name}` });
            setUploadStatus('Upload successful');
            console.log(response);
          } catch (error) {
            setUploadStatus('Upload failed');
          }
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    < div style={{ textAlign: 'center' }}>
      <h1 >Upload s3</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="file" onChange={handleFileChange} style={{ marginRight: '20px' }} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
