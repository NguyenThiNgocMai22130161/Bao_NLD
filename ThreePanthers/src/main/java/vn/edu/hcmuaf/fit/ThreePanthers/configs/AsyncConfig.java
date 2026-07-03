package vn.edu.hcmuaf.fit.ThreePanthers.configs;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        
        // Số thread tối thiểu luôn sẵn sàng
        executor.setCorePoolSize(2);
        
        // Số thread tối đa có thể tạo
        executor.setMaxPoolSize(5);
        
        // Kích thước hàng đợi cho các task chờ xử lý
        executor.setQueueCapacity(100);
        
        // Tên prefix cho các thread
        executor.setThreadNamePrefix("Async-");
        
        // Khởi tạo executor
        executor.initialize();
        
        return executor;
    }
}
