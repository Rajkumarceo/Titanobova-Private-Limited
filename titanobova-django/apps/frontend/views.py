"""
Frontend views - serve static website
"""
from django.shortcuts import render
from django.views.generic import TemplateView, View
from django.http import FileResponse
from django.conf import settings
import os

class IndexView(TemplateView):
    """Serve the main index.html"""
    template_name = 'index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class PageView(View):
    """Serve static pages from pages/ directory"""
    
    def get(self, request, page_name):
        page_file = os.path.join(settings.BASE_DIR.parent, 'titanobova-website', 'pages', f'{page_name}.html')
        
        if os.path.exists(page_file):
            with open(page_file, 'r', encoding='utf-8') as f:
                content = f.read()
            return render(request, 'base.html', {'page_content': content})
        
        # Fallback to index
        return render(request, 'index.html')
