from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import User, FriendShip
from .serializer import UserSerializer, FriendShipSerializer


class UserAPIList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserAPIUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RelationsViewSet(viewsets.ModelViewSet):
    queryset = FriendShip.objects.all()
    serializer_class = FriendShipSerializer

    @action(detail=True, methods=['post'], url_path='add_friend')
    def add_friend(self, request, pk=None):
        user = request.user
        try:
            friend = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)

        existing_relation = FriendShip.objects.filter(UserID=user, FriendID=friend).first()

        if not existing_relation:
            FriendShip.objects.create(UserID=user, FriendID=friend)
            return Response({"message": "Заявка на добавление в друзья отправлена."}, status=status.HTTP_200_OK)
        else:
            existing_relation.delete()
            return Response({"message": "Заявка на добавление в друзья удалена."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='subscribers')
    def get_subscribers(self, request):
        user = request.user

        subscribers = FriendShip.objects.filter(FriendID=user).exclude(UserID=user)

        outgoing_requests = FriendShip.objects.filter(UserID=user).values_list('FriendID', flat=True)

        subscribers = subscribers.exclude(UserID__in=outgoing_requests)

        subscribers_list = UserSerializer([friendship.UserID for friendship in subscribers], many=True)
        return Response(subscribers_list.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='subscriptions')
    def get_subscriptions(self, request):
        user = request.user

        outgoing_requests = FriendShip.objects.filter(UserID=user).values_list('FriendID', flat=True)

        incoming_requests = FriendShip.objects.filter(FriendID=user).values_list('UserID', flat=True)

        outgoing_requests = outgoing_requests.exclude(FriendID__in=incoming_requests)

        # Получаем объекты User по их ID
        users = User.objects.filter(id__in=outgoing_requests)

        # Сериализация пользователей
        outgoing_requests_list = UserSerializer(users, many=True)

        return Response(outgoing_requests_list.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='friends')
    def get_friends(self, request):
        user = request.user

        incoming_friendships = FriendShip.objects.filter(FriendID=user).values_list('UserID', flat=True)

        outgoing_friendships = FriendShip.objects.filter(UserID=user).values_list('FriendID', flat=True)

        mutual_friend_ids = set(incoming_friendships) & set(outgoing_friendships)

        mutual_friends = User.objects.filter(id__in=mutual_friend_ids)

        mutual_friends_list = UserSerializer(mutual_friends, many=True)
        return Response(mutual_friends_list.data, status=status.HTTP_200_OK)





