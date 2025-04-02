from django.urls import path
from .views import VideoAnalysisView

urlpatterns = [
    path('analyze/', VideoAnalysisView.as_view(), name='video-analysis'),
]