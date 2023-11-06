from django.db import models

# Create your models here.
class Usuario(models.Model):
    rut = models.CharField(max_length=13)
    nombre  = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField(max_length=35, default='ejemplo.es@gmail.com')
    telefono = models.CharField(max_length=15)
    jornada = models.CharField(max_length=10, choices=[('duirno', 'Duirno'), ('vespertino', 'Vespertino')], default='duirno')
    estado_activo = models.BooleanField(default=True)
    contraseña = models.CharField(max_length=20, default='none')
    def __str__(self):
        return self.nombre