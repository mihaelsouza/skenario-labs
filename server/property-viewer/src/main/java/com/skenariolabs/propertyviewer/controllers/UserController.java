package com.skenariolabs.propertyviewer.controllers;

import java.util.Map;
import java.util.Optional;

import com.skenariolabs.propertyviewer.model.User;
import com.skenariolabs.propertyviewer.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @PostMapping("/users")
  public ResponseEntity<User> authenticate(
    @RequestBody Map<String, String> loginData
  ) {
    try {
      String email = loginData.get("email");
      String password = loginData.get("password").toLowerCase();
      Optional<User> _user = userRepository.findByEmail(email);

      if (_user.isPresent()) {
        User user = _user.get();

        if (password.equals(user.getPassword()))
          return new ResponseEntity<>(user, HttpStatus.OK);
        else
          return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
