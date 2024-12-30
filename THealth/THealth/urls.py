from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from userprofile.views import UserAPIList, UserAPIUpdate, UserAPIDestroy

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/userlist/', UserAPIList.as_view(), name='user_register'),
    path('api/userupdate/<int:pk>/', UserAPIUpdate.as_view(), name='user_update'),
    path('api/userdelete/<int:pk>/', UserAPIDestroy.as_view(), name='user_delete'),

    path('api/', include('messenger.urls'))
]
