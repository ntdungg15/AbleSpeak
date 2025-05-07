package com.uet.longhoang.engapp.services.impls;

import com.uet.longhoang.engapp.entities.User;
import com.uet.longhoang.engapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> findUser = userRepository.findByName(username);
        if (findUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new UserDetailsImpl(findUser.get());
    }
}
