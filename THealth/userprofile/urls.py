from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RelationsViewSet, UserAPIList, UserAPIUpdate, UserAPIDestroy

router = DefaultRouter()
router.register(r'relations', RelationsViewSet, basename='relations')


urlpatterns = [
    path('', include(router.urls)),
    path('userlist/', UserAPIList.as_view(), name='user_register'),
    path('userupdate/<int:pk>/', UserAPIUpdate.as_view(), name='user_update'),
    path('userdelete/<int:pk>/', UserAPIDestroy.as_view(), name='user_delete'),
]
