from rest_framework.response import Response
from rest_framework import viewsets
from .models import App, Task
from .serializers import AppSerializer, TaskSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status
class AppViewSet(viewsets.ModelViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    permission_classes = [IsAuthenticated] 

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated] 

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser] 

    @action(detail=False, methods=['get']  )
    def me(self, request):
        serializer = self.get_serializer(request.user)
        print(serializer.data)
        return Response(serializer.data)