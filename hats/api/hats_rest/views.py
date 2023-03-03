from django.http import JsonResponse
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods
import json
# Create your views here.

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    def get_extra_data(self, o):
        return {"location": o.location.closet_name}

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]
class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    # when dealing with a foreignKey that has multiple objects
    encoders = {
        "location": LocationVODetailEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_hat(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id != None:
            hat = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_hat(request,id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
