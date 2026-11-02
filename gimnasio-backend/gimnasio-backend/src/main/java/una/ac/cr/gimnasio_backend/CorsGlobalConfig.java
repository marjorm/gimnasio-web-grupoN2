package una.ac.cr.gimnasio_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsGlobalConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. Permitir que viajen las cookies de sesion (JSESSIONID)
        config.setAllowCredentials(true);

        // 2. El origen exacto del frontend (sin comodines "*")
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));

        // 3. Permitir todas las cabeceras y métodos
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }
}
