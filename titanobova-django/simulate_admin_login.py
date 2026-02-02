#!/usr/bin/env python
import os
import django
from django.test import Client

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

c = Client()
resp = c.get('/admin/login/')
print('GET /admin/login/ status', resp.status_code)
post = c.post('/admin/login/?next=/admin/', {'username':'Rajkumar','password':'Admin@1234'})
print('POST /admin/login/ status', post.status_code)
print('POST content length', len(post.content))
if post.status_code == 302:
    print('Login redirected to', post['Location'])
else:
    # find error message in content
    s = post.content.decode('utf-8')
    if 'Please enter the correct username and password' in s:
        print('Admin login failed: incorrect credentials shown in page')
    else:
        print('Admin login response body snippet:', s[:200])
