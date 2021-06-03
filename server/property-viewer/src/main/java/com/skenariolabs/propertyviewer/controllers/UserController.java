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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @Autowired
  BCryptPasswordEncoder bCryptPasswordEncoder;

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

        if (bCryptPasswordEncoder.matches(password, user.getPassword()))
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

  @PostMapping("/users/register")
  public ResponseEntity<User> registerUser(@RequestBody User user) {
    try {
      Optional<User> existingUser= userRepository.findByEmail(user.getEmail());
      if (existingUser.isPresent())
        return new ResponseEntity<>(HttpStatus.CONFLICT);
      else {
        String encryptedPassword = bCryptPasswordEncoder.encode(
          user.getPassword().toLowerCase()
        );
        User _user = userRepository
          .save(new User(
            user.getUsername(),
            user.getEmail(),
            encryptedPassword
          ));

        return new ResponseEntity<>(_user, HttpStatus.CREATED);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
