package com.skenariolabs.propertyviewer.repository;

import java.util.List;

import com.skenariolabs.propertyviewer.model.Property;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {

  List<Property> findByUserId(long userId);

}
