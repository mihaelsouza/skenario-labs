import './PropertyGrid.css';
import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { openModal, switchRender } from '../../redux/modalSlice';

import { Property } from '../../interfaces/Property';
import { getUserProperties, deleteProperty } from '../../services/ServerService';

import PropertyCard from '../../components/PropertyCard/PropertyCard';

const PropertyGrid: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const userId = useAppSelector(state => state.users.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setProperties(await getUserProperties(userId));
    })();
  }, [userId]);

  const handleAddNew = () => {
    dispatch(switchRender('addProperty'));
    dispatch(openModal());
  }

  const handleRemove = async (propertyId: number): Promise<void> => {
    try {
      await deleteProperty(userId, propertyId);
      const updatedProperties = properties
        .filter((property) => property.property_id !== propertyId);
      setProperties([...updatedProperties]);
    } catch (e) {
      alert("Failed to delete the property due to an internal server error. Try again later!")
    }
  };

  return (
    <div className="properties-container">
      {properties.length > 0
        ? properties.map((property) => {
          return <PropertyCard
            key={property.property_id}
            property={property}
            handleRemove={handleRemove}
          />
        })
        : <h1>You haven't registered a property yet!</h1>
      }
      <button className="add-new-property-btn" onClick={handleAddNew}>+</button>
    </div>
  )
}

export default PropertyGrid;
