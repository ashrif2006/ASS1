from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
 

def edit_job_view(request):
    return render(request, 'edit-job.html')

def update_job_api(request, job_id):
    if request.method == "POST":
        job = get_object_or_404(Job, id=job_id)
        job.title = request.POST.get('jobTitle')
        job.company = request.POST.get('company')
        job.salary = request.POST.get('salary')
        job.description = request.POST.get('description')
        job.status = request.POST.get('status')
        job.save() 
        return JsonResponse({'status': 'success'})

def delete_job_api(request, job_id):
    if request.method == "POST":
        job = get_object_or_404(Job, id=job_id)
        job.delete()
        return JsonResponse({'status': 'success'})
