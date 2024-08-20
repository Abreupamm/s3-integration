import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { listFiles } from '../services/fileService';

interface FileItem {
  fileName: string;
  url: string;
}

interface FileContextProps {
  files: FileItem[];
  fetchFiles: () => Promise<void>;
  addFile: (newFile: FileItem) => void;
}

const FileContext = createContext<FileContextProps | undefined>(undefined);

export const useFileContext = (): FileContextProps => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const fetchFiles = async () => {
    try {
      const data = await listFiles();
      setFiles(data.body.files);
    } catch (error) {
      console.error('Error fetching files', error);
    }
  };

  const addFile = (newFile: FileItem) => {
    setFiles((prevFiles) => [newFile, ...prevFiles]);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <FileContext.Provider value={{ files, fetchFiles, addFile }}>
      {children}
    </FileContext.Provider>
  );
};
