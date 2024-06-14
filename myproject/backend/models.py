from django.db import models
from django.contrib.auth.models import User

class App(models.Model):
    name = models.CharField(max_length=100)
    package_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    sub_category = models.CharField(max_length=100)
    points = models.IntegerField()

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    app = models.ForeignKey(App, on_delete=models.CASCADE)
    screenshot = models.ImageField(upload_to='screenshots/')
    completed = models.BooleanField(default=False)
