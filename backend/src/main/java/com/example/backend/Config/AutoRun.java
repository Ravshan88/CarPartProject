package com.example.backend.Config;


import com.example.backend.entity.Role;
import com.example.backend.entity.Status;
import com.example.backend.entity.User;
import com.example.backend.enums.OrderStatus;
import com.example.backend.enums.UserRoles;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.StatusRepository;
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
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final StatusRepository statusRepository;

    @Override
    public void run(String... args) throws Exception {
        String adminPhone = "+998999999999";
        List<Role> savedRoles = saveRoles();
        List<Status> statuses=saveStatus();
        Optional<User> userByPhone = userRepository.findByPhone(adminPhone);
        saveUser(adminPhone, userByPhone);

    }




    private void saveUser(String adminPhone, Optional<User> userByPhone) {
        if (userByPhone.isEmpty()) {
            User user = User.builder()
                    .phone(adminPhone)
                    .password(passwordEncoder.encode("00000000"))
                    .name("Super Admin")
                    .roles(List.of(roleRepository.findByName(UserRoles.ROLE_SUPER_ADMIN)))
                    .build();
            userRepository.save(user);
        }
    }
    private List<Status> saveStatus() {
        return statusRepository.saveAll(new ArrayList<>(List.of(
                new Status(1, OrderStatus.NEW),
                new Status(2, OrderStatus.INPROGRESS),
                new Status(3, OrderStatus.COMPLETED),
                new Status(4, OrderStatus.DECLINED)
        )));
    }
    private List<Role> saveRoles() {
        return roleRepository.saveAll(new ArrayList<>(List.of(
                new Role(1, UserRoles.ROLE_ADMIN),
                new Role(2, UserRoles.ROLE_USER),
                new Role(3, UserRoles.ROLE_OPERATOR),
                new Role(4, UserRoles.ROLE_SUPER_ADMIN))));
    }

}
