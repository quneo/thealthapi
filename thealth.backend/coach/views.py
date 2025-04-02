from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from .models import VideoAnalysis
from .serializers import VideoAnalysisSerializer
from .utils import analyze_video  # Импортируем вашу функцию анализа
import threading
import os
from rest_framework.permissions import IsAuthenticated

class VideoAnalysisView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if 'video' not in request.FILES:
            return Response(
                {'error': 'No video file provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Сохраняем файл временно
        video_file = request.FILES['video']
        temp_path = os.path.join('temp_videos', video_file.name)

        # Создаем директорию, если её нет
        os.makedirs(os.path.dirname(temp_path), exist_ok=True)

        with open(temp_path, 'wb+') as destination:
            for chunk in video_file.chunks():
                destination.write(chunk)

        # Создаем запись в БД
        instance = VideoAnalysis.objects.create(
            user=request.user,
            video=video_file,
            status='pending'
        )

        # Запускаем обработку в отдельном потоке
        processing_thread = threading.Thread(
            target=self.process_video,
            args=(instance.id, temp_path)
        )
        processing_thread.start()

        serializer = VideoAnalysisSerializer(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def process_video(self, analysis_id, video_path):
        analysis = VideoAnalysis.objects.get(id=analysis_id)
        analysis.status = 'processing'
        analysis.save()

        try:
            # Используем вашу функцию анализа
            results = analyze_video(video_path)

            analysis.counts = results['counts']
            analysis.smooth_score = results['smooth_score']
            analysis.amplitude_score = results['amplitude_score']
            analysis.status = 'completed'
        except Exception as e:
            analysis.status = 'failed'
            analysis.error = str(e)
        finally:
            analysis.save()
            # Удаляем временный файл
            if os.path.exists(video_path):
                os.remove(video_path)

    def get(self, request):
        analyses = VideoAnalysis.objects.all()
        serializer = VideoAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)