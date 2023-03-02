from django.shortcuts import render
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


# Create your views here.
class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href"
        "closet_name",
        "bin_number",
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]

@require_http_methods(["GET"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoe.objects.filter(bin=bin_vo_id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False
        )
