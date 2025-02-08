package com.backend.Repository;

import com.backend.database.ClassEntity;
import com.backend.database.Role;
import com.backend.database.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findByUserRole(Role userType); // Fetch only students

    @Query("SELECT u FROM User u WHERE u.userRole = :role AND u.cls = :cls")
    List<User> findByUserRoleAndClass(@Param("role") Role role, @Param("cls") ClassEntity cls);

}
