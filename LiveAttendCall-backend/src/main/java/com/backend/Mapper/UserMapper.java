package com.backend.Mapper;

import com.backend.Dto.RegisterRequest;
import com.backend.Dto.RegisterResponse;
import com.backend.database.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    RegisterRequest userToUserDto(User user); // Map from User to UserDto

    User userDtoToUser(RegisterRequest registerRequest); // Map from UserDto to User


    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "userRole", target = "userType")
    RegisterResponse userToResponse(User user);
}
