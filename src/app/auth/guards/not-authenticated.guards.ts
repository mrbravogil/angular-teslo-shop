import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const NotAuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);

    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkStatus());
   

    if(isAuthenticated){
        router.navigateByUrl('/');
        return false;
    }

    
    return true;
};