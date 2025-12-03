import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from pyramid_matkul import models

def setup_models(dbsession):
    """
    Add initial model objects for Matakuliah.
    """
    
    #3  Data awal
    data_matakuliah = [
        {
            'kode_mk': 'IF101',
            'nama_mk': 'Algoritma dan Pemrograman',
            'sks': 3,
            'semester': 1
        },
        {
            'kode_mk': 'IF202',
            'nama_mk': 'Struktur Data',
            'sks': 4,
            'semester': 2
        },
        {
            'kode_mk': 'SI303',
            'nama_mk': 'Basis Data',
            'sks': 3,
            'semester': 3
        }
    ]

    for data in data_matakuliah:
        # Cek apakah data sudah ada berdasarkan kode_mk (karena unique)
        existing = dbsession.query(models.Matakuliah).filter_by(kode_mk=data['kode_mk']).first()
        
        if not existing:
            mk = models.Matakuliah(
                kode_mk=data['kode_mk'],
                nama_mk=data['nama_mk'],
                sks=data['sks'],
                semester=data['semester']
            )
            dbsession.add(mk)
            print(f"Matakuliah {data['kode_mk']} - {data['nama_mk']} added.")
        else:
            print(f"Matakuliah {data['kode_mk']} already exists.")


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)

    # bootstrap will return a context with request + closer
    env = bootstrap(args.config_uri)
    request = env['request']

    try:
        # gunakan request.tm (bukan tm_manager)
        with request.tm:
            dbsession = request.dbsession
            setup_models(dbsession)

        print("Database initialized successfully with Matakuliah data.")

    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.

Your database should be up and running before you
initialize your project. Make sure your database server
is running and your connection string in development.ini
is correctly configured.
''')

    finally:
        env['closer']()


if __name__ == '__main__':
    main()