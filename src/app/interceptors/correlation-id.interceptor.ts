// src/app/interceptors/correlation-id.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  // Erstellen einer eindeutigen CorrelationId
  const correlationId = uuidv4();

  // Klonen der Anfrage und Hinzufügen des CorrelationId-Headers
  const clonedRequest = req.clone({
    setHeaders: { CorrelationId: correlationId },
  });

  // Optional: Protokollieren der Anfrage mit CorrelationId
  console.log(`Request to ${req.url} with CorrelationId: ${correlationId}`);

  return next(clonedRequest);
};
