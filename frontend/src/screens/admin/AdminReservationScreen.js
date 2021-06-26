import React from 'react';

import '../../assets/scss/admin/reservations.scss';

const AdminReservationScreen = () => {
  return (
    <section className='section bd-container-reservations' id='menu'>
      {' '}
      <table>
        <tr>
          <th>Reservation ID</th>
          <th>Reserved By</th>
          <th>Reservation Description</th>
          <th>Reservation Date</th>
          <th>Reservation Time</th>
          <th>Reservation Duration</th>
          <th></th>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>1 Upstair 4 chair table #38</td>
          <td>11-05-2021</td>
          <td>08:00 PM</td>
          <td>45 mins</td>
          <td>Change Details</td>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>1 Upstair 4 chair table #38</td>
          <td>11-05-2021</td>
          <td>08:00 PM</td>
          <td>45 mins</td>
          <td>Change Details</td>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>1 Upstair 4 chair table #38</td>
          <td>11-05-2021</td>
          <td>08:00 PM</td>
          <td>45 mins</td>
          <td>Change Details</td>
        </tr>
        <tr>
          <td>33121221e433c5v</td>
          <td>John Doe</td>
          <td>1 Upstair 4 chair table #38</td>
          <td>11-05-2021</td>
          <td>08:00 PM</td>
          <td>45 mins</td>
          <td>Change Details</td>
        </tr>
      </table>
    </section>
  );
};

export default AdminReservationScreen;
