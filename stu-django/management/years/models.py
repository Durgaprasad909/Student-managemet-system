from django.db import models

# Create your models here.
class Students(models.Model):
    roll_num=models.IntegerField()
    name=models.CharField(max_length=50)
    branch=models.CharField(max_length=10)
    year=models.IntegerField()
    backlogs=models.IntegerField()
    cgpa=models.FloatField()
    attendence=models.IntegerField()
    phone_num=models.IntegerField()
    email=models.EmailField()

    def __str__(self):
        return f"{self.roll_num} {self.name} {self.branch} {self.year} {self.backlogs} {self.cgpa} {self.attendence} {self.phone_num}{self.email}"
class Login(models.Model):
    login_id=models.IntegerField()
    password=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    def __str__(self):
        return f"{self.login_id}{self.password}{self.name}"
