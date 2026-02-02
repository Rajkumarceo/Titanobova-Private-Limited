"""
Courses URLs
"""

from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import CourseViewSet, EnrollmentViewSet

router = SimpleRouter(trailing_slash=True)
router.register(r'', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('', include(router.urls)),
]
