from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from feed.views import PostAPIList, PostAPIUpdate, PostAPIDestroy, PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')



urlpatterns = [
    path('feed/', PostAPIList.as_view(), name='feed-list'),
    path('feed/post/', PostAPIList.as_view(), name='feed-post'),
    path('feed/delete/', PostAPIDestroy.as_view(), name='feed-delete'),
    path('feed/', include(router.urls))
]
