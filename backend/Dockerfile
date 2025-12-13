# 1. Use official PHP + Apache image
FROM php:8.1-apache

# 2. Install required PHP extensions
RUN apt-get update && \
    apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd

# 3. Enable Apache mod_rewrite
RUN a2enmod rewrite

# 4. Set working directory in the container
WORKDIR /var/www/html

# 5. Copy backend files
COPY . /var/www/html/

# 6. Set correct permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# 7. Expose port 80
EXPOSE 80

# 8. Start Apache
CMD ["apache2-foreground"]
