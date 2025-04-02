import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.baseUrl;

  if (req.url.startsWith('http')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${baseUrl}/${req.url}`,
  });

  return next(apiReq);
};
