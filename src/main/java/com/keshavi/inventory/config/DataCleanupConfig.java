//package com.keshavi.inventory.config;
//
//import com.keshavi.inventory.repository.CategoryRepository;
//import com.keshavi.inventory.repository.ProductRepository;
//import com.keshavi.inventory.repository.TransactionRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DataCleanupConfig {
//
//    @Bean
//    public CommandLineRunner clearAllData(
//            TransactionRepository transactionRepository,
//            ProductRepository productRepository,
//            CategoryRepository categoryRepository) {
//        return args -> {
//            transactionRepository.deleteAll();
//            productRepository.deleteAll();
//            categoryRepository.deleteAll();
//            System.out.println("All data cleared!");
//        };
//    }
//}
