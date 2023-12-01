from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UsuarioSerializer
from .models import Usuario
# Create your views here.
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from .serializer import UsuarioSerializer
#importamos el status para darle un estado a la respuesta
from rest_framework import status
from rest_framework.response import Response

class UsuarioCreateView(APIView): # este método es para crear un usuario con contraseña encriptada si es que se envía en la petición post desde la api en React


    def post(self, request, format=None):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) # si se crea el usuario, se retorna un estado 201 (creado) y los datos del usuario creado
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt # para que no pida el token de seguridad en la petición post desde la api en React
## eliminar

def login(request): # este método es para logearse desde la api en React
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        # print el tipo de dato
        print(type(email))
        print(email)
        print(password)
        print(type(password))
        user = authenticate(request, email=email, password=password)
        print('tipo: ', user)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({'message': 'Se ha logeado Exitosamente', # si se logea correctamente, se retorna un estado 200 (ok) y los datos del usuario logeado
                                 'nombre': user.nombre,
                                 'rol': user.rol,
                                 
                                 }, status=200)
        else:
            return JsonResponse({'error': 'Credenciales Invaidas'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
class UsuarioView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar usuarios desde la api en React
    serializer_class = UsuarioSerializer #Esto indica que UsuarioSerializer se utilizará para serializar y deserializar instancias del modelo Usuario.
    queryset = Usuario.objects.all() # Esto indica que todas las instancias del modelo Usuario son el conjunto de datos sobre el que operará esta vista.

    # Django Rest Framework proporciona los siguientes métodos para operaciones CRUD en ModelViewSet:

    # .list(): Para listar todos los objetos (GET)
    # .retrieve(): Para obtener un objeto específico (GET con id)
    # .create(): Para crear un nuevo objeto (POST)
    # .update(): Para actualizar un objeto existente (PUT)
    # .partial_update(): Para actualizar parcialmente un objeto existente (PATCH)
    # .destroy(): Para eliminar un objeto existente (DELETE)
    # Por lo tanto, puedes realizar operaciones CRUD en el modelo Usuario a través de esta vista.

