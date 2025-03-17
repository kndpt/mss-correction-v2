import axios from 'axios';

import { BACKEND_AI_URL } from 'src/config-global';

const HOST = BACKEND_AI_URL;

export async function sendAiScanFile(file: File) {
  if (!file) throw new Error('No file provided');
  if (!HOST) throw new Error('No URL provided');

  const url = `${HOST}/scan-file-v2`;

  const data = new FormData();
  data.append('file', file);

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    const errorMessage = 'Error sending file to AI';
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}
