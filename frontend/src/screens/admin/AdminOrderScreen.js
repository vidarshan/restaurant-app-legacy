import React from 'react';

import '../../assets/scss/admin/orders.scss';

const AdminOrderScreen = () => {
  return (
    <section className='section bd-container-orders' id='menu'>
      <table>
        <tr>
          <th>Order ID</th>
          <th>Order From</th>
          <th>Delievery Address</th>
          <th>Order Content</th>
          <th>Payment Method</th>
          <th>Order Status</th>
          <th></th>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>10, Miami, Florida, 10220</td>
          <td>1 x Philly cheese steak</td>
          <td>Cash on delivery</td>
          <td>Preparing</td>
          <td>Move to Next Step</td>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>10, Miami, Florida, 10220</td>
          <td>1 x Philly cheese steak</td>
          <td>Cash on delivery</td>
          <td>Preparing</td>
          <td>Move to Next Step</td>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>10, Miami, Florida, 10220</td>
          <td>1 x Philly cheese steak</td>
          <td>Cash on delivery</td>
          <td>Preparing</td>
          <td>Move to Next Step</td>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>10, Miami, Florida, 10220</td>
          <td>1 x Philly cheese steak</td>
          <td>Cash on delivery</td>
          <td>Preparing</td>
          <td>Move to Next Step</td>
        </tr>
      </table>
    </section>
  );
};

export default AdminOrderScreen;
