package com.example.backend.Config;


import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.enums.UserRoles;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class AutoRun implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) throws Exception {
        String adminPhone = "+998999999999";
        List<Role> savedRoles = saveRoles();
        Optional<User> userByPhone = userRepo.findByPhone(adminPhone);
        saveUser(adminPhone, userByPhone);

    }




    private void saveUser(String adminPhone, Optional<User> userByPhone) {
        if (userByPhone.isEmpty()) {
            User user = User.builder()
                    .phone(adminPhone)
                    .password(passwordEncoder.encode("00000000"))
                    .roles(List.of(roleRepo.findByName(UserRoles.ROLE_SUPER_ADMIN)))
                    .build();
            userRepo.save(user);


        }
    }

    private List<Role> saveRoles() {
        return roleRepo.saveAll(new ArrayList<>(List.of(
                new Role(1, UserRoles.ROLE_ADMIN),
                new Role(2, UserRoles.ROLE_USER),
                new Role(3, UserRoles.ROLE_SUPER_ADMIN))));
    }

}