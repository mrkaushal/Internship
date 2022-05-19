import email
from django.db import models

# Create your models here.
class Student(models.Model):
    stuname = models.CharField(max_length=20)
    email = models.EmailField(max_length=50)