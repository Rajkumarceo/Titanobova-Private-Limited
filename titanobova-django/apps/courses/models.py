"""
Courses App - Course management
"""

from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

User = get_user_model()

class Course(models.Model):
    """
    Course model
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses_instructed')
    
    # Course Details
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    duration_hours = models.IntegerField()
    level = models.CharField(
        max_length=20,
        choices=[
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced'),
        ]
    )
    
    # Metadata
    category = models.CharField(max_length=100)
    tags = models.JSONField(default=list, blank=True)
    thumbnail = models.ImageField(upload_to='courses/thumbnails/')
    
    # Status
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    
    # Tracking
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_published', 'is_featured']),
        ]
    
    def __str__(self):
        return self.title


class Lesson(models.Model):
    """
    Lesson within a course
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    content = models.TextField()
    order = models.IntegerField()
    
    video_url = models.URLField(blank=True)
    attachments = models.JSONField(default=list, blank=True)
    
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['course', 'order']
        unique_together = ('course', 'order')
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Enrollment(models.Model):
    """
    Student enrollment in courses
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    
    progress = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    completed_lessons = models.JSONField(default=list, blank=True)
    
    enrollment_date = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ('user', 'course')
        ordering = ['-enrollment_date']
        indexes = [
            models.Index(fields=['user', 'course']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.course.title}"
