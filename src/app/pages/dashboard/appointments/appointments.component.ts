import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReusableTableComponent, Column } from '../../../shared/components/tables/reusable-table/reusable-table.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';

/**
 * Interfaz que define la estructura de una cita
 */
export interface Appointment {
  id: number;
  title: string;
  appointmentType: string;
  clientName: string;
  responsibleAgent: string;
  startDate: string;
  startTime: string;
  duration: string;
  propertyAddress?: string;
  modality: string;
  status: string;
  agentReminder: string;
  agentReminderTime?: string;
  notifyByMethod?: string;
}

@Component({
  selector: 'app-appointments',
  imports: [
    PageBreadcrumbComponent,
    ReusableTableComponent,
  ],
  templateUrl: './appointments.component.html',
  styles: ``
})
export class AppointmentsComponent {
  // Datos por defecto de citas
  appointmentsData: Appointment[] = [
    {
      id: 1,
      title: "Visita a propiedad en Centro",
      appointmentType: "presencial",
      clientName: "Juan Pérez",
      responsibleAgent: "Agente 1",
      startDate: "2024-01-15",
      startTime: "10:00",
      duration: "60",
      propertyAddress: "Av. Principal 123, Centro",
      modality: "presencial",
      status: "confirmed",
      agentReminder: "yes",
      agentReminderTime: "30min",
      notifyByMethod: "whatsapp",
    },
    {
      id: 2,
      title: "Reunión para firma de contrato",
      appointmentType: "oficina",
      clientName: "María García",
      responsibleAgent: "Agente 2",
      startDate: "2024-01-15",
      startTime: "14:30",
      duration: "90",
      propertyAddress: "",
      modality: "oficina",
      status: "scheduled",
      agentReminder: "yes",
      agentReminderTime: "1hour",
      notifyByMethod: "email",
    },
    {
      id: 3,
      title: "Videollamada con cliente",
      appointmentType: "videollamada",
      clientName: "Carlos Rodríguez",
      responsibleAgent: "Agente 1",
      startDate: "2024-01-16",
      startTime: "16:00",
      duration: "30",
      propertyAddress: "",
      modality: "videollamada",
      status: "scheduled",
      agentReminder: "yes",
      agentReminderTime: "10min",
      notifyByMethod: "all",
    },
    {
      id: 4,
      title: "Inspección de propiedad",
      appointmentType: "presencial",
      clientName: "Ana Martínez",
      responsibleAgent: "Agente 3",
      startDate: "2024-01-17",
      startTime: "09:00",
      duration: "45",
      propertyAddress: "Calle Secundaria 456, Norte",
      modality: "presencial",
      status: "completed",
      agentReminder: "yes",
      agentReminderTime: "24hours",
      notifyByMethod: "whatsapp",
    },
    {
      id: 5,
      title: "Llamada de seguimiento",
      appointmentType: "telefonica",
      clientName: "Pedro López",
      responsibleAgent: "Agente 2",
      startDate: "2024-01-18",
      startTime: "11:00",
      duration: "20",
      propertyAddress: "",
      modality: "telefonica",
      status: "cancelled",
      agentReminder: "no",
      notifyByMethod: "sms",
    },
    {
      id: 6,
      title: "Presentación de oferta",
      appointmentType: "presencial",
      clientName: "Roberto Hernández",
      responsibleAgent: "Agente 1",
      startDate: "2024-01-19",
      startTime: "15:30",
      duration: "60",
      propertyAddress: "Boulevard Principal 789, Sur",
      modality: "presencial",
      status: "scheduled",
      agentReminder: "yes",
      agentReminderTime: "1hour",
      notifyByMethod: "email",
    },
  ];

  columns: Column<Appointment>[] = [];

  constructor(private router: Router) {
    this.initializeColumns();
  }

