import './PropertyCard.css';
import React from 'react';

import { Property } from '../../interfaces/Property';

interface Props {
  key: React.Key;
  property: Property;
  handleRemove: (propertyId: number) => void;
}

const PropertyCard: React.FC<Props> = ({ property, handleRemove }: Props) => {
  const handleEdit = () => {};

  return (
    <div className="property-card-container">
      <div className="property-card-highlight">
        <h1>{property.name}</h1>
        <p>Latitude: -10190810924</p>
        <p>Longitude: 8901820941</p>
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
