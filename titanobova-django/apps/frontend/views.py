"""
Frontend views - serve React-built SPA
"""
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os

class IndexView(View):
    """Serve the React-built index.html for SPA"""
    
    def get(self, request):
        """Serve React app index.html"""
        index_path = os.path.join(settings.BASE_DIR, 'staticfiles', 'frontend', 'index.html')
        
        if os.path.exists(index_path):
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return HttpResponse(content, content_type='text/html')
        
        # Fallback to template
        return render(request, 'index.html')

class PageView(View):
    """Catch-all for React Router - serve index.html"""
    
    def get(self, request, page_name):
        """Serve index.html for SPA routing"""
        index_path = os.path.join(settings.BASE_DIR, 'staticfiles', 'frontend', 'index.html')
        
        if os.path.exists(index_path):
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return HttpResponse(content, content_type='text/html')
        
        return render(request, 'index.html')
