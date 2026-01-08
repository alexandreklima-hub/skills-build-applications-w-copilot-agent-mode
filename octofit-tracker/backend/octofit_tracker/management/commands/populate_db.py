from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Limpar dados existentes na ordem correta para evitar erros de dependência
        from django.db import connection
        collections = [
            'octofit_tracker_activity',
            'octofit_tracker_workout',
            'octofit_tracker_leaderboard',
            'octofit_tracker_user',
            'octofit_tracker_team',
        ]
        for collection in collections:
            connection.cursor().execute(f"DELETE FROM {collection}")

        # Criar times
        marvel = Team.objects.create(name='Marvel', description='Time dos heróis Marvel')
        dc = Team.objects.create(name='DC', description='Time dos heróis DC')

        # Criar usuários
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel, is_leader=True)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc, is_leader=True)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Criar atividades
        Activity.objects.create(user=tony, activity_type='Corrida', duration_minutes=30, date=timezone.now())
        Activity.objects.create(user=steve, activity_type='Bicicleta', duration_minutes=45, date=timezone.now())
        Activity.objects.create(user=bruce, activity_type='Natação', duration_minutes=60, date=timezone.now())
        Activity.objects.create(user=clark, activity_type='Caminhada', duration_minutes=20, date=timezone.now())

        # Criar workouts
        w1 = Workout.objects.create(name='Treino Marvel', description='Treino especial para heróis Marvel')
        w2 = Workout.objects.create(name='Treino DC', description='Treino especial para heróis DC')
        w1.suggested_for.add(tony, steve)
        w2.suggested_for.add(bruce, clark)

        # Criar leaderboard
        Leaderboard.objects.create(team=marvel, total_points=150)
        Leaderboard.objects.create(team=dc, total_points=120)

        self.stdout.write(self.style.SUCCESS('Banco octofit_db populado com dados de teste!'))
