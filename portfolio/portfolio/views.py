from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from django.http import JsonResponse
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)


def main(request):
    if request.method == 'POST':
        # Handle AJAX form submission
        try:
            data = json.loads(request.body)
            name = data.get('contactName')
            email = data.get('contactEmail')
            subject = data.get('contactSubject', 'Portfolio Contact')
            message = data.get('contactMessage')
            
            # Validate required fields
            if not all([name, email, message]):
                return JsonResponse({'success': False, 'message': 'Please fill in all required fields.'})
            
            # Compose email
            email_subject = f"Portfolio Contact: {subject}"
            email_message = f"""
            New message from your portfolio website:
            
            Name: {name}
            Email: {email}
            Subject: {subject}
            
            Message:
            {message}
            
            ---
            This message was sent from your portfolio contact form.
            Reply directly to: {email}
            """
            
            # Send email
            try:
                send_mail(
                    email_subject,
                    email_message,
                    f'Portfolio Contact <{settings.EMAIL_HOST_USER}>',  # From email with name
                    [settings.EMAIL_HOST_USER],  # To email (your email)
                    fail_silently=False,
                )
                return JsonResponse({'success': True, 'message': 'Message sent successfully! Thank you for contacting me.'})
            except Exception as email_error:
                logger.error(f"Email sending failed: {str(email_error)}")
                # Return more specific error information in development
                if settings.DEBUG:
                    return JsonResponse({'success': False, 'message': f'Email error: {str(email_error)}'})
                return JsonResponse({'success': False, 'message': 'Unable to send email. Please try again later or contact me directly.'})
                
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid request format.'})
        except Exception as e:
            logger.error(f"General error in contact form: {str(e)}")
            return JsonResponse({'success': False, 'message': 'An error occurred while sending your message. Please try again.'})
    
    return render(request, 'index1.html')

