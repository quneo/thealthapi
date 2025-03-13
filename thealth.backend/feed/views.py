from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Post, PostMark, Comment
from .serializer import PostSerializer, CommentSerializer
from .permissions import IsOwner, IsAdminOrOwner


# Create your views here.

class PostAPIList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)


class PostAPIUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permissions_classes = (IsOwner,)


class PostAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAdminOrOwner,)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=['post'], url_path='like')
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        existing_mark = PostMark.objects.filter(PostID=post, UserID=user).first()

        if existing_mark:
            if existing_mark.Mark == 'like':
                existing_mark.delete()  # Удаляем лайк
                post.LikesCount -= 1
            else:
                existing_mark.Mark = 'like'  # Изменяем дизлайк на лайк
                existing_mark.save()
                post.LikesCount += 1
                post.DislikesCount -= 1
        else:
            PostMark.objects.create(PostID=post, UserID=user, Mark='like')
            post.LikesCount += 1

        post.save()
        return Response({"message": "Лайк добавлен"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='dislike')
    def dislike(self, request, pk=None):
        post = self.get_object()
        user = request.user
        existing_mark = PostMark.objects.filter(PostID=post, UserID=user).first()

        if existing_mark:
            if existing_mark.Mark == 'dislike':
                existing_mark.delete()  # Удаляем дизлайк
                post.DislikesCount -= 1
            else:
                existing_mark.Mark = 'dislike'  # Изменяем лайк на дизлайк
                existing_mark.save()
                post.DislikesCount += 1
                post.LikesCount -= 1
        else:
            PostMark.objects.create(PostID=post, UserID=user, Mark='dislike')
            post.DislikesCount += 1

        post.save()
        return Response({"message": "Дизлайк добавлен"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='comment')
    def add_comment(self, request, pk=None):
        post = self.get_object()
        content = request.data.get('Content')

        if content:
            comment = Comment.objects.create(UserID=request.user, PostID=post, Content=content)
            return Response({"message": "Комментарий добавлен", "comment_id": comment.id},
                            status=status.HTTP_201_CREATED)
        return Response({"error": "Контент комментария обязателен!"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='comments')
    def get_comments(self, request, pk=None):
        post = self.get_object()
        comments = Comment.objects.filter(PostID=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], url_path='comments/delete/(?P<comment_id>[^/.]+)')
    def delete_comment(self, request, pk=None, comment_id=None):
        post = self.get_object()
        try:
            comment = Comment.objects.get(id=comment_id, PostID=post)
        except Comment.DoesNotExist:
            return Response({"error": "Комментарий не найден!"}, status=status.HTTP_404_NOT_FOUND)

        # Проверка прав доступа
        if request.user == post.CreatorID or request.user == comment.UserID or request.user.is_staff:
            comment.delete()
            return Response({"message": "Комментарий удален"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"error": "У вас нет прав для удаления этого комментария."}, status=status.HTTP_403_FORBIDDEN)
