from rest_framework import serializers
from .models import VideoAnalysis


class VideoAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoAnalysis
        fields = '__all__'
        read_only_fields = (
            'uploaded_at', 'status',
            'counts', 'smooth_score',
            'amplitude_score', 'error'
        )
