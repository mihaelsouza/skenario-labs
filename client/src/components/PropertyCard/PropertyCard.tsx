import './PropertyCard.css';
import React from 'react';

import { Property } from '../../interfaces/Property';
import { useAppDispatch } from '../../redux/hooks';
import { openModal, switchRender } from '../../redux/modalSlice';
import { changeUpdateTarget } from '../../redux/propertySlice';

interface Props {
  key: React.Key;
  property: Property;
  handleRemove: (propertyId: number) => void;
}

const PropertyCard: React.FC<Props> = ({ property, handleRemove }: Props) => {
  const dispatch = useAppDispatch();

  const handleEdit = (): void => {
    dispatch(changeUpdateTarget(property.property_id));
    dispatch(switchRender('updateProperty'));
    dispatch(openModal());
  };

  return (
    <div className="property-card-container">
      <div className="property-card-highlight">
        <h1>{property.name}</h1>
        <p>{`Longitude: ${property.longitude}`}</p>
        <p>{`Latitude: ${property.latitude}`}</p>
      </div>
      <div className="property-card-info">
        <p>{property.street}, {property.municipality}.</p>
        <p>{property.postalCode}, {property.city} - {property.country}.</p>
        <p>{property.description}</p>
        <div className="property-card-btn-container">
          <button className="property-card-btn" onClick={handleEdit}>EDIT</button>
          <button
            className="property-card-btn"
            onClick={() => handleRemove(property.property_id)}
          >REMOVE</button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard;
