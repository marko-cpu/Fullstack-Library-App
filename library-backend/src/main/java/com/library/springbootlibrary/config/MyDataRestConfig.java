package com.library.springbootlibrary.config;

import com.library.springbootlibrary.entity.Message;
import com.library.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import com.library.springbootlibrary.entity.Book;
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {


    private String theAllowedOrigins = "https://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.DELETE,
                HttpMethod.PATCH,
                HttpMethod.PUT};

        config.exposeIdsFor(Book.class);

        config.exposeIdsFor(Review.class);

        config.exposeIdsFor(Message.class);

        disableHttpMethods(Book.class, config, theUnsupportedActions);

        disableHttpMethods(Review.class, config, theUnsupportedActions);

        disableHttpMethods(Message.class, config, theUnsupportedActions);
//        Configure CORS Mappings

        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {

        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

    }

}
