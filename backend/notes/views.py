import json
import os
from datetime import datetime, timezone

from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google import genai
import openai
import whisper 

from notes.models import Subject, SummarisedNote


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        login_data = json.loads(request.body)
        username = login_data['username']
        password = login_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'username': user.username, 'isTeacher': user.is_staff})
        else:
            # Return an 'invalid login' error message
            return JsonResponse({'error': 'Invalid login credentials'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def logout_view(request):
    logout(request)


def get_user_details(request):
    user = request.user
    return JsonResponse({'username': user.username, 'isTeacher': user.is_staff})


def get_notes(request):
    notes = SummarisedNote.objects.all()
    notes = list(notes.order_by('-upload_time').values('id', 'title', 'subject__name', 'subject__category_name', 'uploader__username', 'upload_time', 'additional_notes', 'location'))
    for note in notes:
        with open(note['location'], "r") as f:
            note['summary'] = f.read()
        del note['location']
        note['upload_time'] = note['upload_time'].strftime("%Y-%m-%d %H:%M")
    return JsonResponse(notes, safe=False)


def get_subjects(request):
    user_id = request.GET.get('userId')
    subjects = Subject.objects.all()
    if user_id:
        subjects = subjects.filter(users__id=user_id)
    subjects = list(subjects.order_by('name').values('id', 'name'))
    return JsonResponse(subjects, safe=False)


@csrf_exempt
def create_summarised_notes(request):
    uploaded_file = request.FILES.get('file')
    # client = OpenAI.Client(api_key="OPENAI_API_KEY")
    client2 = genai.Client(api_key=settings.GEMINI_API_KEY)
    file_name = uploaded_file.name
    file_name_without_extension = ".".join(file_name.split(".")[:-1])
    curr_date_str = datetime.strftime(datetime.now(tz=timezone.utc), "%Y%m%d%H%M%S")
    dest_file_name = os.path.join(os.path.dirname(settings.BASE_DIR), "summarised_notes", f"{file_name_without_extension}_{curr_date_str}.md")
    model = whisper.load_model("base")

    transcription = model.transcribe(uploaded_file.temporary_file_path())

    completion = client2.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"Assume the persona of a teacher and summarise the below notes for me, with proper formatting:\n{transcription['text']}"
    )
    with open(dest_file_name, "w") as destination_file:
        destination_file.write(completion.text)

    SummarisedNote.objects.create(
        location=dest_file_name,
        title=request.POST.get("title"),
        subject_id=request.POST.get("subject"),
        additional_notes=request.POST.get("additional_notes"),
        uploader_id=request.POST.get("uploader"),
    )
    return HttpResponse("Done")
