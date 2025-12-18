import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexTooltip,
  ApexStroke,
  ApexMarkers,
} from 'ng-apexcharts';
import { DropdownComponent } from '../../../ui/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../../ui/dropdown/dropdown-item/dropdown-item.component';
import { SafeHtmlPipe } from '../../../../pipe/safe-html.pipe';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface MetricCardProps {
  /** Título de la tarjeta */
  title: string;
  /** Valor principal a mostrar */
  value: string | number;
  /** Subtítulo o descripción */
  subtitle: string;
  /** Datos para el gráfico */
  chartData: ChartDataPoint[];
  /** Porcentaje de cambio (opcional) */
  change?: number;
  /** Tendencia: 'up' o 'down' */
  trend?: 'up' | 'down';
  /** Texto adicional para el cambio */
  changeText?: string;
  /** Color del gráfico (hex) */
  chartColor?: string;
}

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    DropdownComponent,
    DropdownItemComponent,
    SafeHtmlPipe,
  ],
  templateUrl: './metric-card.component.html',
  styles: ``,
})
export class MetricCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) chartData!: ChartDataPoint[];
  @Input() change?: number;
  @Input() trend: 'up' | 'down' = 'up';
  @Input() changeText = 'que la semana pasada';
  @Input() chartColor = '#3b82f6';

  isDropdownOpen = signal(false);

  // Icono de tres puntos horizontales
  horizontalDotsIcon = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z" fill="currentColor"></path></svg>`;

  // Computed para formatear el valor
  formattedValue = computed(() => {
    if (typeof this.value === 'number') {
      return this.value.toLocaleString('es-ES');
    }
    return this.value;
  });

  // Computed para calcular el dominio del eje Y
  yAxisDomain = computed(() => {
    const values = this.chartData.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.2 || 1;
    return [minValue - padding, maxValue + padding];
  });

  // Configuración del gráfico ApexCharts
  get chartSeries(): ApexAxisChartSeries {
    return [
      {
        name: 'Value',
        data: this.chartData.map((d) => d.value),
      },
    ];
  }

  get chart(): ApexChart {
    return {
      fontFamily: 'Outfit, sans-serif',
      type: 'line',
      height: 56, // h-14 = 56px
      width: 112, // w-28 = 112px
      toolbar: { show: false },
      sparkline: { enabled: true },
    };
  }

  get stroke(): ApexStroke {
    return {
      curve: 'monotoneCubic',
      width: 2,
      colors: [this.chartColor],
    };
  }

  get markers(): ApexMarkers {
    return {
      size: 3,
      colors: [this.chartColor],
      strokeColors: this.chartColor,
      strokeWidth: 2,
      hover: {
        size: 5,
      },
    };
  }

  get colors(): string[] {
    return [this.chartColor];
  }

  get xaxis(): ApexXAxis {
    return {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: this.chartData.map((d) => d.name),
    };
  }

  get yaxis(): ApexYAxis {
    const domain = this.yAxisDomain();
    return {
      show: false,
      min: domain[0],
      max: domain[1],
    };
  }

  grid: ApexGrid = {
    show: false,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  tooltip: ApexTooltip = {
    enabled: true,
    theme: 'light',
    style: {
      fontSize: '12px',
    },
    y: {
      formatter: (val: number) => String(val),
    },
  };

  toggleDropdown() {
    this.isDropdownOpen.update((value) => !value);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  get trendColor(): string {
    return this.trend === 'up' ? 'text-red-500' : 'text-green-500';
  }

  get trendSymbol(): string {
    return this.trend === 'up' ? '+' : '-';
  }
}

