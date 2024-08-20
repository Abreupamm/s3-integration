import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const listFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching files');
  }
};

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove(); // Remove o link do DOM após o clique
  } catch (error) {
    throw new Error('Error downloading file');
  }
};
