import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public loader: LoaderService,
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get the token from authservice
    let authService = this.injector.get(AuthService);
    this.loader.show();
    // add the token with any request which will go out from tokeninterceptor
    let tokeniseReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken}`
      }
    })
    // after getting the request then hideths loader
    return next.handle(tokeniseReq).pipe(
      finalize(() => this.loader.hide())
    );
  }
}
