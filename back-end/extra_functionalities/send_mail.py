from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import smtplib
import random
load_dotenv()


def send_email(receiver, name, user_password):
    sender = 'arnoglez05@gmail.com'
    password = 'wbmh xhsy rlir axbu'
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = receiver
    msg['Subject'] = 'Bienvenido al sistemas de Solicitudes de IMPORCOLEC GestionLab – Detalles de Acceso al Sistema'
    body = f"""
            Hola {name},

            ¡Le damos la bienvenida al sistemas de Solicitudes de IMPORCOLEC GestionLab! 
            Estamos encantados de que use este sistema para presentar sus solicitudes laborales, a continuación se encuentran
            las credenciales para acceder al sistema.
            Detalles de su cuenta:

            - Usuario: {receiver}
            - Contraseña: {user_password}

            Por favor, acceda al siguiente link con estas credenciales para presente sus solicitudes.

            [Acceder al Sistema](URL_del_sistema)

            Gracias y ¡bienvenido a bordo!

            Saludos cordiales,
            """
    msg.attach(MIMEText(body, 'plain'))
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        text = msg.as_string()
        server.sendmail(sender, receiver, text)
        print("Correo enviado exitosamente!")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
    finally:
        server.quit()

def generate_random_code():
    code = random.randint(10000000, 99999999)
    return code

