from django.core.management.base import BaseCommand
from matcha_spots.models import MatchaSpot


class Command(BaseCommand):
    help = 'Loads sample matcha spot data for testing'

    def handle(self, *args, **options):
        sample_spots = [
            {
                'name': 'Ten Ren Tea & Ginseng Co.',
                'address': '15333 Culver Dr',
                'city': 'Irvine',
                'state': 'CA',
                'zip_code': '92604',
                'latitude': 33.6846,
                'longitude': -117.8265,
                'rating': 4.5,
                'review_count': 320,
                'description': 'Authentic Taiwanese tea house with premium matcha and traditional tea service.',
                'phone': '(949) 551-9888',
                'website': 'https://www.tenren.com',
                'hours': 'Mon-Sun: 11AM-9PM',
                'price_range': '$$',
                'is_featured': True,
            },
            {
                'name': 'Omomo Tea Shoppe',
                'address': '14370 Culver Dr',
                'city': 'Irvine',
                'state': 'CA',
                'zip_code': '92604',
                'latitude': 33.6815,
                'longitude': -117.8260,
                'rating': 4.8,
                'review_count': 1250,
                'description': 'Popular spot for Instagram-worthy matcha drinks with customizable sweetness levels.',
                'phone': '(949) 502-8999',
                'website': 'https://www.omomoteashoppe.com',
                'hours': 'Mon-Sun: 11AM-10PM',
                'price_range': '$$',
                'is_featured': True,
            },
            {
                'name': 'Cha for Tea',
                'address': '4231 Campus Dr',
                'city': 'Irvine',
                'state': 'CA',
                'zip_code': '92612',
                'latitude': 33.6489,
                'longitude': -117.8426,
                'rating': 4.3,
                'review_count': 890,
                'description': 'Bubble tea and matcha spot near UCI campus, perfect for students.',
                'phone': '(949) 856-8833',
                'website': 'https://www.chafortea.com',
                'hours': 'Mon-Sun: 11AM-10PM',
                'price_range': '$',
                'is_featured': False,
            },
            {
                'name': 'Matcha Matcha',
                'address': '14450 Culver Dr',
                'city': 'Irvine',
                'state': 'CA',
                'zip_code': '92604',
                'latitude': 33.6820,
                'longitude': -117.8262,
                'rating': 4.6,
                'review_count': 450,
                'description': 'Specialty matcha cafe with traditional and modern preparations.',
                'phone': '(949) 502-1234',
                'hours': 'Mon-Sat: 10AM-9PM, Sun: 11AM-8PM',
                'price_range': '$$',
                'is_featured': False,
            },
            {
                'name': 'Tea Station',
                'address': '3963 Barranca Pkwy',
                'city': 'Irvine',
                'state': 'CA',
                'zip_code': '92606',
                'latitude': 33.6840,
                'longitude': -117.8170,
                'rating': 4.2,
                'review_count': 670,
                'description': 'Family-owned tea shop with excellent matcha and Taiwanese snacks.',
                'phone': '(949) 559-8888',
                'website': 'https://www.teastation.com',
                'hours': 'Mon-Sun: 11AM-10PM',
                'price_range': '$$',
                'is_featured': False,
            },
            {
                'name': 'Sharetea',
                'address': '3955 Barranca Pkwy',
                'city': 'Irvine',
                'state': 'CA',
                'zip_code': '92606',
                'latitude': 33.6845,
                'longitude': -117.8165,
                'rating': 4.4,
                'review_count': 520,
                'description': 'International bubble tea chain with quality matcha options.',
                'phone': '(949) 559-7777',
                'website': 'https://www.sharetea.com',
                'hours': 'Mon-Sun: 11AM-10PM',
                'price_range': '$',
                'is_featured': False,
            },
        ]

        created_count = 0
        for spot_data in sample_spots:
            spot, created = MatchaSpot.objects.get_or_create(
                name=spot_data['name'],
                defaults=spot_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created: {spot.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Already exists: {spot.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'\nSuccessfully loaded {created_count} new matcha spots!'
            )
        )

