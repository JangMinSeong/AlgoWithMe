package com.ssafy.Algowithme.user.entity;

import com.ssafy.Algowithme.user.type.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private int gitId;

  @Column(nullable = false)
  private String gitToken;

  @Column(nullable = false)
  private String nickname;

  @Column(nullable = false)
  private String imageUrl;

  @Column(length = 10)
  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
      foreignKey = @ForeignKey(name = "FK_user_role_user",
          foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE"))
  @Enumerated(EnumType.STRING)
  @Builder.Default
  private Set<Role> role = Set.of(Role.USER);

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.role;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return String.valueOf(gitId);
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null) {
      return false;
    }
    try {
      User user = (User) o;
      return Objects.equals(this.id, user.getId());
    } catch (ClassCastException e) {
      return false;
    }
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
