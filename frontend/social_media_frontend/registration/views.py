from django.shortcuts import render

def registration_view(request):
    return render(
        request= request,
        template_name="registration.html"
    )
