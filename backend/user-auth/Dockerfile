FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy frontend source (relative to repo root)
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

# Copy PHP backend code (relative to repo root)
COPY backend/user-auth/ .

# Copy React build from frontend-builder stage to /var/www/html (root)
COPY --from=frontend-builder /app/dist .

# Create .htaccess for SPA routing
RUN echo '<IfModule mod_rewrite.c>\n\
  RewriteEngine On\n\
  # Don'\''t rewrite actual files and directories\n\
  RewriteCond %{REQUEST_FILENAME} -f [OR]\n\
  RewriteCond %{REQUEST_FILENAME} -d\n\
  RewriteRule ^ - [L]\n\
  # Don'\''t rewrite api.php\n\
  RewriteCond %{REQUEST_URI} ^/api.php\n\
  RewriteRule ^ - [L]\n\
  # Everything else goes to index.html (SPA)\n\
  RewriteRule ^(.*)$ /index.html [L]\n\
</IfModule>' > /var/www/html/.htaccess

# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html && chmod 644 /var/www/html/.htaccess

# Expose port 80
EXPOSE 80

CMD ["apache2-foreground"]
