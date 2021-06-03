import './PropertyGrid.css';
import React, { useState, useEffect } from 'react';
import { Property } from '../../interfaces/Property';
import { useAppSelector } from '../../redux/hooks';
import { getUserProperties } from '../../services/ServerService';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

const PropertyGrid: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const userId = useAppSelector(state => state.users.userId);

  useEffect(() => {
    (async () => {
      setProperties(await getUserProperties(userId));
    })();
  }, [userId]);

  return (
    <div className="properties-container">
      {properties.length > 0
        ? properties.map((property) => <PropertyCard key={property.property_id} property={property}/>)
        : <h1>You haven't registered a property yet!</h1>
      }
    </div>
  )
}

export default PropertyGrid;
