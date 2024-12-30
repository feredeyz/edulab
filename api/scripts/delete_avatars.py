# Python script to delete all avatars when erase db data to avoid errors
import os

def delete_files(path):
    for filename in os.listdir(path):
        f = os.path.join(path, filename)
        if 'avatar' in filename:
            os.remove(f)
            