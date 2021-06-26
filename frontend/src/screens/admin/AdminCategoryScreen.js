import React from 'react';

const AdminCategoriesScreen = () => {
  return (
    <section className='section bd-container-meals' id='menu'>
      <table>
        <tr>
          <th>Category Name</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>Pizza</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
        <tr>
          <td>Taco</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Burritto</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Sandwitch</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </section>
  );
};

export default AdminCategoriesScreen;
