import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';
import { Icons } from '../../../../icons/icons.constants';

/**
 * Interfaz para definir las columnas de la tabla
 * 
 * @example
 * // Ejemplo básico: Columna simple
 * {
 *   key: "name",
 *   label: "Nombre",
 *   sortable: true
 * }
 * 
 * @example
 * // Ejemplo con render personalizado: Columna con Badge
 * {
 *   key: "status",
 *   label: "Estado",
 *   sortable: true,
 *   render: (item) => {
 *     return `<app-badge color="${item.status === 'active' ? 'success' : 'error'}">${item.status}</app-badge>`;
 *   }
 * }
 * 
 * @example
 * // Ejemplo con subValue: Mostrar dos valores en una columna
 * {
 *   key: "clientName",
 *   label: "Cliente",
 *   sortable: true,
 *   subValue: "responsibleAgent", // Muestra el agente debajo del cliente
 *   subValueLabel: "Agente" // Opcional: etiqueta antes del valor secundario
 * }
 * 
 * @example
 * // Ejemplo con formatValue y formatSubValue: Formatear valores con componentes
 * {
 *   key: "agentReminder",
 *   label: "Recordatorio",
 *   sortable: true,
 *   subValue: "agentReminderTime",
 *   formatValue: (value, item) => {
 *     return `<app-badge color="${item.agentReminder === 'yes' ? 'success' : 'error'}">${item.agentReminder === 'yes' ? 'Sí' : 'No'}</app-badge>`;
 *   },
 *   formatSubValue: (value, item) => {
 *     if (item.agentReminder === 'yes' && value) {
 *       return `Tiempo: ${value}`;
 *     }
 *     return null;
 *   }
 * }
 */
export interface Column<T> {
  /** Clave única del campo en el objeto de datos */
  key: string;
  /** Etiqueta que se muestra en el encabezado de la columna */
  label: string;
  /** Si es true, permite ordenar la columna al hacer clic en el encabezado */
  sortable?: boolean;
  /** Función personalizada para renderizar el contenido de la celda. Si se proporciona, tiene prioridad sobre formatValue y subValue */
  render?: (item: T) => string;
  /** Clase CSS opcional para personalizar el estilo de la columna */
  className?: string;
  
  // ===== PROPS PARA MOSTRAR MÚLTIPLES VALORES EN UNA COLUMNA =====
  
  /** Clave del campo secundario a mostrar debajo del valor principal. 
   * Útil para mostrar información relacionada en la misma celda.
   * Ejemplo: Mostrar "Agente" debajo de "Cliente" */
  subValue?: keyof T;
  /** Etiqueta opcional que se muestra antes del valor secundario.
   * Ejemplo: "Agente: Juan Pérez" en lugar de solo "Juan Pérez" */
  subValueLabel?: string;
  /** Clase CSS opcional para personalizar el estilo del valor secundario */
  subValueClassName?: string;
  
  // ===== FUNCIONES PARA FORMATEAR VALORES =====
  
  /** Función para formatear el valor principal de la columna.
   * Útil cuando necesitas mostrar componentes (Badges, íconos, etc.) en lugar del valor crudo.
   * Solo se usa si NO hay una función `render` definida.
   * @param value - El valor del campo (item[key])
   * @param item - El objeto completo del registro
   * @returns string - El HTML o texto a mostrar
   */
  formatValue?: (value: unknown, item: T) => string | null;
  /** Función para formatear el valor secundario (subValue).
   * Útil para transformar o formatear el valor secundario antes de mostrarlo.
   * @param value - El valor del campo secundario (item[subValue])
   * @param item - El objeto completo del registro
   * @returns string | null - El HTML o texto a mostrar (puede ser null para ocultar)
   */
  formatSubValue?: (value: unknown, item: T) => string | null;
}

