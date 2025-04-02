import cv2
import mediapipe as mp
import numpy as np

from collections import deque
import pandas as pd

from scipy.signal import find_peaks
from scipy.ndimage import gaussian_filter
from tqdm import tqdm

import os
import django
from django.conf import settings

# Настройка Django для работы вне HTTP-запросов
if not settings.configured:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aicoachtest.settings')
    django.setup()

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_draw = mp.solutions.drawing_utils


def return_normalized_points(fingers_cords):
    fingers_x = fingers_cords[:, 0]
    fingers_y = fingers_cords[:, 1]

    fingers_x = (fingers_x - fingers_x.mean()) / fingers_x.std()
    fingers_y = (fingers_y - fingers_y.mean()) / fingers_y.std()

    fingers_norm = np.dstack((fingers_x, fingers_y))

    return fingers_norm[0]


def threshold_boost(x, threshold=0.07, boost_factor=5):
    if x > threshold:
        boosted_x = x * boost_factor
        if boosted_x <= 1:
            return boosted_x
        else:
            return 1
    return x


class GestureEnergyAnalyzer:
    def __init__(self, window_size=3, history_len=400):
        """
        Класс, анализирующий энергию движения руки для выделения временных рамок выполнения жеста.

        param: window_size - Размер скользящего дня для сглаживания энергии.
        param: min_frame_gap - Минимальное расстояние между выделенными моментами.
        param: adaptive_threshold_window - Размер окна, на основании которого расчитывается адаптивный порог.
        param: confirm_window - Размер окна подтверждения.
        param: history_len - Длина хранимой истории.
        param: selected_indices - индексы, по которым вычисляется средняя точка руки.
        """

        # Параметры алгоритма
        self.window_size = window_size
        self.history_len = history_len
        self.selected_indices = [11, 12, 16, 15, 27, 28]

        # История данных
        self.energy_history = deque(maxlen=self.history_len)  # Запоминаем последние 100 значений
        self.smoothed_history = deque(maxlen=self.history_len)
        self.landmarks_history = []
        self.centr = None

        # Счетчики и состояния
        self.under_threshold_counter = 0
        self.current_frame = 0
        self.prev_landmarks = None

    def process_motion(self, landmarks):
        value = self.compute_energy(landmarks)
        return value

    def compute_energy(self, landmarks):
        if landmarks.shape != (33, 2):
            raise ValueError(f"Wrong landmarks shape")  # Проверяем размер поданных точек

        self.centr = np.mean(landmarks[self.selected_indices], axis=0)
        energy = 0
        norm_landm = return_normalized_points(np.array(landmarks))  # Нормализуем координаты
        if self.prev_landmarks is not None:
            center_cur = np.mean(norm_landm[self.selected_indices], axis=0)  # Вычисляем среднюю точку
            center_prev = np.mean(self.prev_landmarks[self.selected_indices], axis=0)
            energy = np.linalg.norm(center_cur)  # Вычисляем энергию
            self.energy_history.append(energy)  # Добавляем вычисленное значение энергии в список

        self.prev_landmarks = norm_landm  # Сохраняем текущие точки

        return energy

    def _smooth_energy(self):
        if len(self.energy_history) >= self.window_size:
            smoothed_value = np.mean(list(self.energy_history)[-self.window_size:])
        else:
            smoothed_value = np.nan  # Если недостаточно значений, ставим NaN

        self.smoothed_history.append(smoothed_value)


def ProcessVideo(path, save_csv=False):
    # Загрузка видеофайла
    input_video_path = path

    # Захват видео
    cap = cv2.VideoCapture(input_video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))  # Получаем общее число кадров
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    if not cap.isOpened():
        print(f"Error: Could not open video file {path}")
        return pd.DataFrame()

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total_frames == 0:
        print("Error: Video file has 0 frames")
        return pd.DataFrame()

    # Параметры
    history_len = 200
    window_size = 2

    analyzer = GestureEnergyAnalyzer(
        window_size=window_size,
        history_len=history_len,
    )

    time_series = []

    # Добавляем прогресс-бар
    with tqdm(total=total_frames, desc="Обработка видео", unit="кадр") as pbar:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Преобразуем изображение в RGB
            image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Обрабатываем изображение для распознавания позы
            results = pose.process(image_rgb)

            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                landmarks_points = np.array(
                    [(lm.x * frame_width, lm.y * frame_height) for lm in landmarks])  # 2D координаты

                energy = analyzer.process_motion(landmarks_points)
                time_series.append(energy)

            # Обновляем прогресс-бар
            pbar.update(1)

    # Освобождаем ресурсы
    cap.release()
    cv2.destroyAllWindows()

    # Сохранение данных в CSV
    df = pd.DataFrame({"Energy": time_series})
    if save_csv:
        df.to_csv("energy_history.csv", index=False)

    return df


class MotionAnalyzer:
    def __init__(self):
        pass

    @staticmethod
    def SignalSmoothing(data):
        data = data.iloc[1:]
        smooth_data = data.rolling(window=7).mean()
        norm_data = (smooth_data - smooth_data.min()) / (smooth_data.max() - smooth_data.min())
        filtered_data = gaussian_filter(norm_data, sigma=5)  # sigma определяет степень сглаживания

        return filtered_data

    @staticmethod
    def Counter(data):
        filtered_data_array = data.flatten()
        peaks, _ = find_peaks(filtered_data_array, height=0)
        return len(peaks)

    @staticmethod
    def SmoothScrote(data):
        filtered_data_array = data.flatten()
        peaks, _ = find_peaks(filtered_data_array, height=0)
        peak_distances = np.sort(np.diff(peaks))
        peak_distances = peak_distances[2:-2]
        std_distance = np.std(peak_distances)
        min_distance = np.min(peak_distances)
        max_distance = np.max(peak_distances)
        range_distances = max_distance - min_distance
        smoothness = 1 - (std_distance / range_distances)

        score = np.sqrt(smoothness)
        score = np.clip(score, a_min=0, a_max=1)
        return score

    @staticmethod
    def AmplitudeScore(data):
        filtered_data_array = data.flatten()
        peaks, _ = find_peaks(filtered_data_array, height=0)  # Пики относительно сглаженного сигнала
        valleys, _ = find_peaks(-filtered_data_array)  # Минимумы (инвертируем сигнал для поиска минимумов)
        min_size = np.min([len(valleys), len(peaks)])
        amplitudes = filtered_data_array[peaks[:min_size]] - filtered_data_array[valleys[:min_size]]
        amplitudes = np.sort(amplitudes)
        amplitudes = amplitudes[1:-1]
        std_amplitudes = np.std(amplitudes)
        mean_amplitudes = np.mean(amplitudes)
        # Метрика стабильности амплитуд
        stability_score = 1 - (std_amplitudes / mean_amplitudes)
        return stability_score

    @staticmethod
    def StandartComprasion(data):
        pass

    def ComplexAnalyze(self, data):
        smooth_signal = self.SignalSmoothing(data)
        count = self.Counter(smooth_signal)
        smooth_score = self.SmoothScrote(smooth_signal)
        amplitude_score = self.AmplitudeScore(smooth_signal)

        return {'counts': count,
                'smooth_score': smooth_score,
                'amplitude_score': amplitude_score}


def analyze_video(video_path):
    motionanalyzer = MotionAnalyzer()
    history = ProcessVideo(video_path, save_csv=False)
    result = motionanalyzer.ComplexAnalyze(history)
    return result

#analyze_video('video.mp4')
