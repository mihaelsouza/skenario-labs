import './PropertyView.css';
import React, { useState } from 'react';

import { CountryDropdown } from 'react-country-region-selector';
import { addNewProperty } from '../../services/ServerService';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { storeProperties } from '../../redux/propertySlice';
import { closeModal } from '../../redux/modalSlice';

interface Props {
  actionMode: string;
}

interface Form {
  [key: string]: string;
  name: string;
  street: string;
  postalCode: string;
  city: string;
  municipality: string;
  country: string;
  description: string;
}

const formInitialState = {
  name: '',
  street: '',
  postalCode: '',
  city: '',
  municipality: '',
  country: '',
  description: '',
};

const PropertyView: React.FC<Props> = ({ actionMode }: Props) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.users.userId);
  const properties = useAppSelector(state => state.properties.value);
  const [form, setForm] = useState<Form>(formInitialState);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      if (actionMode === 'addProperty' && Object.values(form).indexOf('') === -1) {
        const property = await addNewProperty(userId, form);
        const newPropertiesArray = [...properties, property];
        dispatch(storeProperties(newPropertiesArray));
        dispatch(closeModal());
      }
    } catch (e) {
      alert('Could not add new property due to unexpected server error. Try again later!');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name: keyof Form = event.target.name;
    const value = event.target.value;
    const newForm = {...form};
    newForm[name] = value;

    setForm({...newForm});
  };

  const handleCountry = (countryName: string): void => {
    setForm({...form, country: countryName});
  };

  const handleReset = (): void => {
    setForm({...formInitialState});
  };

  return (
    <div>
      <h1>{actionMode === 'addProperty' ? 'Add New Property' : 'Edit Property'}</h1>
      <form className="form-add-property" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange(event)}
            maxLength={30}
          ></input>
        </label>
        <label htmlFor="street">
          Street:
          <input
            name="street"
            type="text"
            value={form.street}
            onChange={(event) => handleChange(event)}
            maxLength={50}
          ></input>
        </label>
        <label htmlFor="postalCode">
          Postal Code:
          <input
            name="postalCode"
            type="text"
            value={form.postalCode} onChange={(event) => handleChange(event)}
            maxLength={30}
          ></input>
        </label>
        <label htmlFor="municipality">
          Municipality:
          <input
            name="municipality"
            type="text"
            value={form.municipality} onChange={(event) => handleChange(event)}
            maxLength={50}
          ></input>
        </label>
        <label htmlFor="city">
          City:
          <input
            name="city"
            type="text"
            value={form.city} onChange={(event) => handleChange(event)}
            maxLength={50}
          ></input>
        </label>
        <label htmlFor="country">
          Country:
          <CountryDropdown
            name="country"
            value={form.country}
            onChange={(country) => handleCountry(country)}
            classes="country-dropdown"
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={(event) => handleChange(event)}
            maxLength={1000}
            cols={250}
            rows={4}
          ></textarea>
        </label>
        <div className="add-property-form-btn">
          { actionMode === 'addProperty'
            ? (
              <input type="reset" onClick={handleReset}></input>
            ) : (
              <></>
            )
          }
          <input type="submit" onClick={handleSubmit}></input>
        </div>
      </form>
    </div>
  )
}

export default PropertyView;
