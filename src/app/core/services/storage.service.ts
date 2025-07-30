import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Adiciona ou atualiza um item no localStorage
   * @param key Chave do item
   * @param value Valor a ser armazenado
   */
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove um item do localStorage
   * @param key Chave do item a ser removido
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Busca um item no localStorage
   * @param key Chave do item
   * @returns O valor armazenado ou null se não existir
   */
  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
