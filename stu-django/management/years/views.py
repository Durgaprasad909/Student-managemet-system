from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Students
from .serializers import StudentSerializers
from .models import Login
from django.http import HttpResponse
import jwt
from datetime import datetime,timedelta
from django.conf import settings
@api_view(['GET'])
def sent(request):
    backlogs=request.GET.get('backlogs')
    attendence=request.GET.get('attendence')
    cgpa=request.GET.get('cgpa')
    year=request.GET.get('year')
    branch=request.GET.get('branch')
    if branch!="" and year!="":
        if year!="" and year!="5" and branch!="":
            stu=Students.objects.filter(year=year,branch=branch)
        else:
            stu=Students.objects.all()
        if backlogs:
            stu=stu.filter(backlogs__lte=backlogs)
        if attendence:
            stu = stu.filter(attendence__gt=attendence)
        if cgpa:
            stu=stu.filter(cgpa__gt=cgpa)
        # if year=="1":
        #     stu=stu.filter(year=year)
        # else:
        #     stu=None
        #     return HttpResponse("Selet year")
        serializer = StudentSerializers(
            stu,
        many=True
        )
    else:
        return HttpResponse("error")

    return Response(serializer.data)
@api_view(["POST"])
def check_login(request):

    login_id = request.data.get("login_id")
    password = request.data.get("password")

    if not login_id or not password:
        return Response(
            {"message": "Login ID and Password are required"},
            status=400
        )

    user = Login.objects.filter(
        login_id=login_id,
        password=password
    ).first()

    if not user:
        return Response(
            {"message": "Invalid Credentials"},
            status=401
        )

    payload = {
        "name":user.name,
        "login_id": user.login_id,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }

    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm="HS256"
    )

    return Response({
        "message": "Login Successful",
        "token": token,
        "login_id": user.login_id
    })

@api_view(['GET'])
def validateone(request):
    year=request.GET.get('year')
    branch=request.GET.get('branch')
    if branch!="":
        if year!="5" and year!="":
            stu=Students.objects.filter(year=year,branch=branch)
        
        else:
            
            stu=Students.objects.filter(branch=branch)

    else:
        return HttpResponse({
            'msg':"Please Enter Branch"
        })
    serializer=StudentSerializers(
        stu,
        many=True
    )
    return Response({
        'student':serializer.data,
        'msg':"Data loaded successfully..."
    })
# @api_view(['GET'])
# def validatebranch(request):
#     branch=request.GET.get('branch')
#     print(branch)
#     stu=Students.objects.filter(branch=branch)
#     serializer=StudentSerializers(
#         stu,
#         many=True
#     )
#     return Response(serializer.data)
    