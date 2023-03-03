from django.urls import path
from .views import api_list_hat, api_show_hat

urlpatterns = [
    path("hat/", api_list_hat, name="api_list_hat"),
    path("hat/<int:id>/", api_show_hat, name="api_show_hat"),
]
