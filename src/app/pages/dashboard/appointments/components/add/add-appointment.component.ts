import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Icons } from '../../../../../icons/icons.constants';
import { PageBreadcrumbComponent } from '../../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../../../shared/components/common/component-card/component-card.component';
import { LabelComponent } from '../../../../../shared/components/form/label/label.component';
import { InputFieldComponent } from '../../../../../shared/components/form/input/input-field.component';
import { TextAreaComponent } from '../../../../../shared/components/form/input/text-area.component';
import { SelectComponent, Option } from '../../../../../shared/components/form/select/select.component';
import { DatePickerComponent } from '../../../../../shared/components/form/date-picker/date-picker.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    TextAreaComponent,
    SelectComponent,
    DatePickerComponent,
    ButtonComponent,
  ],
  templateUrl: './add-appointment.component.html',
  styles: ``
})
export class AddAppointmentComponent {
  // Form data using signals
  formData = signal({
    // 1. Información básica
    title: '',
    appointmentType: '',
    description: '',
    
    // 2. Fecha y tiempo
    startDate: '',
    startTime: '',
    duration: '',
    endDate: '',
    endTime: '',
    allDay: false,
    
    // 3. Participantes
    clientId: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    responsibleAgent: '',
    otherAgents: [] as string[],
    
    // 4. Inmueble asociado
    propertyId: '',
    propertyAddress: '',
    propertyCode: '',
    propertyOwner: '',
    propertyAccess: '',
    
    // 5. Ubicación
    meetingLocation: '',
    mapUrl: '',
    modality: '',
    videoCallUrl: '',
    
    // 6. Recordatorios
    sendReminderToClient: false,
    agentReminderTimes: [] as string[],
    agentReminder: '',
    agentReminderTime: '',
    notifyByMethod: '',
    notifyBy: {
      email: false,
      whatsapp: false,
      sms: false,
    },
  });

  // Computed para calcular hora de fin
  calculatedEndTime = computed(() => {
    const startTime = this.formData().startTime;
    const duration = this.formData().duration;
    
    if (!startTime || !duration) return '';
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const durationMinutes = parseInt(duration) || 0;
    const totalMinutes = minutes + durationMinutes;
    const endHours = hours + Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
  });

  // Opciones para selects
  appointmentTypeOptions: Option[] = [
    { value: 'presencial', label: 'Visita presencial' },
    { value: 'telefonica', label: 'Llamada telefónica' },
    { value: 'videollamada', label: 'Videollamada' },
    { value: 'oficina', label: 'Reunión en oficina' },
    { value: 'otro', label: 'Otro' },
  ];

  clientOptions: Option[] = [
    { value: '1', label: 'Juan Pérez' },
    { value: '2', label: 'María García' },
    { value: '3', label: 'Carlos Rodríguez' },
    { value: '4', label: 'Ana Martínez' },
  ];

  agentOptions: Option[] = [
    { value: 'agent1', label: 'Agente 1' },
    { value: 'agent2', label: 'Agente 2' },
    { value: 'agent3', label: 'Agente 3' },
    { value: 'agent4', label: 'Agente 4' },
  ];

  propertyOptions: Option[] = [
    { value: 'prop1', label: 'Casa en Av. Principal 123' },
    { value: 'prop2', label: 'Departamento en Calle Secundaria 456' },
    { value: 'prop3', label: 'Oficina en Centro Comercial' },
  ];

  modalityOptions: Option[] = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'online', label: 'Online' },
  ];

  reminderTimeOptions: Option[] = [
    { value: '10min', label: '10 min antes' },
    { value: '30min', label: '30 min antes' },
    { value: '1hour', label: '1 hora antes' },
    { value: '24hours', label: '24 horas antes' },
    { value: 'custom', label: 'Personalizado' },
  ];

  agentReminderOptions: Option[] = [
    { value: 'yes', label: 'Sí' },
    { value: 'no', label: 'No' },
  ];

  notifyByOptions: Option[] = [
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'sms', label: 'SMS' },
    { value: 'all', label: 'Todos' },
  ];

  // Iconos SVG - Importados desde constantes reutilizables
  timeIcon = Icons.TimeIcon;
  closeIcon = Icons.CloseLineIcon;
  checkIcon = Icons.CheckLineIcon;

  constructor(private router: Router) {}

  // Generar URL de Google Maps automáticamente
  generateMapUrl(address: string): string {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  handleInputChange(field: string, value: string | number | boolean) {
    this.formData.update((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generar URL del mapa cuando cambia la ubicación
      if (field === 'meetingLocation' && typeof value === 'string') {
        updated.mapUrl = this.generateMapUrl(value);
      }
      
      return updated;
    });
  }

  handleSelectChange(field: string, value: string) {
    this.formData.update((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-cargar datos del cliente cuando se selecciona
      if (field === 'clientId') {
        const selectedClient = this.clientOptions.find((c) => c.value === value);
        if (selectedClient) {
          updated.clientName = selectedClient.label;
        }
      }
      
      // Auto-cargar datos de la propiedad cuando se selecciona
      if (field === 'propertyId') {
        const selectedProperty = this.propertyOptions.find((p) => p.value === value);
        if (selectedProperty) {
          updated.propertyAddress = selectedProperty.label;
        }
      }
      
      return updated;
    });
  }

  handleDateChange(event: any) {
    if (event && event.dateStr) {
      this.handleInputChange('startDate', event.dateStr);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Form data:', this.formData());
    // Aquí iría la lógica para guardar la cita
    // Después de guardar, redirigir a la lista de citas
    this.router.navigate(['/appointments']);
  }

  handleCancel() {
    this.router.navigate(['/appointments']);
  }
}

