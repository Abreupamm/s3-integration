import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const uploadFile = async (base64String: string, fileName: string) => {
  const payload = {
    file: base64String,
    name: fileName,
  };

  try {
    const response = await axios.post(`${API_URL}/upload`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error uploading file');
  }
};
