import axios from 'axios';
import React, { useState, useEffect } from 'react';

import '../../assets/scss/admin/forms.scss';
import '../../assets/scss/admin/mealForm.scss';

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
    <section className='section bd-container-forms'>
      <div className='meal__form'>
        <div className='meal__form-heading'>Add New Meal</div>

        <div className='meal__form-subtitle'>Meal Information</div>
        <div className='meal__form-row'>
          <div className='meal__form-name'>
            <input type='text' name='' id='' placeholder='Meal name' />
          </div>
          <div className='meal__form-description'>
            <input type='text' name='' id='' placeholder='Meal description' />
          </div>
        </div>
        <div className='meal__form-row'>
          <div className='meal__form-image'>
            <input type='file' name='' id='' placeholder='Upload meal image' />
          </div>
          <div className='meal__form-category'>
            <select name='' id=''>
              <option value=''>Select meal category</option>
              <option value=''></option>
            </select>
          </div>
        </div>
        <div className='meal__form-row'>
          <div className='meal__form-vegan'>
            <input type='radio' name='' id='veganTrue' />
            <label htmlFor='veganTrue'>Yes</label>
            <input type='radio' name='' id='veganFalse' />{' '}
            <label htmlFor='veganFalse'>No</label>
          </div>
          <div className='meal__form-price'>
            <input type='number' name='' id='' placeholder='Unit Price' />
          </div>
        </div>
        <div className='meal__form-addons'>
          {' '}
          <div className='meal__form-subtitle'>Meal Add on Information</div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Add On 1' />
            <input type='number' placeholder='Add On 1 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Add On 2' />
            <input type='number' placeholder='Add On 2 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Add On 3' />
            <input type='number' placeholder='Add On 3 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Add On 4' />
            <input type='number' placeholder='Add On 4 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Add On 5' />
            <input type='number' placeholder='Add On 5 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Add On 6' />
            <input type='number' placeholder='Add On 6 Price' />
          </div>
        </div>
        <div className='meal__form-sizes'>
          <div className='meal__form-subtitle'>Meal Size Information</div>

          <div className='meal__form-row'>
            <input type='text' placeholder='Size 1 Name' />
            <input type='number' placeholder='Size 1 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Size 2 Name' />
            <input type='number' placeholder='Size 2 Price' />
          </div>
          <div className='meal__form-row'>
            <input type='text' placeholder='Size 3 Name' />
            <input type='number' placeholder='Size 3 Price' />
          </div>
        </div>

        <div className='meal__form-buttons'>
          <div className='meal__form-row'>
            <input type='button' value='Cancel' className='cancel' />
            <input type='button' value='Add Meal' className='submit' />
          </div>
        </div>
      </div>

      {/* <div className='category-form-container'>
        <div className='heading-2'>Add New Category</div>
        <input type='text' className='category-name-input' />
        <div>{image}</div>
        <input
          type='file'
          className='category-image-input'
          onChange={uploadFileHandler}
        />
        <div className='button-add-edit-category'>Add Category</div>
      </div> */}
    </section>
  );
};

export default CategoryForm;
