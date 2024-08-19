import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const listFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/files`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching files');
  }
};

export const downloadFile = async (key: string) => {
  try {
    const response = await axios.get(`${API_URL}/download/${key}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', key);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw new Error('Error downloading file');
  }
};
