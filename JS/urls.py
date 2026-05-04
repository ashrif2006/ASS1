from django.contrib import admin
from django.urls import path
from django.shortcuts import render
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.edit_job_view), 
    path('edit-job/', views.edit_job_view), 
    path('update-job-api/<int:job_id>/', views.update_job_api, name='update_job_api'),
    path('delete-job-api/<int:job_id>/', views.delete_job_api, name='delete_job_api'),
]
