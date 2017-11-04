import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';

import * as fromRoot from '../reducers';
import * as chartAction from './chart.action';

@Component({
  selector: 'iph-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, DoCheck {
  private series;
  private svg;
  private margin;
  private width;
  private height;
  private x;
  private y;
  private z;
  private category: String;
  private data: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    const newCategory = this.route.snapshot.params['category'];
    this.plotNewChart(newCategory);
  }

  ngDoCheck() {
    const newCategory = this.route.snapshot.params['category'];

    // Check if the category has changed.
    if (this.category !== newCategory) {
      this.plotNewChart(newCategory);
    }
  }

  private plotNewChart(newCategory) {
    this.category = newCategory;
    this.store.dispatch(new chartAction.ChartAction(this.category));
    this.store.select(fromRoot.getChartState).subscribe(
      res => {
        this.data = res;
        d3.selectAll('g').remove();
        this.preInitChart();
        this.initChart();
      }
    );
  }

  private preInitChart() {
    this.series = d3.stack()
      .keys(['max', 'min'])
      .offset(d3.stackOffsetDiverging)
      (this.data);

    this.svg = d3.select('svg');
    // this.margin = {top: 20, right: 30, bottom: 30, left: 60};
    this.margin = {top: 20, right: 60, bottom: 30, left: 30};
    this.width = this.svg.attr('width');
    this.height = this.svg.attr('height');

    this.x = d3.scaleBand()
      .domain(this.data.map((d) => String(d.id)))
      .rangeRound([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    // const min = Number(d3.min(this.series, this.stackMin));
    const min = Number(d3.min(this.series, this.stackMin)) - 4;
    // const max = Number(d3.max(this.series, this.stackMax));
    const max = Number(d3.max(this.series, this.stackMax)) + 4;
    this.y = d3.scaleLinear()
      .domain([min, max])
      .rangeRound([this.height - this.margin.bottom, this.margin.top]);

    this.z = d3.scaleOrdinal(d3.schemeCategory10);
  }

  private initChart() {
    this.svg.append('g')
      .selectAll('g')
      .data(this.series)
      .enter().append('g')
        .attr('fill', (d) => this.z(d.key))
      .selectAll('rect')
      .data((d) => d)
      .enter().append('rect')
        // .attr('width', this.x.bandwidth)
        // .attr('x', (d) => this.x(d.data.id))
        // .attr('y', (d) => this.y(d[1]))
        // .attr('height', (d) => (this.y(d[0]) - this.y(d[1])));

        .attr('width', (d) => (this.y(d[0]) - this.y(d[1])))
        .attr('x', (d) => this.y(d[1]))
        .attr('y', (d) => this.x(d.data.id))
        .attr('height', this.x.bandwidth);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.y(0)})`)
      // .call(d3.axisBottom(this.x));
      .call(d3.axisBottom(this.y));

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left} ,0)`)
      // .call(d3.axisLeft(this.y));
      .call(d3.axisLeft(this.x));
  }

  stackMin(serie) {
    return d3.min(serie, (d) => d[0]);
  }

  stackMax(serie) {
    return d3.max(serie, (d) => d[1]);
  }
}
