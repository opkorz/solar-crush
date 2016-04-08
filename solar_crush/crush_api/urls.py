from django.conf.urls import url, include
from django.contrib import admin

from crush_api import views

urlpatterns = [
    url(r'^$', views.CrushAPI.as_view(), name='crush')    
]