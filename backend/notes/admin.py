from django.contrib import admin

from notes.models import Subject


class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'category_name']
    exclude = ["users"]


# Register your models here.
admin.site.register(Subject, SubjectAdmin)
