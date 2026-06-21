from django.contrib import admin
from .models import Students
from .models import Login
class StudentsAdmin(admin.ModelAdmin):
    list_display = ['roll_num', 'name','branch','year','backlogs','cgpa','attendence','phone_num','email']

class LoginAdmin(admin.ModelAdmin):
    list_display=['login_id','name','password']

admin.site.register(Students, StudentsAdmin)
admin.site.register(Login,LoginAdmin)