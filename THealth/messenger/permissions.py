from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(request.user and request.user.is_staff)


class IsSenderOrReceiver(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.senderID == request.user or obj.receiverID == request.user