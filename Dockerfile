FROM node:20.5.0-alpine

# Install Prisma CLI globally for migrations
RUN npm install -g prisma

WORKDIR /app

# Copy the entire application including built .next folder
COPY . .

# Set production environment
ENV NODE_ENV=production

# Regenerate Prisma client for Alpine Linux
RUN npx prisma generate

# Create startup script to handle database setup
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Starting Infrascape Website..."' >> /app/start.sh && \
    echo 'echo "Environment: $NODE_ENV"' >> /app/start.sh && \
    echo 'echo "Database URL configured: ${DATABASE_URL:+Yes}"' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Regenerate Prisma client to ensure correct binary' >> /app/start.sh && \
    echo 'npx prisma generate' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Run database migrations if DATABASE_URL is set' >> /app/start.sh && \
    echo 'if [ ! -z "$DATABASE_URL" ]; then' >> /app/start.sh && \
    echo '  echo "Running database migrations..."' >> /app/start.sh && \
    echo '  npx prisma migrate deploy || echo "Migration failed or already up to date"' >> /app/start.sh && \
    echo 'else' >> /app/start.sh && \
    echo '  echo "WARNING: DATABASE_URL not set - database features will not work"' >> /app/start.sh && \
    echo 'fi' >> /app/start.sh && \
    echo '' >> /app/start.sh && \
    echo '# Start the application' >> /app/start.sh && \
    echo 'exec npm run start' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 3000

# Use the startup script
CMD ["/app/start.sh"]