'use client';

import { useState } from 'react';

interface Props {
  onVideoSelected: (file: File) => void;
}

export default function SingleVideoPicker({ onVideoSelected }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Kirim video ke induk
    onVideoSelected(file);
  };

  return (
    <div className="p-4 max-w-xl">
      <label
        htmlFor="videoInput"
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer inline-block"
      >
        Choose video
      </label>
      <input
        id='videoInput'
        type="file"
        accept="video/*"
        onChange={handleChange}
        className="mb-4"
      />
      {previewUrl && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Preview Video:</h3>
          <video
            src={previewUrl}
            controls
            className="w-full h-64 bg-black rounded"
          />
        </div>
      )}
    </div>
  );
}
