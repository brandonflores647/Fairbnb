import { useState, useEffect } from 'react';

const EditFileUpload = ({ updateFiles, images }) => {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (!images) {
      setPreview([]);
      return;
    }

    if (Array.isArray(images)) {
      setPreview(images.filter(img => img !== ''));
    } else {
      const newPrev = [];
      for (let i = 0; i <= Object.values(images).length-1; i++) {
        const objUrl = URL.createObjectURL(images[i]);
        newPrev.push(objUrl);
      }
      setPreview(newPrev);
    }

    return () => {
      if (Object.values(images).length) {
        for (let i = 0; i <= Object.values(images).length-1; i++) {
          URL.revokeObjectURL(images[i]);
        }
      }
    }
  }, [images]);

  return (
    <div id='file-upload-container'>
      <label className='edit-form-label'>
        Upload Images
        <div id='edit-spot-images'>
          <label className='edit-form-label'>
            <input
              id='img-input'
              type="file"
              onChange={updateFiles}
              multiple
              accept=".png, .jpg, .jpeg"
              name='imgInput'
            />
          </label>
        </div>
      </label>
      <div id='upload-image-container'>
        {preview.map((url, i) => (
          <img src={url} alt='' className='preview-img' key={`img-${i}`}></img>
        ))}
      </div>
    </div>
  );
}

export default EditFileUpload;
