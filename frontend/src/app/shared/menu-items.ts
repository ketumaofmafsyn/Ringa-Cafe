import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard`', icon: 'dashboard', role: '' },
  { state: 'category', name: 'Manage_Category`', icon: 'category', role: 'admin' },
  { state: 'product', name: 'Manage_Product`', icon: 'inventory_2', role: 'admin' },
  { state: 'order', name: 'Manage_Order`', icon: 'list_alt', role: '' },
  { state: 'bill', name: 'View_Bill`', icon: 'import_contacts', role: '' },
  { state: 'user', name: 'View_User`', icon: 'people', role: 'admin' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
