import React from 'react';
import "../styles/AdminHomeScreen.css";
import {FaWindowClose} from "react-icons/fa"
import { Button } from 'react-bootstrap';

const AdminForm = ({handleSubmit, handleOnChange, handleClose, rest}) => {
  return (
    <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div onClick={handleClose} className="close-btn">
                <FaWindowClose />
              </div>
              <label htmlFor="name">Name :</label>
              <input
                onChange={handleOnChange}
                type="text"
                name="name"
                id="name"
                value={rest.name}
                required
              />

              <label htmlFor="email">Email :</label>
              <input
                onChange={handleOnChange}
                type="email"
                name="email"
                id="email"
                value={rest.email}
                required
              />

              <label htmlFor="phone">PhoneNumber :</label>
              <input
                onChange={handleOnChange}
                type="tel"
                name="phone"
                id="phone"
                value={rest.phone}
                required
              />

              <label htmlFor="password">Password :</label>
              <input
                onChange={handleOnChange}
                type="password"
                name="password"
                id="password"
              />

              <Button type="submit">Submit</Button>
            </form>
          </div>
  )
}

export default AdminForm