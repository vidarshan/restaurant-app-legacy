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

  const [title, setTitle] = useState('');
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

  const loadDetails = async () => {
    if (match.params.id === 'new') {
      setTitle('Add new meal');
    } else {
      setTitle('Edit meal details');
      await dispatch(mealItem(match.params.id));

      setName(meal.name);
      setDescription(meal.description);
      setImage(meal.image);
      setPrice(meal.price);
      setCategory(meal.foodType);
      setVegan(meal.vegan);

      console.log(meal.sizes);

      if (meal.addons) {
        setAddOn1Name(meal.addons[0] && meal.addons[0].addOnName);
        setAddOn1Price(meal.addons[0] && meal.addons[0].addOnName);

        setAddOn2Name(meal.addons[1] && meal.addons[1].addOnName);
        setAddOn2Price(meal.addons[1] && meal.addons[1].addOnName);

        setAddOn3Name(meal.addons[2] && meal.addons[2].addOnName);
        setAddOn3Price(meal.addons[2] && meal.addons[2].addOnName);

        setAddOn4Name(meal.addons[3] && meal.addons[3].addOnName);
        setAddOn4Price(meal.addons[3] && meal.addons[3].addOnPrice);

        setAddOn5Name(meal.addons[4] && meal.addons[4].addOnName);
        setAddOn5Price(meal.addons[4] && meal.addons[4].addOnPrice);

        setAddOn6Name(meal.addons[5] && meal.addons[5].addOnName);
        setAddOn6Price(meal.addons[5] && meal.addons[5].addOnPrice);
      }

      if (meal.sizes) {
        setSize1Name(meal.sizes[0] && meal.sizes[0].size);
        setSize1Price(meal.sizes[0] && meal.sizes[0].price);

        setSize2Name(meal.sizes[1] && meal.sizes[1].size);
        setSize2Price(meal.sizes[1] && meal.sizes[1].price);

        setSize3Name(meal.sizes[2] && meal.sizes[2].size);
        setSize3Price(meal.sizes[2] && meal.sizes[2].price);
      }
    }
  };

  useEffect(() => {
    dispatch(listCategories());
    console.log(match.params);
    loadDetails();
  }, [dispatch, match]);

  return (
    <section className='section bd-container-forms'>
      <div className='meal__form'>
        <div className='meal__form-heading'>{title}</div>

        {error && <Message message={error}></Message>}

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
                  value={category}
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
                  value={addOn1Name}
                  onChange={(e) => setAddOn1Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 1 Price'
                  value={addOn1Price}
                  onChange={(e) => setAddOn1Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 2'
                  value={addOn2Name}
                  onChange={(e) => setAddOn2Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 2 Price'
                  value={addOn2Price}
                  onChange={(e) => setAddOn2Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 3'
                  value={addOn3Name}
                  onChange={(e) => setAddOn3Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 3 Price'
                  value={addOn3Price}
                  onChange={(e) => setAddOn3Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 4'
                  value={addOn4Name}
                  onChange={(e) => setAddOn4Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 4 Price'
                  value={addOn4Price}
                  onChange={(e) => setAddOn4Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 5'
                  value={addOn5Name}
                  onChange={(e) => setAddOn5Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 5 Price'
                  value={addOn5Price}
                  onChange={(e) => setAddOn5Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Add On 6'
                  value={addOn6Name}
                  onChange={(e) => setAddOn6Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Add On 6 Price'
                  value={addOn6Price}
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
                  value={size1Name}
                  onChange={(e) => setSize1Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Size 1 Price'
                  value={size1Price}
                  onChange={(e) => setSize1Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Size 2 Name'
                  value={size2Name}
                  onChange={(e) => setSize2Name(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Size 2 Price'
                  value={size2Price}
                  onChange={(e) => setSize2Price(e.target.value)}
                />
              </div>
              <div className='meal__form-row'>
                <input
                  type='text'
                  placeholder='Size 3 Name'
                  value={size3Name}
                  onChange={(e) => setSize3Name(e.target.value)}
                />

                <input
                  type='number'
                  placeholder='Size 3 Price'
                  value={size3Price}
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
