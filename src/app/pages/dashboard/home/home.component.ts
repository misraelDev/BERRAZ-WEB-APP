import { Component } from '@angular/core';
import { RecentOrdersComponent } from '../../../shared/components/ecommerce/recent-orders/recent-orders.component';
import { EcommerceMetricsComponent } from '../../../shared/components/ecommerce/ecommerce-metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../../../shared/components/ecommerce/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '../../../shared/components/ecommerce/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '../../../shared/components/ecommerce/statics-chart/statics-chart.component';
import { MetricCardComponent, ChartDataPoint } from '../../../shared/components/cards/card-with-graph/metric-card/metric-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ReusableTableComponent } from '../../../shared/components/tables/reusable-table/reusable-table.component';
import { DemographicCardComponent } from '../../../shared/components/ecommerce/demographic-card/demographic-card.component';

@Component({
  selector: 'app-home',
  imports: [
    EcommerceMetricsComponent,
    MonthlySalesChartComponent,
    MonthlyTargetComponent,
    StatisticsChartComponent,
    DemographicCardComponent,
    RecentOrdersComponent,
    MetricCardComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  // Example data for charts
  leadsHoyData: ChartDataPoint[] = [
    { name: "Lun", value: 8 },
    { name: "Mar", value: 10 },
    { name: "Mié", value: 9 },
    { name: "Jue", value: 11 },
    { name: "Vie", value: 12 },
    { name: "Sáb", value: 11 },
    { name: "Dom", value: 12 },
  ];

  sinContactarData: ChartDataPoint[] = [
    { name: "Lun", value: 7 },
    { name: "Mar", value: 6 },
    { name: "Mié", value: 5 },
    { name: "Jue", value: 6 },
    { name: "Vie", value: 5 },
    { name: "Sáb", value: 4 },
    { name: "Dom", value: 5 },
  ];

  leadsActivosData: ChartDataPoint[] = [
    { name: "Lun", value: 85 },
    { name: "Mar", value: 87 },
    { name: "Mié", value: 88 },
    { name: "Jue", value: 86 },
    { name: "Vie", value: 89 },
    { name: "Sáb", value: 88 },
    { name: "Dom", value: 89 },
  ];

  leadsLatentesData: ChartDataPoint[] = [
    { name: "Lun", value: 210 },
    { name: "Mar", value: 212 },
    { name: "Mié", value: 211 },
    { name: "Jue", value: 213 },
    { name: "Vie", value: 212 },
    { name: "Sáb", value: 213 },
    { name: "Dom", value: 213 },
  ];

  propiedadesData: ChartDataPoint[] = [
    { name: "Lun", value: 1540 },
    { name: "Mar", value: 1542 },
    { name: "Mié", value: 1544 },
    { name: "Jue", value: 1545 },
    { name: "Vie", value: 1546 },
    { name: "Sáb", value: 1547 },
    { name: "Dom", value: 1547 },
  ];

  operacionesData: ChartDataPoint[] = [
    { name: "Lun", value: 10 },
    { name: "Mar", value: 11 },
    { name: "Mié", value: 10 },
    { name: "Jue", value: 12 },
    { name: "Vie", value: 11 },
    { name: "Sáb", value: 12 },
    { name: "Dom", value: 12 },
  ];
}
