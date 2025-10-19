# Admin Panel Documentation

## Overview
The admin panel provides a comprehensive interface for managing users and service requests in the AstroPeak application.

## Features

### 1. Statistics Dashboard
- View total number of users
- View total number of service requests
- See count of queued requests
- See count of fulfilled requests

### 2. User Management
- View all registered users
- See user details including name, phone, gender, age, and zodiac sign
- User data is read-only in the current implementation

### 3. Service Request Management
- View all service requests
- Update request status (queued, fulfilled, cancelled)
- Delete requests
- See request details including creation date

### 4. Quick Actions
- Refresh all data
- Export functionality (placeholder for future implementation)

## Access

The admin panel is accessible at `/admin` route. It requires login with username and password.

### Authentication
- **Default Username**: `admin`
- **Default Password**: `admin123`
- Username is configured via `ADMIN_USERNAME` environment variable
- Password is configured via `ADMIN_PASSWORD` environment variable
- Session-based authentication (no need to enter credentials repeatedly)

### Login Process
1. Navigate to `/admin`
2. You'll see a login form
3. Enter your admin credentials
4. Click "Sign In"
5. You'll be redirected to the admin dashboard
6. Your session will persist until you logout

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login with username/password
- `POST /api/admin/logout` - Logout and destroy session
- `GET /api/admin/status` - Check if user is authenticated

### Statistics
- `GET /api/admin/stats` - Get dashboard statistics (requires auth)

### Users
- `GET /api/admin/users` - Get all users (requires auth)

### Service Requests
- `GET /api/admin/requests` - Get all service requests (requires auth)
- `PATCH /api/admin/requests/:id/status` - Update request status (requires auth)
- `DELETE /api/admin/requests/:id` - Delete a request (requires auth)

## Database Schema

### Service Requests Table
The `service_requests` table includes:
- `id` - Primary key
- `uid` - User ID reference
- `name` - Customer name
- `phone` - Customer phone
- `serviceType` - Type of service requested
- `message` - Additional message from customer
- `status` - Request status (queued, fulfilled, cancelled)
- `createdAt` - Request creation timestamp
- `updatedAt` - Last update timestamp

### Users Table
The `users` table includes:
- `id` - Primary key
- `uid` - Unique user identifier
- `phone` - User phone number
- `name` - User name
- `gender` - User gender
- `age` - User age
- `dob` - Date of birth
- `zodiacSign` - Zodiac sign

## Usage

1. Navigate to `/admin` in your browser
2. **Login**: Enter your admin credentials (default: admin/admin123)
3. Click "Sign In" to access the admin dashboard
4. The admin panel will automatically load data from the API
5. Use the tabs to navigate between different sections
6. Update request statuses using the dropdown selectors
7. Delete requests using the delete button (with confirmation dialog)
8. Refresh data using the refresh button
9. **Logout**: Click the logout button when done

## Security Notes

- **Change default credentials**: Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables in production
- Session-based authentication provides better security than token-based auth
- Sessions are automatically destroyed on logout
- All admin operations are logged for audit purposes
- Consider implementing role-based access control for multiple admin users
