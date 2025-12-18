import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReusableTableComponent, Column } from '../../../shared/components/tables/reusable-table/reusable-table.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  loyaltyLevel: string;
  totalVisits: number;
  totalSpent: string;
  image?: string;
  channel?: string; // Canal de origen (Zonaprop, MercadoLibre, Web Berraz, WhatsApp, Instagram, Facebook)
  location?: string; // Ubicación del cliente
  interest?: string; // Propiedad de interés del cliente
  budget?: string; // Presupuesto del cliente
}

@Component({
  selector: 'app-clients',
  imports: [
    PageBreadcrumbComponent,
    ReusableTableComponent,
  ],
  templateUrl: './clients.component.html',
  styles: ``
})
export class ClientsComponent {
  // Default clients data
  clientsData: Client[] = [
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "+52 555 123 4567",
      city: "Ciudad de México",
      status: "activo",
      loyaltyLevel: "gold",
      totalVisits: 15,
      totalSpent: "$450.00",
      image: "/images/user/user-17.jpg",
      channel: "Zonaprop",
      location: "Polanco, CDMX",
      interest: "Casa en Polanco",
      budget: "$2,500,000",
    },
    {
      id: 2,
      firstName: "Carlos",
      lastName: "García",
      email: "carlos.garcia@email.com",
      phone: "+52 555 234 5678",
      city: "Guadalajara",
      status: "reservado",
      loyaltyLevel: "silver",
      totalVisits: 8,
      totalSpent: "$240.00",
      image: "/images/user/user-18.jpg",
      channel: "MercadoLibre",
      location: "Centro, GDL",
      interest: "Departamento en Centro",
      budget: "$1,800,000",
    },
    {
      id: 3,
      firstName: "Miguel",
      lastName: "Rodríguez",
      email: "miguel.rodriguez@email.com",
      phone: "+52 555 345 6789",
      city: "Monterrey",
      status: "tasado",
      loyaltyLevel: "bronze",
      totalVisits: 3,
      totalSpent: "$90.00",
      image: "/images/user/user-19.jpg",
      channel: "Web Berraz",
      location: "San Pedro, MTY",
      interest: "Casa en San Pedro",
      budget: "$3,200,000",
    },
    {
      id: 4,
      firstName: "Luis",
      lastName: "Martínez",
      email: "luis.martinez@email.com",
      phone: "+52 555 456 7890",
      city: "Puebla",
      status: "inactivo",
      loyaltyLevel: "bronze",
      totalVisits: 1,
      totalSpent: "$30.00",
      image: "/images/user/user-20.jpg",
      channel: "WhatsApp",
      location: "Cholula, PUE",
      interest: "Terreno en Cholula",
      budget: "$850,000",
    },
    {
      id: 5,
      firstName: "Pedro",
      lastName: "López",
      email: "pedro.lopez@email.com",
      phone: "+52 555 567 8901",
      city: "Tijuana",
      status: "vendido",
      loyaltyLevel: "vip",
      totalVisits: 25,
      totalSpent: "$750.00",
      image: "/images/user/user-21.jpg",
      channel: "Instagram",
      location: "Zona Río, TIJ",
      interest: "Casa en Zona Río",
      budget: "$4,500,000",
    },
    {
      id: 6,
      firstName: "Roberto",
      lastName: "Hernández",
      email: "roberto.hernandez@email.com",
      phone: "+52 555 678 9012",
      city: "León",
      status: "suspendido",
      loyaltyLevel: "bronze",
      totalVisits: 2,
      totalSpent: "$60.00",
      image: "/images/user/user-22.jpg",
      channel: "Facebook",
      location: "Centro, LEÓN",
      interest: "Departamento en Centro",
      budget: "$1,200,000",
    },
    {
      id: 7,
      firstName: "Fernando",
      lastName: "Sánchez",
      email: "fernando.sanchez@email.com",
      phone: "+52 555 789 0123",
      city: "Querétaro",
      status: "uso_interno",
      loyaltyLevel: "silver",
      totalVisits: 5,
      totalSpent: "$150.00",
      image: "/images/user/user-17.jpg",
      channel: "Web Berraz",
      location: "Centro, QRO",
      interest: "Casa en Centro",
      budget: "$1,500,000",
    },
    {
      id: 8,
      firstName: "Jorge",
      lastName: "Torres",
      email: "jorge.torres@email.com",
      phone: "+52 555 890 1234",
      city: "Mérida",
      status: "borrador",
      loyaltyLevel: "bronze",
      totalVisits: 1,
      totalSpent: "$30.00",
      image: "/images/user/user-18.jpg",
      channel: "WhatsApp",
      location: "Norte, MER",
      interest: "Terreno en Norte",
      budget: "$600,000",
    },
    {
      id: 9,
      firstName: "Ricardo",
      lastName: "Flores",
      email: "ricardo.flores@email.com",
      phone: "+52 555 901 2345",
      city: "Cancún",
      status: "alquilado",
      loyaltyLevel: "gold",
      totalVisits: 12,
      totalSpent: "$360.00",
      image: "/images/user/user-19.jpg",
      channel: "Zonaprop",
      location: "Zona Hotelera, CAN",
      interest: "Departamento en Zona Hotelera",
      budget: "$3,800,000",
    },
    {
      id: 10,
      firstName: "Andrés",
      lastName: "Morales",
      email: "andres.morales@email.com",
      phone: "+52 555 012 3456",
      city: "Toluca",
      status: "retirado",
      loyaltyLevel: "bronze",
      totalVisits: 0,
      totalSpent: "$0.00",
      image: "/images/user/user-20.jpg",
      channel: "Instagram",
      location: "Centro, TOL",
      interest: "Casa en Centro",
      budget: "$1,100,000",
    },
  ];

  columns: Column<Client>[] = [];

  constructor(private router: Router) {
    this.initializeColumns();
  }

  private initializeColumns() {
    this.columns = [
      {
        key: "firstName",
        label: "Cliente",
        sortable: true,
        render: (item) => {
          const imageHtml = item.image
            ? `<div class="w-10 h-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <img width="40" height="40" src="${item.image}" alt="${item.firstName} ${item.lastName}" class="w-full h-full object-cover" />
              </div>`
            : '';
          const idPadded = item.id.toString().padStart(4, "0");
          return `
            <div class="flex items-center gap-3">
              ${imageHtml}
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  ${item.firstName} ${item.lastName}
                </span>
                <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                  ID: ${idPadded}
                </span>
              </div>
            </div>
          `;
        },
      },
      {
        key: "email",
        label: "Email",
        sortable: true,
        render: (item) => {
          return `<span class="text-gray-700 text-theme-sm dark:text-gray-300">${item.email}</span>`;
        },
      },
      {
        key: "phone",
        label: "Teléfono",
        sortable: true,
        render: (item) => {
          return `<span class="text-gray-700 text-theme-sm dark:text-gray-300">${item.phone}</span>`;
        },
      },
      {
        key: "channel",
        label: "Canal / Ubicación",
        sortable: true,
        subValue: "location" as keyof Client,
        formatValue: (value, item) => {
          if (!item.channel) return `<span class="text-gray-500 text-theme-sm">—</span>`;
          return `<span class="font-medium text-gray-800 text-theme-sm dark:text-white/90">${item.channel}</span>`;
        },
        formatSubValue: (value) => {
          if (!value) return null;
          const mapPinIcon = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/></svg>`;
          return `<span class="flex items-center gap-1.5 text-gray-500 text-theme-xs dark:text-gray-400">${mapPinIcon}${value}</span>`;
        },
      },
      {
        key: "status",
        label: "Estado",
        sortable: true,
        render: (item) => {
          const statusConfig: Record<string, { label: string; color: string; classes: string }> = {
            activo: { label: "Activo", color: "success", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" },
            reservado: { label: "Reservado", color: "warning", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400" },
            uso_interno: { label: "Uso Interno", color: "primary", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400" },
            borrador: { label: "Borrador", color: "warning", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400" },
            tasado: { label: "Tasado", color: "success", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" },
            alquilado: { label: "Alquilado", color: "success", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" },
            vendido: { label: "Vendido", color: "success", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" },
            retirado: { label: "Retirado", color: "error", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500" },
            suspendido: { label: "Suspendido", color: "error", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500" },
            inactivo: { label: "Inactivo", color: "error", classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500" },
          };
          const statusKey = item.status.toLowerCase();
          const config = statusConfig[statusKey] || statusConfig['activo'];
          return `<span class="${config.classes}">${config.label}</span>`;
        },
      },
      {
        key: "interest",
        label: "Interés / Presupuesto",
        sortable: true,
        subValue: "budget" as keyof Client,
        formatValue: (value, item) => {
          if (!item.interest) return `<span class="text-gray-500 text-theme-sm">—</span>`;
          const homeIcon = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"><path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          return `<span class="flex items-center gap-1.5 font-medium text-gray-800 text-theme-sm dark:text-white/90">${homeIcon}${item.interest}</span>`;
        },
        formatSubValue: (value) => {
          if (!value) return null;
          const dollarIcon = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          return `<span class="flex items-center gap-1.5 text-gray-500 text-theme-xs dark:text-gray-400">${dollarIcon}Presupuesto: ${value}</span>`;
        },
      },
    ];
  }

  handleExport(data: Client[]) {
    const headers = [
      "ID",
      "Nombre",
      "Apellido",
      "Email",
      "Teléfono",
      "Canal",
      "Ubicación",
      "Estado",
      "Interés",
      "Presupuesto",
    ];
    const csvData = data.map((client) => [
      client.id.toString(),
      client.firstName,
      client.lastName,
      client.email,
      client.phone,
      client.channel || "",
      client.location || "",
      client.status,
      client.interest || "",
      client.budget || "",
    ]);
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clientes-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleAdd() {
    this.router.navigate(["/clients/add"]);
  }

  renderActions(item: Client): string {
    const eyeIcon = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-4"><path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    return `
      <span class="inline-flex items-center gap-1.5">
        ${eyeIcon}
        <a href="/clients/${item.id}" class="text-gray-700 text-theme-sm dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 underline-offset-4 hover:underline cursor-pointer">
          Ver detalles
        </a>
      </span>
    `;
  }
}
