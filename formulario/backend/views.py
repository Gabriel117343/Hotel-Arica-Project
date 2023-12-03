from cmath import e
from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializer import UsuarioSerializer
from .models import Usuario
# Create your views here.
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from .serializer import UsuarioSerializer
#importamos el status para darle un estado a la respuesta
from rest_framework import status
from rest_framework.response import Response
import json

class UsuarioCreateView(APIView): # este método es para crear un usuario con contraseña encriptada si es que se envía en la petición post desde la api en React


    def post(self, request, format=None):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) # si se crea el usuario, se retorna un estado 201 (creado) y los datos del usuario creado
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@ensure_csrf_cookie # este método es para obtener el token csrf desde la api en React
def get_csrf_token(request):
    return JsonResponse({'csrftoken': get_token(request)})
@csrf_exempt
def login(request): # este método es para logearse desde la api en React
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        csrf_token = request.META.get('HTTP_X_CSRFTOKEN')  # Añade esta línea
        # verificamos que el token csrf sea válido
        if csrf_token != get_token(request):
            return JsonResponse({'message': 'Token CSRF inválido'}, status=400)
        user = authenticate(request, email=email, password=password)
    
        if user is not None:
            auth_login(request, user)
            return JsonResponse({'message': 'Se ha logeado Exitosamente', 'usuario':{'nombre':user.nombre, 'rol': user.rol}}, status=200)
        else:
            return JsonResponse({'error': 'Credenciales Invaidas'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        auth_logout(request)
        return JsonResponse({'message': 'Se ha deslogueado Exitosamente'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

class UsuarioView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar usuarios desde la api en React
    serializer_class = UsuarioSerializer #Esto indica que UsuarioSerializer se utilizará para serializar y deserializar instancias del modelo Usuario.
    queryset = Usuario.objects.all() # Esto indica que todas las instancias del modelo Usuario son el conjunto de datos sobre el que operará esta vista.
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'Usuarios obtenidos!'}, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
    
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Usuario eliminado!'}, status=status.HTTP_200_OK)

    # Django Rest Framework proporciona los siguientes métodos para operaciones CRUD en ModelViewSet:

    # .list(): Para listar todos los objetos (GET)
    # .retrieve(): Para obtener un objeto específico (GET con id)
    # .create(): Para crear un nuevo objeto (POST)
    # .update(): Para actualizar un objeto existente (PUT)
    # .partial_update(): Para actualizar parcialmente un objeto existente (PATCH)
    # .destroy(): Para eliminar un objeto existente (DELETE)
    # Por lo tanto, puedes realizar operaciones CRUD en el modelo Usuario a través de esta vista.

