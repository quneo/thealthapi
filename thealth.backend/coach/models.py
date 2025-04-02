from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_delete
import os
from userprofile.models import User

class VideoAnalysis(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='video_analyses'
    )

    video = models.FileField(
        upload_to='uploads/videos/',
        validators=[FileExtensionValidator(allowed_extensions=['mp4', 'avi', 'mov'])]
    )

    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name='Upload_date')
    processed_at = models.DateTimeField(null=True, blank=True, verbose_name='Process_date')

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='status')
    counts = models.IntegerField(null=True, blank=True)
    smooth_score = models.FloatField(null=True, blank=True)
    amplitude_score = models.FloatField(null=True, blank=True)
    error = models.TextField(blank=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"Analysis #{self.id} - {self.status}"

    def save(self, *args, **kwargs):
        # При завершении обработки обновляем processed_at
        if self.status in ['completed', 'failed'] and not self.processed_at:
            from django.utils import timezone
            self.processed_at = timezone.now()
        super().save(*args, **kwargs)

    def delete_video_file(self):
        """Удаляет связанный видеофайл"""
        if self.video:
            if os.path.isfile(self.video.path):
                os.remove(self.video.path)

# Сигнал для удаления файла при удалении записи
@receiver(post_delete, sender=VideoAnalysis)
def auto_delete_video_on_delete(sender, instance, **kwargs):
    instance.delete_video_file()

# Сигнал для удаления старого файла при обновлении
@receiver(models.signals.pre_save, sender=VideoAnalysis)
def auto_delete_video_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_file = VideoAnalysis.objects.get(pk=instance.pk).video
    except VideoAnalysis.DoesNotExist:
        return False

    new_file = instance.video
    if not old_file == new_file and os.path.isfile(old_file.path):
        os.remove(old_file.path)