# Generated by Django 4.2.3 on 2024-12-07 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0003_remove_capsulemedia_location"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="capsulemedia",
            name="title",
        ),
        migrations.AlterField(
            model_name="capsulemedia",
            name="media",
            field=models.FileField(upload_to=""),
        ),
    ]
