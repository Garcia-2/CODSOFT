from django.http import HttpResponse

def default(request):
    return HttpResponse('<h1>Kid Drip</h1>')