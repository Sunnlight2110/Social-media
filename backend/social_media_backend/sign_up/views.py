from rest_framework.response import Response  # Correct import
from rest_framework import status
from rest_framework import generics
from .serializer import Registratserializer

class RegistrationView(generics.CreateAPIView):
    serializer_class = Registratserializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()

            # Returning JSON response after successful creation
            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                },
                'message': 'Created successfully',
                'status': 'success'
            }, status=status.HTTP_201_CREATED)
        
        # If there are validation errors, return them as JSON
        return Response({
            'errors': serializer.errors,
            'status': 'error'
        }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        # Optionally return some other JSON data, or an empty message
        return Response({
            'message': 'Use POST method to register',
            'status': 'info'
        }, status=status.HTTP_200_OK)
