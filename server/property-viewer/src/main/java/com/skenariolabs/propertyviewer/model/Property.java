package com.skenariolabs.propertyviewer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "properties")
public class Property {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long propertyId;

  @Column(name = "user_id")
  private long userId;

  @Column(name = "name")
  private String name;

  @Column(name = "street")
  private String street;

  @Column(name = "postalCode")
  private String postalCode;

  @Column(name = "city")
  private String city;

  @Column(name = "municipality")
  private String municipality;

  @Column(name = "country")
  private String country;

  @Column(name = "description")
  private String description;

  @Column(name = "longitude")
  private float longitude;

  @Column(name = "latitude")
  private float latitude;

  public Property() {}

  public Property(
    long userId,
    String name,
    String street,
    String postalCode,
    String city,
    String municipality,
    String country,
    String description,
    float longitude,
    float latitude
  ) {
    this.userId = userId;
    this.name = name;
    this.street = street;
    this.postalCode = postalCode;
    this.city = city;
    this.municipality = municipality;
    this.country = country;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  public long getProperty_id() {
    return propertyId;
  }

  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public String getPostalCode() {
    return postalCode;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getMunicipality() {
    return municipality;
  }

  public void setMunicipality(String municipality) {
    this.municipality = municipality;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public float getLongitude() {
    return longitude;
  }

  public void setLongitude(float longitude) {
    this.longitude = longitude;
  }

  public float getLatitude() {
    return latitude;
  }

  public void setLatitude(float latitude) {
    this.latitude = latitude;
  }

}
