package com.skenariolabs.propertyviewer.repository;

import com.skenariolabs.propertyviewer.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  User getByEmail(String email);

}
