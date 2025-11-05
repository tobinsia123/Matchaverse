# MatchaMap 🍵

A full-stack web application for UCI students to discover and explore matcha spots in and around Irvine, CA.


## Features

- 🔍 **Search & Filter**: Search matcha spots by name, location, or description
- ⭐ **Ratings & Reviews**: View ratings and review counts for each spot
- 🏆 **Featured Spots**: Highlight your favorite matcha locations
- 💰 **Price Range**: Filter by price range ($ to $$$$)
- 📍 **Location Details**: Complete address information for each spot
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🎨 **Modern UI**: Clean, matcha-themed design with smooth animations

## Tech Stack

### Backend
- **Django 5.2.7**: Python web framework
- **Django REST Framework**: RESTful API
- **django-cors-headers**: CORS support for React frontend
- **django-filter**: Advanced filtering capabilities
- **Pillow**: Image handling

### Frontend
- **React 19**: Modern React with hooks
- **Axios**: HTTP client for API calls
- **CSS3**: Custom styling with modern design patterns

## Project Structure

```
MatchaMap/
├── backend/              # Django project settings
│   ├── settings.py       # Django configuration
│   ├── urls.py          # Main URL configuration
│   └── ...
├── matcha_spots/        # Django app
│   ├── models.py        # MatchaSpot model
│   ├── views.py         # API viewsets
│   ├── serializers.py   # DRF serializers
│   ├── urls.py          # API endpoints
│   └── admin.py         # Django admin configuration
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   ├── App.js       # Main app component
│   │   └── App.css      # App styles
│   └── package.json
├── requirements.txt     # Python dependencies
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.8+ (recommended: Python 3.13)
- Node.js 14+ and npm
- pip (Python package manager)

### Backend Setup

1. **Create and activate virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Create a superuser** (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

5. **Load sample data** (optional):
   ```bash
   python manage.py load_sample_data
   ```
   This will create 6 sample matcha spots in Irvine for testing.

6. **Run the Django development server**:
   ```bash
   python manage.py runserver
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:8000/api/spots/`

- `GET /api/spots/` - List all matcha spots
- `GET /api/spots/{id}/` - Get a specific matcha spot
- `POST /api/spots/` - Create a new matcha spot
- `PUT /api/spots/{id}/` - Update a matcha spot
- `DELETE /api/spots/{id}/` - Delete a matcha spot
- `GET /api/spots/featured/` - Get featured matcha spots
- `GET /api/spots/top_rated/` - Get top-rated matcha spots (rating >= 4.0)

### Query Parameters

- `city`: Filter by city
- `price_range`: Filter by price range ($, $$, $$$, $$$$)
- `is_featured`: Filter featured spots (true/false)
- `search`: Search in name, address, and description
- `ordering`: Order by field (e.g., `-rating`, `name`)

## Adding Matcha Spots

### Via Django Admin

1. Access the admin panel at `http://localhost:8000/admin`
2. Log in with your superuser credentials
3. Navigate to "Matcha Spots"
4. Click "Add Matcha Spot" and fill in the details

### Via API

You can use tools like Postman or curl to add spots:

```bash
curl -X POST http://localhost:8000/api/spots/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Matcha Cafe",
    "address": "123 Main St",
    "city": "Irvine",
    "state": "CA",
    "zip_code": "92620",
    "rating": 4.5,
    "review_count": 150,
    "description": "A cozy matcha cafe with excellent service",
    "phone": "(949) 123-4567",
    "website": "https://example.com",
    "hours": "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-10PM",
    "price_range": "$$"
  }'
```

## Development

### Running Both Servers

You'll need two terminal windows:

**Terminal 1 - Django Backend**:
```bash
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - React Frontend**:
```bash
cd frontend
npm start
```

### Database Migrations

When you modify models, create and apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

## Production Deployment

### Backend

1. Set `DEBUG = False` in `backend/settings.py`
2. Update `ALLOWED_HOSTS` with your domain
3. Configure a production database (PostgreSQL recommended)
4. Set up static file serving
5. Use a production WSGI server (gunicorn, uWSGI)

### Frontend

1. Build the React app:
   ```bash
   cd frontend
   npm run build
   ```
2. Serve the `build/` directory with a web server (nginx, Apache)
3. Update API base URL in `frontend/src/services/api.js` for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

See LICENSE file for details.

## Acknowledgments

Built for UCI students to discover the best matcha spots in Irvine! 🍵
