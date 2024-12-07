# Generated by Django 4.2.3 on 2024-12-05 00:51

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="user",
            managers=[],
        ),
        migrations.RemoveField(
            model_name="user",
            name="capsule_media",
        ),
        migrations.CreateModel(
            name="CapsuleCollection",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                (
                    "uuid",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, verbose_name="UUID"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("location", models.CharField(max_length=100)),
                (
                    "capsules",
                    models.ManyToManyField(
                        blank=True, to="authentication.capsulemedia"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="collections",
            field=models.ManyToManyField(
                blank=True, to="authentication.capsulecollection"
            ),
        ),
    ]
