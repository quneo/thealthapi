from django.db import models

from userprofile.models import User


# Create your models here.


class Post(models.Model):
    CreatorID = models.ForeignKey(User, on_delete=models.CASCADE)
    Content = models.TextField()
    IsPublished = models.BooleanField(default=True)
    Date = models.DateField(auto_now_add=True)

    # Новые поля для хранения количества лайков и дизлайков
    LikesCount = models.IntegerField(default=0)
    DislikesCount = models.IntegerField(default=0)

    def count_likes(self):
        return self.LikesCount

    def count_dislikes(self):
        return self.DislikesCount


class PostMark(models.Model):
    MARK_CHOICES = [
        ('like', 'Like'),
        ('dislike', 'Dislike'),
    ]
    Mark = models.CharField(max_length=7, choices=MARK_CHOICES, blank=True, null=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    PostID = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='postmark_set')


class Comment(models.Model):
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    PostID = models.ForeignKey(Post, on_delete=models.CASCADE)
    Date = models.DateField(auto_now_add=True)
    Content = models.TextField()



