from django.urls import path
from .views import api_list_hat

urlpatterns = [
    path("hat/", api_list_hat, name="api_list_hat"),
]
