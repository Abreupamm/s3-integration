import React, { useState, useEffect } from 'react';
import { listFiles, downloadFile } from '../../services/upload/fileService';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<{ Key: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const data = await listFiles();
        setFiles(data);
      } catch (error) {
        setError('Error fetching files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (key: string) => {
    try {
      await downloadFile(key);
    } catch (error) {
      setError('Error downloading file');
    }
  };

  return (
    <div>
      <h2>Available Files</h2>
      {loading && <p>Loading files...</p>}
      {error && <p>{error}</p>}
      <ul>
        {files.map((file) => (
          <li key={file.Key}>
            {file.Key} <button onClick={() => handleDownload(file.Key)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
