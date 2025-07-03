from django.contrib.auth.models import User
from django.db import models


class Subject(models.Model):
    objects = models.manager
    name = models.CharField(max_length=200)
    category_name = models.CharField(max_length=200)
    users = models.ManyToManyField(User)

    class Meta:
        app_label = 'notes'
        managed = True


class SummarisedNote(models.Model):
    objects = models.manager
    location = models.CharField(max_length=200)
    title = models.CharField(max_length=50)
    subject = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)
    additional_notes = models.CharField(max_length=200, null=True)
    uploader = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    upload_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'notes'
        managed = True