  private initializeColumns() {
    this.columns = [
      // Columna ID con render personalizado
      {
        key: "id",
        label: "ID",
        sortable: true,
        render: (item) => {
          const idPadded = item.id.toString().padStart(4, "0");
          return `<span class="font-medium text-gray-800 text-theme-sm dark:text-white/90">#${idPadded}</span>`;
        },
      },
      // Columna Título con render personalizado
      {
        key: "title",
        label: "Título / Motivo",
        sortable: true,
        render: (item) => {
          return `<span class="font-medium text-gray-800 text-theme-sm dark:text-white/90">${item.title}</span>`;
        },
      },
      // Columna Tipo con Badge
      {
        key: "appointmentType",
        label: "Tipo",
        sortable: true,
        render: (item) => {
          const typeConfig: Record<string, { label: string; color: string; classes: string }> = {
            presencial: { 
              label: "Visita presencial", 
              color: "primary",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
            },
            telefonica: { 
              label: "Llamada telefónica", 
              color: "warning",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
            },
            videollamada: { 
              label: "Videollamada", 
              color: "success",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
            },
            oficina: { 
              label: "Reunión en oficina", 
              color: "primary",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
            },
            otro: { 
              label: "Otro", 
              color: "warning",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
            },
          };
          const config = typeConfig[item.appointmentType] || typeConfig['otro'];
          return `<span class="${config.classes}">${config.label}</span>`;
        },
      },
      // Columna Cliente con subValue (Agente)
      {
        key: "clientName",
        label: "Cliente",
        sortable: true,
        subValue: "responsibleAgent" as keyof Appointment,
        subValueLabel: "Agente",
      },
      // Columna Fecha y Hora con render personalizado
      {
        key: "startDate",
        label: "Fecha y Hora",
        sortable: true,
        render: (item) => {
          const date = new Date(item.startDate);
          const formattedDate = date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const timeInfo = item.duration 
            ? `${item.startTime} (${item.duration} min)`
            : item.startTime;
          return `
            <div>
              <span class="block text-gray-700 text-theme-sm dark:text-gray-300">${formattedDate}</span>
              <span class="block text-gray-500 text-theme-xs dark:text-gray-400">${timeInfo}</span>
            </div>
          `;
        },
      },
      // Columna Modalidad/Ubicación
      {
        key: "propertyAddress",
        label: "Modalidad",
        sortable: true,
        render: (item) => {
          if (item.propertyAddress) {
            return `<span class="text-gray-700 text-theme-sm dark:text-gray-300">${item.propertyAddress}</span>`;
          }
          const modalityLabels: Record<string, string> = {
            videollamada: "Videollamada",
            telefonica: "Llamada telefónica",
            oficina: "Oficina",
            presencial: "Presencial",
          };
          const label = modalityLabels[item.modality] || item.modality;
          return `<span class="text-gray-700 text-theme-sm dark:text-gray-300">${label}</span>`;
        },
      },
      // Columna Estado con Badge
      {
        key: "status",
        label: "Estado",
        sortable: true,
        render: (item) => {
          const statusConfig: Record<string, { label: string; color: string; classes: string }> = {
            scheduled: { 
              label: "Programada", 
              color: "warning",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
            },
            confirmed: { 
              label: "Confirmada", 
              color: "success",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
            },
            in_progress: { 
              label: "En curso", 
              color: "success",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
            },
            completed: { 
              label: "Completada", 
              color: "success",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
            },
            cancelled: { 
              label: "Cancelada", 
              color: "error",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
            },
            no_show: { 
              label: "No asistió", 
              color: "error",
              classes: "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
            },
          };
          const config = statusConfig[item.status] || statusConfig['scheduled'];
          return `<span class="${config.classes}">${config.label}</span>`;
        },
      },
      // Columna Recordatorio con formatValue y formatSubValue
      {
        key: "agentReminder",
        label: "Recordatorio",
        sortable: true,
        subValue: "agentReminderTime" as keyof Appointment,
        formatValue: (value, item) => {
          const badgeClasses = item.agentReminder === "yes"
            ? "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
            : "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500";
          const label = item.agentReminder === "yes" ? "Sí" : "No";
          return `<span class="${badgeClasses}">${label}</span>`;
        },
        formatSubValue: (value, item) => {
          if (item.agentReminder === "yes" && value) {
            const timeLabels: Record<string, string> = {
              "10min": "10 min antes",
              "30min": "30 min antes",
              "1hour": "1 hora antes",
              "24hours": "24 horas antes",
              custom: "Personalizado",
            };
            const label = timeLabels[value as string] || (value as string);
            return label;
          }
          return null;
        },
      },
    ];
  }

  handleExport(data: Appointment[]) {
    const headers = [
      "ID",
      "Título / Motivo",
      "Tipo de Cita",
      "Cliente",
      "Agente Responsable",
      "Fecha",
      "Hora",
      "Duración (min)",
      "Ubicación",
      "Estado",
      "Recordatorio",
      "Tiempo Recordatorio",
      "Método Notificación",
    ];
    const csvData = data.map((appointment) => [
      appointment.id.toString(),
      appointment.title,
      appointment.appointmentType,
      appointment.clientName,
      appointment.responsibleAgent,
      appointment.startDate,
      appointment.startTime,
      appointment.duration || "",
      appointment.propertyAddress || appointment.modality,
      appointment.status,
      appointment.agentReminder,
      appointment.agentReminderTime || "",
      appointment.notifyByMethod || "",
    ]);
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `citas-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleAdd() {
    this.router.navigate(["/appointments/add"]);
  }
}
