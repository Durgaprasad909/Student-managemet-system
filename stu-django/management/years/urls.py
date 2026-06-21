from django.urls import path
from years import views
urlpatterns = [
    
   path('students/',views.sent ),
   path('login/',views.check_login),
   path('validateone/',views.validateone),
   # path('validatebranch/',views.validatebranch)
]