import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';

import * as fromRoot from '../reducers';

@Component({
  selector: 'iph-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, DoCheck, AfterViewInit {
  private series;
  private svg;
  private margin;
  private width;
  private height;
  private x;
  private y;
  private z;
  private category: String;
  private data = [
    {month: 12016, max: 3840, min: -400},
    {month: 22016, max: 1600, min: -400},
    {month: 32016, max:  640, min: -600},
    {month: 42016, max:  320, min: -400}
  ];

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const newCategory = this.route.snapshot.params['category'];
    this.category = newCategory;
  }

  ngDoCheck() {
    const newCategory = this.route.snapshot.params['category'];

    // Check if the category has changed.
    if (this.category !== newCategory) {
      this.category = newCategory;
      this.data = [
        {month: 52016, max: 40, min: -0},
        {month: 62016, max: 16000, min: -4000},
        {month: 72016, max:  40, min: -800},
        {month: 82016, max:  20, min: -40}
      ];

      d3.selectAll('g').remove();
      this.preInitChart();
      this.initChart();
    }
  }

  ngAfterViewInit() {
    this.preInitChart();
    this.initChart();
  }

  private preInitChart() {
    this.series = d3.stack()
      .keys(['max', 'min'])
      .offset(d3.stackOffsetDiverging)
      (this.data);

    this.svg = d3.select('svg');
    this.margin = {top: 20, right: 30, bottom: 30, left: 60};
    this.width = this.svg.attr('width');
    this.height = this.svg.attr('height');

    this.x = d3.scaleBand()
      .domain(this.data.map((d) => { return String(d.month); }))
      .rangeRound([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    const min = Number(d3.min(this.series, this.stackMin));
    const max = Number(d3.max(this.series, this.stackMax));
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
        .attr('fill', (d) => { return this.z(d.key); })
      .selectAll('rect')
      .data((d) => { return d; })
      .enter().append('rect')
        .attr('width', this.x.bandwidth)
        .attr('x', (d) => { return this.x(d.data.month); })
        .attr('y', (d) => { return this.y(d[1]); })
        .attr('height', (d) => { return this.y(d[0]) - this.y(d[1]); })

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(d3.axisBottom(this.x));

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left} ,0)`)
      .call(d3.axisLeft(this.y));
  }

  stackMin(serie) {
    return d3.min(serie, (d) => { return d[0]; });
  }

  stackMax(serie) {
    return d3.max(serie, (d) => { return d[1]; });
  }
}
