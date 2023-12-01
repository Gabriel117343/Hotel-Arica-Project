# Generated by Django 4.2.4 on 2023-11-26 02:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='rol',
            field=models.CharField(choices=[('recepcionista', 'Recepcionista'), ('personalAseo', 'PersonalAseo'), ('administrador', 'Administrador')], default='recepcionista', max_length=15),
        ),
    ]