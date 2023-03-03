from django.contrib import admin
from .models import Hat
# Register your models here.

@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    pass
