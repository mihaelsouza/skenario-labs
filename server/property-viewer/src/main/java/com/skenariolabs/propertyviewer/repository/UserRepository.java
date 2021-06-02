package com.skenariolabs.propertyviewer.repository;

import java.util.Optional;

import com.skenariolabs.propertyviewer.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

}
