package com.ssafy.Algowithme.user.type;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

  USER("ROLE_USER");

  private String authority;

  private Role(String authority) {
    this.authority = authority;
  }

  @Override
  public String getAuthority() {
    return this.authority;
  }
}
