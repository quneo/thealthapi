FROM python:3.10

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install python-dotenv

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]