import { Injectable } from '@angular/core';
import { getIdUsuario, getIdProfesionalH } from '../../core/auth/storage/cabecera.storage';
import { Headers } from '@angular/http';
import { getAuthCode, getAuthNonce } from '../../core/auth/storage/token.storage';

@Injectable()
export abstract class BaseService {

  protected obtenerHeaders(): Headers {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('idProfesionalH', getIdProfesionalH());
    headers.append('codUsuario', getIdUsuario());
    headers.append('code', getAuthCode());
    headers.append('nonce', getAuthNonce());

    return headers;
  }

}
