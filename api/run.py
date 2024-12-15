from . import create_app
from .views import main

app = create_app()
app.register_blueprint(main)
 