import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { mealCreate, mealItem } from '../../actions/mealActions';
import { listCategories } from '../../actions/categoryActions';
import { map } from '../../lodash';

import '../../assets/scss/admin/forms.scss';
import '../../assets/scss/admin/meals.scss';

const CategoryForm = ({ match }) => {
  const dispatch = useDispatch();

  const createMeal = useSelector((state) => state.mealCreate);
  const categoryList = useSelector((state) => state.categories);
  const item = useSelector((state) => state.mealItem);

  const { loading, success, error } = createMeal;
  const { loading: mealloading, error: mealerror, meal } = item;

  const {
    // loadingcategories: loading,
    // successcategories: success,
    categories,
  } = categoryList;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('');
  const [vegan, setVegan] = useState(false);
  const [price, setPrice] = useState(0);
  const [addOn1Name, setAddOn1Name] = useState('');
  const [addOn1Price, setAddOn1Price] = useState(0);
  const [addOn2Name, setAddOn2Name] = useState('');
  const [addOn2Price, setAddOn2Price] = useState(0);
  const [addOn3Name, setAddOn3Name] = useState('');
  const [addOn3Price, setAddOn3Price] = useState(0);
  const [addOn4Name, setAddOn4Name] = useState('');
  const [addOn4Price, setAddOn4Price] = useState(0);
  const [addOn5Name, setAddOn5Name] = useState('');
  const [addOn5Price, setAddOn5Price] = useState(0);
  const [addOn6Name, setAddOn6Name] = useState('');
  const [addOn6Price, setAddOn6Price] = useState(0);
  const [size1Name, setSize1Name] = useState('');
  const [size1Price, setSize1Price] = useState(0);
  const [size2Name, setSize2Name] = useState('');
  const [size2Price, setSize2Price] = useState(0);
  const [size3Name, setSize3Name] = useState('');
  const [size3Price, setSize3Price] = useState(0);

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

  const addMealHandler = () => {
    const newMeal = {
      name,
      foodType: category,
      sizes: [
        { size: size1Name, content: 4, price: size1Price },
        { size: size2Name, content: 6, price: size2Price },
        { size: size3Name, content: 8, price: size3Price },
      ],
      addons: [
        { addOnName: addOn1Name, addOnPrice: addOn1Price },
        { addOnName: addOn2Name, addOnPrice: addOn2Price },
        { addOnName: addOn3Name, addOnPrice: addOn3Price },
        { addOnName: addOn4Name, addOnPrice: addOn4Price },
        { addOnName: addOn5Name, addOnPrice: addOn5Price },
        { addOnName: addOn6Name, addOnPrice: addOn6Price },
      ],
      price,
      image,
      vegan,
      orders: 0,
      rating: 0,
      description,
      ordersThisWeek: 0,
    };

    dispatch(mealCreate(newMeal));
  };

  useEffect(() => {
    dispatch(listCategories());
    if (match.params.id) {
      dispatch(mealItem(match.params.id));
      console.log(meal);
      setName(meal.name);
      setDescription(meal.description);
      setImage(meal.image);
      setPrice(meal.price);
      setCategory(meal.foodType);
      setVegan(meal.vegan);

      map(meal.addons, (addon, e) => {
        console.log(e);
      });
    }
  }, [dispatch, match]);

  return (
    <section className='section bd-container-forms'>
      <div className='meal__form'>
        <div className='meal__form-heading'>Add New Meal</div>

        {error || (mealerror && <Message message={error}></Message>)}

        {loading || mealloading ? (
          <Loader></Loader>
        ) : (
          <>
            <div className='meal__form-subtitle'>Meal Information</div>

            <div className='meal__form-row'>
              <div className='meal__form-name'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  placeholder='Meal name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='meal__form-description'>
                <input
                  type='text'
                  name='description'
                  id='description'
                  value={description}
                  placeholder='Meal description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className='meal__form-row'>
              <div className='meal__form-image'>
                <input
                  type='file'
                  name='image'
                  id='image'
                  placeholder='Upload meal image'
                  onChange={uploadFileHandler}
                />
              </div>
              <div className='meal__form-category'>
                <select
                  name='category'
                  id='category'
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value=''>Select meal category</option>
                  {map(categories, (category) => {
                    return (
                      <option value={category.name}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='meal__form-row'>
              <div className='meal__form-vegan'>
                <input
                  type='radio'
                  name='veganTrue'
                  checked={vegan && 'checked'}
                  id='veganTrue'
                  onClick={(e) => setVegan(true)}
                />
                <label htmlFor='veganTrue'>Yes</label>
                <input
                  type='radio'
                  name='veganFalse'
                  id='veganFalse'
                  checked={!vegan && 'checked'}
                  onClick={(e) => setVegan(false)}
                />{' '}
                <label htmlFor='veganFalse'>No</label>
              </div>
              <div className='meal__form-price'>
                <input
                  type='number'
                  name='price'
                  value={price}
                  id='price'
                  placeholder='Unit Price'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className='meal__form-addons'>
              <div className='meal__form-subtitle'>Meal Add on Information</div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 1'
                  onChange={(e) => setAddOn1Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 1 Price'
                  onChange={(e) => setAddOn1Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 2'
                  onChange={(e) => setAddOn2Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 2 Price'
                  onChange={(e) => setAddOn2Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 3'
                  onChange={(e) => setAddOn3Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 3 Price'
                  onChange={(e) => setAddOn3Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 4'
                  onChange={(e) => setAddOn4Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 4 Price'
                  onChange={(e) => setAddOn4Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 5'
                  onChange={(e) => setAddOn5Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 5 Price'
                  onChange={(e) => setAddOn5Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 6'
                  onChange={(e) => setAddOn6Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 6 Price'
                  onChange={(e) => setAddOn6Price(e.target.value)}
                />
              </div>
            </div>
            <div className='meal__form-sizes'>
              <div className='meal__form-subtitle'>Meal Size Information</div>

              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Size 1 Name'
                  onChange={(e) => setSize1Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Size 1 Price'
                  onChange={(e) => setSize1Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Size 2 Name'
                  onChange={(e) => setSize2Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Size 2 Price'
                  onChange={(e) => setSize2Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Size 3 Name'
                  onChange={(e) => setSize3Name(e.target.value)}
                />

                <input
                  type='number'
                  placeholder='Size 3 Price'
                  onChange={(e) => setSize3Price(e.target.value)}
                />
              </div>
            </div>

            <div className='meal__form-buttons'>
              <div className='meal__form-row'>
                <input type='button' value='Cancel' className='cancel' />
                <input
                  type='button'
                  value='Add Meal'
                  className='submit'
                  onClick={() => addMealHandler()}
                />
              </div>
            </div>
          </>
        )}
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
