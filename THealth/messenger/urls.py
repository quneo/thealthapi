from django.contrib import admin
from django.urls import path

from messenger.views import MessageAPIList, MessageAPIDestroy, ContactListView

urlpatterns = [
    path('messages/', MessageAPIList.as_view(), name='message-list'),
    path('messages/send/', MessageAPIList.as_view(), name='message-send'),
    path('messages/delete/', MessageAPIDestroy.as_view(), name='message-delete'),
    path('contacts/', ContactListView.as_view(), name='contacts')
]
