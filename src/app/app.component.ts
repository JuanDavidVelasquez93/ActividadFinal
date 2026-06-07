import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <div>
        <strong>Bandeja Paisa App</strong>
        <span>Pedidos locales</span>
      </div>

      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Crear pedido</a>
        <a routerLink="/pedidos" routerLinkActive="active">Ver pedidos</a>
      </nav>
    </header>

    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {}
