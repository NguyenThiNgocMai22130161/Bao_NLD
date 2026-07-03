package vn.edu.hcmuaf.fit.ThreePanthers.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.ErrorResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setErrorCode("VALIDATION_ERROR");
        error.setMessage("Dữ liệu đầu vào không hợp lệ");
        error.setTimestamp(LocalDateTime.now());
        error.setDetails(errors);
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setErrorCode("RESOURCE_NOT_FOUND");
        error.setMessage(ex.getMessage());
        error.setTimestamp(LocalDateTime.now());
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.UNAUTHORIZED.value());
        error.setErrorCode("AUTH_FAILED");
        error.setMessage("Tên đăng nhập hoặc mật khẩu không chính xác");
        error.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({DisabledException.class, LockedException.class})
    public ResponseEntity<ErrorResponse> handleAccountStatusException(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.FORBIDDEN.value());
        error.setErrorCode("ACCOUNT_LOCKED");
        error.setMessage("Tài khoản đã bị khóa hoặc chưa được kích hoạt");
        error.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({IllegalArgumentException.class, RuntimeException.class})
    public ResponseEntity<ErrorResponse> handleLogicException(RuntimeException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setErrorCode("BAD_REQUEST");
        error.setMessage(ex.getMessage());
        error.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ex.printStackTrace(); 
        
        ErrorResponse error = new ErrorResponse();
        error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.setErrorCode("INTERNAL_ERROR");
        error.setMessage("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.");
        error.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}