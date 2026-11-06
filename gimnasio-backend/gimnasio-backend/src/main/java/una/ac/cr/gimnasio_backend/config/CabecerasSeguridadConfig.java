package una.ac.cr.gimnasio_backend.config;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import java.io.IOException;
@Component @Order(1)
public class CabecerasSeguridadConfig implements Filter {
 @Override public void doFilter(ServletRequest req,ServletResponse res,FilterChain chain)throws IOException,ServletException{
  HttpServletRequest r=(HttpServletRequest)req;HttpServletResponse s=(HttpServletResponse)res;
  s.setHeader("X-Content-Type-Options","nosniff");s.setHeader("X-Frame-Options","DENY");
  s.setHeader("Referrer-Policy","strict-origin-when-cross-origin");
  if(r.isSecure())s.setHeader("Strict-Transport-Security","max-age=31536000; includeSubDomains");
  if(r.getRequestURI().startsWith("/api/usuarios"))s.setHeader("Cache-Control","no-store");
  chain.doFilter(req,res);
 }
}
