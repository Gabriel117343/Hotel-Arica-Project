from django.db import models
from django.contrib.auth.models import AbstractUser
# cargando la ruta estatica 

class Usuario(AbstractUser):
    ROLES = [
        ('recepcionista', 'Recepcionista'),
        ('personalAseo', 'PersonalAseo'),
        ('administrador', 'Administrador'),
    ]
    rut = models.CharField(max_length=13)
    username = models.CharField(max_length=50, blank=True, null=True)
    nombre  = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email  = models.EmailField(max_length=50, unique=True, blank=False, null=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    telefono = models.CharField(max_length=15)
    jornada = models.CharField(max_length=10, choices=[('duirno', 'Duirno'), ('vespertino', 'Vespertino')], default='duirno')
    rol = models.CharField(max_length=15, choices=ROLES, default='recepcionista')
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
   
    def __str__(self):
        return self.nombre
    
class Recepcionista(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.usuario.nombre
class PersonalAseo(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.usuario.nombre
    
class Administrador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.usuario.nombre
class Habitacion(models.Model):
    ROOM_TYPES = [
        ('Individual', 'Individual'),
        ('Doble', 'Doble'),
        ('Suite', 'Suite'),
        ('Deluxe', 'Deluxe'),
    ]
    numero = models.IntegerField()
    piso = models.IntegerField()
    tipo = models.CharField(max_length=50)
    precio = models.IntegerField()
    def __str__(self):
        return self.tipo
    
class Reserva(models.Model):
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    # otros campos aquí

    def __str__(self):
        return f'Reserva para {self.cliente} en {self.habitacion}'


    


