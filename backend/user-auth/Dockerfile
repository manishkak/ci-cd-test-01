FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy frontend source
COPY frontend/user-auth .

# Install dependencies and build
RUN npm install && npm run build

# Final stage - PHP + Apache
FROM php:8.2-apache

# Enable mod_rewrite for URL rewriting
RUN a2enmod rewrite

# Install SQLite extension
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo_sqlite

# Set working directory
WORKDIR /var/www/html

# Copy PHP backend code
COPY . .

# Copy React build from frontend-builder stage
COPY --from=frontend-builder /app/dist ./frontend

# Create .htaccess for SPA routing
RUN echo '<IfModule mod_rewrite.c>\n\
  RewriteEngine On\n\
  # Serve frontend files directly\n\
  RewriteCond %{REQUEST_FILENAME} -f [OR]\n\
  RewriteCond %{REQUEST_FILENAME} -d\n\
  RewriteRule ^ - [L]\n\
  # Route all other requests to index.html for SPA (except API)\n\
  RewriteCond %{REQUEST_URI} !^/api\n\
  RewriteCond %{REQUEST_URI} !^/index.php\n\
  RewriteRule ^(.*)$ /frontend/index.html [L]\n\
</IfModule>' > /var/www/html/.htaccess

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

CMD ["apache2-foreground"]