/**
 * Props del componente ReusableTable
 * 
 * @example
 * <app-reusable-table
 *   [data]="appointments"
 *   [columns]="columns"
 *   [searchKeys]="['title', 'clientName']"
 *   searchPlaceholder="Buscar citas..."
 *   (onAdd)="handleAdd()"
 *   (onExport)="handleExport($event)"
 *   title="Citas"
 *   addButtonLabel="Nueva Cita"
 * />
 */
export interface ReusableTableProps<T extends { id: string | number }> {
  /** Array de datos a mostrar en la tabla. Cada objeto debe tener un campo `id` único */
  data: T[];
  /** Array de definiciones de columnas. Ver la interfaz `Column` para más detalles */
  columns: Column<T>[];
  /** Array de claves de campos por los que se puede buscar. Si está vacío, se oculta el buscador */
  searchKeys?: (keyof T)[];
  /** Texto placeholder del campo de búsqueda */
  searchPlaceholder?: string;
  /** Función que se ejecuta al hacer clic en el botón de exportar. Recibe los datos filtrados y ordenados */
  onExport?: (data: T[]) => void;
  /** Función que se ejecuta al hacer clic en el botón de agregar */
  onAdd?: () => void;
  /** Texto del botón de agregar */
  addButtonLabel?: string;
  /** Texto del botón de exportar */
  exportButtonLabel?: string;
  /** Título que se muestra en el encabezado de la tabla */
  title?: string;
  /** Si es true, oculta el encabezado completo (buscador y botones) */
  hideHeader?: boolean;
  /** Si es true, oculta la paginación */
  hidePagination?: boolean;
  /** Función para renderizar acciones personalizadas en cada fila (editar, eliminar, etc.) */
  renderActions?: (item: T) => string;
  /** Etiqueta de la columna de acciones */
  actionsLabel?: string;
}

type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [
    CommonModule,
    SafeHtmlPipe,
  ],
  templateUrl: './reusable-table.component.html',
  styles: ``,
})
export class ReusableTableComponent<T extends { id: string | number }> {
  @Input({ required: true }) data!: T[];
  @Input({ required: true }) columns!: Column<T>[];
  @Input() searchKeys: (keyof T)[] = [];
  @Input() searchPlaceholder = 'Buscar...';
  @Input() addButtonLabel = 'Nuevo';
  @Input() exportButtonLabel = 'Exportar';
  @Input() title?: string;
  @Input() hideHeader = false;
  @Input() hidePagination = false;
  @Input() actionsLabel = 'Acciones';
  @Input() renderActions?: (item: T) => string;
  @Input() onExport?: (data: T[]) => void;
  @Input() onAdd?: () => void;

  @Output() exportEvent = new EventEmitter<T[]>();
  @Output() addEvent = new EventEmitter<void>();

  // Signals para el estado
  currentPage = signal(1);
  itemsPerPage = signal(10);
  searchTerm = signal('');
  sortKey = signal<string | null>(null);
  sortDirection = signal<SortDirection>(null);

  // Iconos SVG - Importados desde constantes reutilizables
  searchIcon = Icons.SearchIcon;
  plusIcon = Icons.PlusIcon;
  downloadIcon = Icons.DownloadIcon;
  chevronLeftIcon = Icons.ChevronLeftIcon;
  chevronRightIcon = Icons.ChevronRightIcon;
  arrowUpDownIcon = Icons.ArrowUpDownIcon;
  arrowUpIcon = Icons.ArrowUpIcon;
  arrowDownIcon = Icons.ArrowDownIcon;

  constructor(private router: Router) {}

