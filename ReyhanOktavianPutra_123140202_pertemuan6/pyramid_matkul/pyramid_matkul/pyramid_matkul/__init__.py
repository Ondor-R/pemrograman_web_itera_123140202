from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.add_route('home', '/')
        config.include('pyramid_tm')
        config.include('pyramid_retry')
        config.include('.routes')
        config.scan('.views')
    return config.make_wsgi_app()