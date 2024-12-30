from . import db, login_manager
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from typing import Optional, List
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id: Mapped[int]  = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    avatar: Mapped[Optional[str]]
    
    courses_created = relationship('Course', back_populates='author', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.username}>, {self.password}'
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @property
    def pwd(self):
        return self.password
    
    @pwd.setter
    def pwd(self, password):
        self.password = generate_password_hash(password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Course(db.Model):
    __tablename__ = 'courses'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    date_created: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[Optional[str]]
    tags: Mapped[str] = mapped_column(nullable=False)
    
    author_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    author: Mapped['User'] = relationship('User', back_populates='courses_created')
    
    def __repr__(self):
        return f'<Course {self.title}>'