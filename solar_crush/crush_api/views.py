from rest_framework import status
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


class CrushAPI(APIView):

    renderer_classes = [TemplateHTMLRenderer]

    def get(self, request, format=None):
        data = request.query_params
        try:
            return Response(data=data, template_name='index.html')
        except:
            return Response('Bad request', status=status.HTTP_400_BAD_REQUEST)