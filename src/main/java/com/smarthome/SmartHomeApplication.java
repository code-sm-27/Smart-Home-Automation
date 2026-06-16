package com.smarthome;

import com.smarthome.model.Device;
import com.smarthome.model.User;
import com.smarthome.repository.DeviceRepository;
import com.smarthome.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SmartHomeApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartHomeApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(DeviceRepository deviceRepository, UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User("admin", encoder.encode("password"), "ROLE_ADMIN"));
            }
            if (deviceRepository.count() == 0) {
                deviceRepository.save(new Device("LR-L1", "light", "Living Room Light 1"));
                deviceRepository.save(new Device("LR-L2", "light", "Living Room Light 2"));
                deviceRepository.save(new Device("BR-L1", "light", "Bedroom Light 1"));
                deviceRepository.save(new Device("T1", "thermostat", "Thermostat 1"));
                deviceRepository.save(new Device("P1", "plug", "Smart Plug 1"));
                deviceRepository.save(new Device("C1", "camera", "Security Camera 1"));
                deviceRepository.save(new Device("S1", "speaker", "Smart Speaker 1"));
            }
        };
    }
}
