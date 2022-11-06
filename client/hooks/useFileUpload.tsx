import { useState } from 'react';
import { calculateEnergy } from '../utils/energy';
import { useActiveContent } from './useActiveContent';
import { useEnergy } from './useEnergy';

export const useUploadFile = () => {
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setDisplayNoEnergy } = useEnergy();

  const { setDefaultContent } = useActiveContent();

  const uploadFile = async (file: File | null, title: string) => {
    const body = new FormData();
    body.append('title', title);
    body.append('name', title);
    body.append('contentType', file?.type || '');

    const energy = calculateEnergy(file?.size || 0);

    const headers = new Headers();
    headers.append('actionenergy', energy.toString());

    const response = await fetch('http://localhost:7777/api/upload/file', {
      method: 'POST',
      headers,
      body,
    });

    if (response.status === 403) {
      setDisplayNoEnergy(true);
      return;
    }

    const { url } = await response.json();

    const uploadUrl = url[0];

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file?.type || '',
      },
      body: file,
    });

    if (uploadResponse.status !== 200) {
      window.alert('Upload failed');

      setError(true);
    } else {
      setFile(null);
      setTitle('');
    }
    setLoading(false);
  };

  const getFileCost = () => {
    if (file) {
      return file.size;
    }
  };

  return {
    title,
    setTitle,
    file,
    setFile,
    getFileCost,
    loading,
    error,
    uploadFile,
  };
};
