from django.urls import path
from notes.views import login_view, logout_view, get_notes, get_subjects, create_summarised_notes, get_user_details


urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('get_user_details/', get_user_details),
    path('get_notes/', get_notes),
    path('get_subjects/', get_subjects),
    path('create_summarised_notes/', create_summarised_notes),
]
