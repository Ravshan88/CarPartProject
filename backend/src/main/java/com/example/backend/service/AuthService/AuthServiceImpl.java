package com.example.backend.service.AuthService;


import com.example.backend.dto.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.enums.UserRoles;
import com.example.backend.exceptions.InvalidCredentialsException;
import com.example.backend.payload.ReqLogin;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository usersRepository;
    private final RoleRepository roleRepo;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @SneakyThrows
    @Override
    public HttpEntity<?> register(ReqLogin loginReq) {
        List<Role> roles = new ArrayList<>();
        Role role = roleRepo.findById(1).orElseThrow();
        roles.add(role);
        User user = new User(loginReq.getPhone(), passwordEncoder.encode(loginReq.getPassword()), loginReq.getName(), roles);
        User save = usersRepository.save(user);
        return ResponseEntity.ok("saqlandi");
    }


    private String getToken(ReqLogin loginReq) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginReq.getPhone());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                loginReq.getPassword(),
                userDetails.getAuthorities()
        );

        authenticationConfiguration.getAuthenticationManager().authenticate(authenticationToken);

        String token = Jwts
                .builder()
                .setIssuer(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(jwtService.getSigningKey())
                .compact();
        return token;
    }


    @Override
    public HttpEntity<Map> login(UserDTO userDTO) {
        Optional<User> users = usersRepository.findByPhone(userDTO.getPhone());
        if (users.isEmpty()) throw new InvalidCredentialsException();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getPhone(), userDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException();
        }
        User userByPhone = users.orElseThrow();
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", jwtService.generateJwtToken(userByPhone));
        if (userDTO.isRememberMe()) {
            map.put("refresh_token", jwtService.generateJwtRefreshToken(userByPhone));
        }
        map.put("roles", userByPhone.getRoles());
        return ResponseEntity.ok(map);
    }


    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtService.extractSubjectFromJwt(refreshToken);
        User users = usersRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtService.generateJwtToken(users);
        return ResponseEntity.ok(access_token);
    }

    @Override
    public User decode(String token) {
        boolean isExpired = jwtService.validateToken(token);
        User user = null;
        if (isExpired) {
            String userId = jwtService.extractSubjectFromJwt(token);
            user = usersRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + userId));
        }
        return user;
    }

    @Override
    public HttpEntity<?> registerOperator(ReqLogin loginReq) {
        List<Role> roles = new ArrayList<>();
        List<Role> roleUser = roleRepo.findAllByName(UserRoles.ROLE_OPERATOR);
        if (roleUser.isEmpty()) {
            roles.add(roleRepo.save(new Role(1, UserRoles.ROLE_OPERATOR)));
        } else {
            roles.add(roleUser.get(0));
        }
        User user = new User(loginReq.getPhone(), passwordEncoder.encode(loginReq.getPassword()), loginReq.getName(), roles);
        usersRepository.save(user);
        return ResponseEntity.ok(null);
    }

    public HttpEntity<?> getOperator() {
        Role roleUser = roleRepo.findById(3).orElseThrow();
        List<Role> roles = new LinkedList<>();
        roles.add(roleUser);
        List<User> allByRoles = usersRepository.findAllByRolesIn(roles);
        return ResponseEntity.ok(allByRoles);
    }

    @Override
    public HttpEntity<?> getAdmin() {
        Role roleUser = roleRepo.findById(1).orElseThrow();
        List<Role> roles = new LinkedList<>();
        roles.add(roleUser);
        List<User> allByRoles = usersRepository.findAllByRolesIn(roles);
        return ResponseEntity.ok(allByRoles);
    }

    @Override
    public HttpEntity<?> deleteUser(UUID id) {
        User findUser = usersRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
        usersRepository.deleteById(id);
        return ResponseEntity.ok("Muvaffaqiyatli o'chirildi");
    }

    @Override
    public HttpEntity<?> updateUser(ReqLogin dto, UUID id) {
        User findUser = usersRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
       if(!(dto.getPassword().equals(""))){
           findUser.setPassword(passwordEncoder.encode(dto.getPassword()));
       }
        findUser.setPhone(dto.getPhone());
        findUser.setName(dto.getName());
        User saved = usersRepository.save(findUser);
        return ResponseEntity.ok(saved);
    }
}