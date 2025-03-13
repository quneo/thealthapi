from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Message
from .permissions import IsSenderOrReceiver
from .serializer import MessageSerializer
from userprofile.models import User


class MessageAPIList(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = (IsSenderOrReceiver, )

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Message.objects.filter(senderID=user).union(Message.objects.filter(receiverID=user))
        else:
            return Message.objects.none()

    def list(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        sender = request.user
        receiver_id = request.data.get('receiverID')
        print(sender.id, receiver_id)
        if sender.id == receiver_id:
            return Response({"detail": "You can't send messeges for yourself."},
                            status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class MessageAPIUpdate(generics.UpdateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated, )


class MessageAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class ContactListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:

            sent_messages = Message.objects.filter(senderID=user).values_list('receiverID', flat=True)
            received_messages = Message.objects.filter(receiverID=user).values_list('senderID', flat=True)

            user_ids = list(sent_messages) + list(received_messages)
            unique_user_ids = set(user_ids)

            contacts = User.objects.filter(id__in=unique_user_ids)

            contacts_data = [{'id': contact.id, 'username': contact.username} for contact in contacts]

            return Response(contacts_data)

        else:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)