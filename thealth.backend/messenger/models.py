from django.db import models
from userprofile.models import User
# Create your models here.


class Message(models.Model):
    senderID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiverID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    SendTime = models.DateField(auto_now_add=True)
    Checked = models.BooleanField(default=False)
    Content = models.TextField()

    class Meta:
        indexes = [
            models.Index(fields=['senderID', 'receiverID']),
        ]

    def __str__(self):
        return f"Message from {self.senderID} to {self.receiverID} at {self.SendTime}"