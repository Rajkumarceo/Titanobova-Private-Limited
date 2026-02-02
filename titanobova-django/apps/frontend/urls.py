from django.urls import path
from .views import IndexView, PageView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('pages/<str:page_name>/', PageView.as_view(), name='page'),
]
