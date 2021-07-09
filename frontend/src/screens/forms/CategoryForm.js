import axios from 'axios';
import React, { useState, useEffect } from 'react';

import '../../assets/scss/admin/categories.scss';
import '../../assets/scss/admin/forms.scss';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <section className='section bd-container-forms full-screen'>
      <div className='category-form-container'>
        <div className='heading-2'>Add New Category</div>
        <input type='text' className='category-name-input' />
        <div>{image}</div>
        <input
          type='file'
          className='category-image-input'
          onChange={uploadFileHandler}
        />
        <div className='button-add-edit-category'>Add Category</div>
      </div>
    </section>
  );
};

export default CategoryForm;
