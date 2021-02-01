import * as d3 from 'd3';

export const drawTask = (config, viewData) => {
  /**
   * viewData:
   * [
   *   {
   *     name: string
   *     data: number
   *   }
   * ]
   */

  const {containerId, width, height, margin} = config;
  const svg = d3.select(containerId).append('svg').attr('width', width).attr('height', height);
  const ch = height - margin.top - margin.bottom;
  svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`).attr('class', 'chart-area');

  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(${margin.left}, ${margin.top + ch})`);

  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  updateTask(viewData, config, svg);

  return svg;
};

export const updateTask = (viewData, config, svg) => {
  const names = viewData.map(vd => vd.name);
  const {width, height, margin} = config;
  const cw = width - margin.left - margin.right;
  const ch = height - margin.top - margin.bottom;
  const xScale = d3.scaleBand().domain(names).range([0, cw]).paddingInner(0.5).paddingOuter(0.5);
  const yScale = d3.scaleLinear().domain([0, 1]).range([ch, 0]);
  const t = svg.transition().duration(500);
  const xAxisCall = d3.axisBottom(xScale);
  const yAxisCall = d3.axisLeft(yScale).ticks(5).tickFormat(d => `${(d*100).toFixed(0)}%`);

  svg.selectAll("g.y-axis")
    .call(yAxisCall)
    .selectAll('text').attr('text-anchor', 'end');

  svg.selectAll("g.x-axis")
    .call(xAxisCall)
    .selectAll('text').attr('text-anchor', 'middle');;

  const colorScale = d3.schemeCategory10;
  
  svg.selectAll('g.chart-area')
    .selectAll('text')
    .data(viewData, d => d)
    .join(
      enter => {
        enter.append('text')
        .text(d => `${(d.data*100).toFixed(2)}%`)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000000')
        .attr('fill-opacity', 0)
        .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr('y', ch)
        .call(enter => enter.transition(t)
          .attr('y', d => yScale(d.data)-10)
          .attr('fill-opacity', 1)
        );
      },
      update => {
        update.text(d => `${(d.data*100).toFixed(2)}%`)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000000')
        .attr('fill-opacity', 0)
        .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr('y', ch)
        .call(update => update.transition(t)
          .attr('y', d => yScale(d.data)-10)
          .attr('fill-opacity', 1)
        );
      },
      exit => {
        exit.call(exit => exit.transition(t)
          .attr('fill-opacity', 0)
          .attr('y', ch)
          .remove()
        );
      }
    );

    svg.selectAll('g.chart-area')
    .selectAll('rect')
    .data(viewData, d => d)
    .join(
      enter => {
        enter.append('rect')
        .attr('fill', (d, i) => colorScale[i])
        .attr('x', d => xScale(d.name))
        .attr('y', ch)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill-opacity', 0)
        .call(enter => enter.transition(t)
          .attr('y', d => yScale(d.data))
          .attr('height', d => ch - yScale(d.data))
          .attr('fill-opacity', 1)
        );
      },
      update => {
        update.attr('fill', (d, i) => colorScale[i])
        .attr('x', d => xScale(d.name))
        .attr('y', ch)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill-opacity', 0)
        .call(update => update.transition(t)
          .attr('y', d => yScale(d.data))
          .attr('height', d => ch - yScale(d.data))
          .attr('fill-opacity', 1)
        );
      },
      exit => {
        exit.call(exit => exit.transition(t)
          .attr('fill-opacity', 0)
          .attr('height', 0)
          .remove()
        );
      }
    );
}