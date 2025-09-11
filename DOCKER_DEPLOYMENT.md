# Docker Deployment for HydroNet Gamified

This README provides instructions for deploying the HydroNet Gamified application and its associated Flood Forecasting App using Docker.

## Prerequisites

- Docker and Docker Compose installed on your virtual machine
- Git installed
- Access to both repositories (HydroNet Gamified and Flood Forecasting App)

## Setup Instructions

### 1. Clone this Repository

```bash
git clone https://github.com/yourusername/hydronet_gamified.git
cd hydronet_gamified
```

### 2. Set Up the Flood Forecasting App

Run the setup script to clone the Flood Forecasting App repository:

```bash
chmod +x setup-forecast-app.sh
./setup-forecast-app.sh
```

**Important**: You need to modify `setup-forecast-app.sh` to use the correct repository URL for your Flood Forecasting App. The script will use the existing Dockerfile from the flood forecasting app repository.

### 3. Configure Environment Variables

Update the `.env.local` file with the appropriate settings:

```bash
nano .env.local
```

If you're running on a different machine or deploying to production, change `NEXT_PUBLIC_FORECAST_APP_URL` to the appropriate URL or IP address.

### 4. Build and Run with Docker Compose

```bash
docker-compose up -d
```

This will build and start both applications in detached mode.

### 5. Accessing the Applications

- HydroNet Gamified: http://your-vm-ip:3000
- Flood Forecasting App: http://your-vm-ip:8081

## Troubleshooting

### Viewing Logs

```bash
# View logs for both applications
docker-compose logs

# View logs for a specific application
docker-compose logs hydronet-app
docker-compose logs flood-forecast-app
```

### Restarting Services

```bash
docker-compose restart
```

### Rebuilding After Changes

```bash
docker-compose build --no-cache
docker-compose up -d
```

## Production Considerations

For production deployment:

1. Add SSL/TLS with a reverse proxy (Nginx or Traefik)
2. Set up proper domain names
3. Configure regular backups
4. Implement monitoring and logging