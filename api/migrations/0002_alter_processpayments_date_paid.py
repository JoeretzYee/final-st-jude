# Generated by Django 4.0.1 on 2022-02-23 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processpayments',
            name='date_paid',
            field=models.DateField(blank=True, null=True),
        ),
    ]
