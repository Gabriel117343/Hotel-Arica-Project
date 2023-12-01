from django.urls import path, include
from rest_framework.documentation import include_docs_urls 
from rest_framework import routers
from backend import views
router = routers.DefaultRouter() # tiene el crud de los usuarios"""
router.register(r'usuarios', views.UsuarioView, 'usuarios')

urlpatterns = [
    path('datos/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="Usuarios Api")),
    path('login/', views.login)
] 