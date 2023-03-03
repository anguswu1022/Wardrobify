from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ("closet_name", "bin_number", "bin_size")


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(max_length=200)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("manufacturer", "model_name", "color")
