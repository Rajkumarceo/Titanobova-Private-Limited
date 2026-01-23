from django.contrib import admin
from .models import Course, Lesson, Enrollment

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'instructor', 'price', 'is_published', 'created_at']
    list_filter = ['is_published', 'level', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'order', 'is_published']
    list_filter = ['course', 'is_published']

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'progress', 'enrollment_date']
    list_filter = ['enrollment_date']
    search_fields = ['user__email', 'course__title']
