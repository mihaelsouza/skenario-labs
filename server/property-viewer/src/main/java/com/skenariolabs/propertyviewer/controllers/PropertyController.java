package com.skenariolabs.propertyviewer.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.skenariolabs.propertyviewer.model.Property;
import com.skenariolabs.propertyviewer.repository.PropertyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/v1")
public class PropertyController {

  @Autowired
  PropertyRepository propertyRepository;

  @GetMapping("/properties/{userId}")
  public ResponseEntity<List<Property>> getAllProperties(@PathVariable("userId") long userId) {
    try {
      List<Property> properties = new ArrayList<Property>();

      propertyRepository.findByUserId(userId).forEach(properties::add);
      if (properties.isEmpty())
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

      return new ResponseEntity<>(properties, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/properties/{userId}")
  public ResponseEntity<Property> createProperty(
    @PathVariable("userId") long userId,
    @RequestBody Property property
  ) {
    try {
      Property _property = propertyRepository
        .save(new Property(
          userId,
          property.getName(),
          property.getStreet(),
          property.getPostalCode(),
          property.getCity(),
          property.getMunicipality(),
          property.getCountry(),
          property.getDescription()
        ));

      return new ResponseEntity<>(_property, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/properties/{userId}/{propertyId}")
  public ResponseEntity<Property> updateProperty(
    @PathVariable("userId") long userId,
    @PathVariable("propertyId") long propertyId,
    @RequestBody Property property
  ) {
    try {
      Optional<Property> propertyData = propertyRepository.findById(propertyId);
      if (propertyData.isPresent()) {
        Property _property = propertyData.get();
        _property.setUserId(userId);
        _property.setName(property.getName());
        _property.setStreet(property.getStreet());
        _property.setPostalCode(property.getPostalCode());
        _property.setCity(property.getCity());
        _property.setMunicipality(property.getMunicipality());
        _property.setCountry(property.getCountry());
        _property.setDescription(property.getDescription());

        return new ResponseEntity<>(
          propertyRepository.save(_property),
          HttpStatus.OK
        );
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public PropertyRepository getPropertyRepository() {
    return propertyRepository;
  }

  public void setPropertyRepository(PropertyRepository propertyRepository) {
    this.propertyRepository = propertyRepository;
  }
}
