package com.example.backend.security;

import com.example.backend.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MyFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String token = request.getHeader("Authorization");
        String requestPath = request.getRequestURI();
        if (requestPath.startsWith("/api")) {
            if (hasPermission(requestPath)) {
                try {
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Invalid token");
                    response.getWriter().flush();
                    return;
                }
                return;
            }

            if (token != null) {
                try {
                    String subject = jwtService.extractSubjectFromJwt(token);
                    UserDetails userDetails = userRepo.findById(UUID.fromString(subject)).orElseThrow();
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } catch (ExpiredJwtException e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Token expired");
                    response.getWriter().flush();
                    return;
                } catch (Exception e) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Invalid token");
                    response.getWriter().flush();
                    return;
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Authorization header missing");
                response.getWriter().flush();
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    private boolean hasPermission(String requestPath) {
        return  requestPath.equals("/api/v1/auth/register")
                ||requestPath.startsWith("/api/v1/file/getFile")
                || requestPath.equals("/api/v1/auth/login")
                || requestPath.equals("/api/v1/advertisement")
                || requestPath.equals("/api/v1/carousel")
                || requestPath.equals("/dashboard")
                || requestPath.equals("/api/v1/auth/access")
                || requestPath.equals("/api/v1/auth/refresh")
                || requestPath.equals("/api/v1/car")
                || requestPath.equals("/api/v1/brand")
                || requestPath.equals("/api/v1/product")
                || requestPath.equals("/api/v1/order")
                || requestPath.equals("/api/v1/carPart");
    }
}
