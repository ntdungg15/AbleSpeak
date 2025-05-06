package com.uet.longhoang.engapp.configs;

import com.uet.longhoang.engapp.services.impls.JwtService;
import com.uet.longhoang.engapp.services.impls.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtService jwtService;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.debug("Filter path {}", request.getRequestURI());
        if (request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            log.debug("This request does not have or need Authorization");
            filterChain.doFilter(request, response);
            return;
        }
        log.debug("Token {}", request.getHeader("Authorization"));
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtService.extractUsername(token);
        if (username != null) {
           UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
           if (jwtService.isTokenValid(token, userDetails)) {
               UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
               SecurityContextHolder.getContext().setAuthentication(authentication);
           }
        }
        filterChain.doFilter(request, response);
    }
}
