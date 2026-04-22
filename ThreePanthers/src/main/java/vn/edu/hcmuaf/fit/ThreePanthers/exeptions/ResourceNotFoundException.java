package vn.edu.hcmuaf.fit.ThreePanthers.exeptions;
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}