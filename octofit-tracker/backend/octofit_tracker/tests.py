from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel', description='Time dos heróis Marvel')
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel, is_leader=True)
        Activity.objects.create(user=tony, activity_type='Corrida', duration_minutes=30, date='2026-01-08')
        Workout.objects.create(name='Treino Marvel', description='Treino especial para heróis Marvel')
        Leaderboard.objects.create(team=marvel, total_points=150)

    def test_user_creation(self):
        self.assertEqual(User.objects.count(), 1)

    def test_team_creation(self):
        self.assertEqual(Team.objects.count(), 1)

    def test_activity_creation(self):
        self.assertEqual(Activity.objects.count(), 1)

    def test_workout_creation(self):
        self.assertEqual(Workout.objects.count(), 1)

    def test_leaderboard_creation(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
