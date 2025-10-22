import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:'enabled'})),
    provideHttpClient()
  ]
};


/* withInMemoryScrolling({scrollPositionRestoration:'enabled'}) */
/*ESTO HACE QUE AL ELEGIR UN ITEM DE MENÚ PARA NAVEGAR A OTRO CONTENIDO
, ESTE NUEVO CONTENIDO SE CARGUE EN LA POSICIÓN INICIAL (PUDIERA DARSE
EL CASO QUE ESTEMOS NAVEGANDO EN LA WEB UTILIZANDO EL SCROLL Y NO QUIERO
QUE LA PÁGINA QUE SE CARGUE CONSERVE ESE SCROLL OBLIGÁNDONOS A SCROLLAR
HAACIA ARRIBA PARA EMPEZAR A NAVEGAR POR EL NUEVO CONTENIDO/ */