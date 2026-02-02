@echo off
REM Setup and run Titanobova Django Backend

echo ======================================
echo Titanobova SaaS Backend Setup
echo ======================================

cd titanobova-django

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -q -r requirements.txt

REM Run migrations
echo Running database migrations...
python manage.py migrate --noinput

REM Create superuser if it doesn't exist
echo Setting up admin user...
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='admin@titanobova.com').exists():
    User.objects.create_superuser(
        email='admin@titanobova.com',
        username='admin',
        password='Admin123!@#',
        first_name='Admin',
        last_name='User'
    )
    print('✓ Admin user created: admin@titanobova.com / Admin123!@#')
else:
    print('✓ Admin user already exists')
EOF

echo.
echo ======================================
echo Starting Django Server...
echo ======================================
echo.
echo ✓ API will be available at: http://localhost:8000/api/v1/
echo ✓ Admin panel at: http://localhost:8000/admin/
echo ✓ Press Ctrl+C to stop
echo.

python manage.py runserver 0.0.0.0:8000

pause
