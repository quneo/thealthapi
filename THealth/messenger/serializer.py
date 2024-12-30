from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    senderID = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Message
        fields = '__all__'



