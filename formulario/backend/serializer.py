from rest_framework import serializers
from .models import Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        #fields = ('id', 'rut', 'nombre', 'apellido', 'edad')
        #all selecciona todos los campos de Usuario
        fields = '__all__'

