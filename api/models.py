from django.db import models

class Patient(models.Model):
    first_name = models.CharField(default="",max_length=100)
    last_name = models.CharField(default="",max_length=100)
    middle_name = models.CharField(default="",max_length=100)
    address = models.CharField(max_length=100)
    telephone = models.IntegerField(max_length=100,unique=True,default=0)
    age = models.IntegerField()
    occupation = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    complaint = models.CharField(default="",max_length=100)
   

    def __str__(self):
        return self.first_name


class Treatment(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name 


class PatientAppointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='patient_appointment')
    date_appointed = models.DateField(auto_now_add=False, auto_now=False, blank=False, null=False)
    description = models.ForeignKey(Treatment, on_delete=models.CASCADE,related_name='patient_treatment')
    status = models.BooleanField(default=False)
    def __str__(self):
        return self.patient.first_name


class ProcessPayments(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=False, auto_now=False, blank=True)
    description = models.ForeignKey(Treatment, on_delete=models.SET_NULL,null=True)
    check_number = models.CharField(max_length=255,null=True, blank=True)
    discount = models.IntegerField(default=0,null=True,blank=True)
    amount = models.IntegerField(default=0)
    payment = models.IntegerField(default=0)
    balance= models.IntegerField(default=0)
    date_paid = models.DateField(auto_now_add=False, auto_now=False, blank=True,null=True)

    def __str__(self):
        return f"{self.patient.first_name}-{self.description.name}"