  // Computed para datos filtrados
  filteredData = computed(() => {
    const term = this.searchTerm();
    const keys = this.searchKeys;
    
    if (!term || keys.length === 0) return this.data;

    return this.data.filter((item) => {
      return keys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(term);
        }
        return false;
      });
    });
  });

  // Computed para datos ordenados
  sortedData = computed(() => {
    const filtered = this.filteredData();
    const key = this.sortKey();
    const direction = this.sortDirection();

    if (!key || !direction) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[key];
      const bVal = (b as Record<string, unknown>)[key];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  });

  // Computed para todas las columnas (incluyendo acciones si existe)
  allColumns = computed(() => {
    const cols = [...this.columns];
    if (this.renderActions) {
      cols.push({
        key: 'actions',
        label: this.actionsLabel,
        sortable: false,
        render: this.renderActions,
      } as Column<T>);
    }
    return cols;
  });

  // Computed para datos paginados
  paginatedData = computed(() => {
    const sorted = this.sortedData();
    const page = this.currentPage();
    const perPage = this.itemsPerPage();
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sorted.slice(startIndex, endIndex);
  });

  // Computed para total de páginas
  totalPages = computed(() => {
    return Math.ceil(this.sortedData().length / this.itemsPerPage());
  });

  handleSort(key: string) {
    const currentKey = this.sortKey();
    const currentDirection = this.sortDirection();

    if (currentKey === key) {
      if (currentDirection === 'asc') {
        this.sortDirection.set('desc');
      } else if (currentDirection === 'desc') {
        this.sortKey.set(null);
        this.sortDirection.set(null);
      } else {
        this.sortDirection.set('asc');
      }
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1);
  }

  handleItemsPerPageChange(value: string) {
    this.itemsPerPage.set(Number(value));
    this.currentPage.set(1);
  }

  handleExportCSV() {
    const sorted = this.sortedData();
    
    if (this.onExport) {
      this.onExport(sorted);
      this.exportEvent.emit(sorted);
      return;
    }

    // Exportación por defecto a CSV
    const cols = this.allColumns().filter((col) => col.key !== 'actions');
    const headers = cols.map((col) => col.label);
    const csvData = sorted.map((item) =>
      cols.map((col) => {
        const value = (item as Record<string, unknown>)[col.key];
        return value?.toString() || '';
      })
    );
    const csvContent = [headers, ...csvData].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.title || 'tabla'}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.exportEvent.emit(sorted);
  }

  handleAdd() {
    if (this.onAdd) {
      this.onAdd();
      this.addEvent.emit();
    } else {
      this.router.navigate([window.location.pathname + '/add']);
      this.addEvent.emit();
    }
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  getSortIcon(columnKey: string): string {
    const key = this.sortKey();
    const direction = this.sortDirection();

    if (key === columnKey) {
      return direction === 'asc' ? this.arrowUpIcon : this.arrowDownIcon;
    }
    return this.arrowUpDownIcon;
  }

  getCellValue(column: Column<T>, item: T): string {
    if (column.render) {
      return column.render(item);
    }

    const value = (item as Record<string, unknown>)[column.key];
    
    if (column.formatValue) {
      return column.formatValue(value, item) || '';
    }

    return String(value || '');
  }

  getFormattedValue(column: Column<T>, item: T): string {
    const value = (item as Record<string, unknown>)[column.key];
    if (column.formatValue) {
      return column.formatValue(value, item) || '';
    }
    return String(value || '');
  }

  getRawValue(column: Column<T>, item: T): string {
    const value = (item as Record<string, unknown>)[column.key];
    return String(value || '');
  }

  getSubValue(column: Column<T>, item: T): string | null {
    if (!column.subValue) return null;

    const subValue = (item as Record<string, unknown>)[String(column.subValue)];
    
    if (!subValue) return null;

    if (column.formatSubValue) {
      return column.formatSubValue(subValue, item);
    }

    const label = column.subValueLabel ? `${column.subValueLabel}: ` : '';
    return label + String(subValue);
  }

  previousPage() {
    this.currentPage.update((prev) => Math.max(1, prev - 1));
  }

  nextPage() {
    this.currentPage.update((prev) => Math.min(this.totalPages(), prev + 1));
  }
}

// Named export for compatibility
export { ReusableTableComponent as DataTableComponent };

