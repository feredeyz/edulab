from server import create_app, db
from scripts.delete_avatars import delete_files
app = create_app()
with app.app_context():
    # db.drop_all() # Uncomment to erase all data
    # delete_files('avatars') # Uncomment to erase all data
    db.create_all()