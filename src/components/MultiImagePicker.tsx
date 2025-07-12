'use client';

import { useState } from 'react';

interface Props {
  onImagesSelected: (files: File[]) => void;
}

export default function MultiCloudinaryUploader({ onImagesSelected }: Props) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const selected = Array.from(files);

    const previews = selected.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);

    // Kirim file ke induk
    onImagesSelected(selected);
  };

  return (
    <div className="p-4 max-w-xl">
      <label
        htmlFor="imagesInput"
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer inline-block"
      >
        Choose Images
      </label>
      <input
        id='imagesInput'
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="mb-4"
      />

      {previewUrls.length > 0 && (
        <>
          <h3 className="text-sm font-semibold mb-2">Preview Images:</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {previewUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Preview-${i}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
