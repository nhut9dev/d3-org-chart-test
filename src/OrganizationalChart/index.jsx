import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button, Select } from 'antd';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';

import NodeLayout from './components/NodeLayout';
import NODE_LAYOUT from './constants/nodeLayout';

import stylesModule from './OrganizationalChart.module.scss';
import ExpandButton from './components/ExpandButton';

const styles = {
	orgChart: {
		height: 'calc(100vh - 60px)',
		width: '100vw',
		backgroundColor: 'white'
	}
};

const OrganizationalChart = ({ data, ...props }) => {
	const d3Container = useRef(null);

	const [render, setRender] = useState(false);

	// chart state
	const [layout, setLayout] = useState('top');

	const [editingId, setEditingId] = useState(null);

	let chart = new OrgChart();

	useLayoutEffect(() => {
		if (data && d3Container.current && render) {
			chart
				.firstDraw(true)
				.container(d3Container.current)
				.data(data)
				.svgHeight(d3Container.current.offsetHeight)
				.initialZoom(0.75)

				.layout(layout)

				// size
				.childrenMargin(() => 70)
				.neighbourMargin(() => 20)
				.compactMarginBetween(() => 20)
				.compactMarginPair(() => 30)
				.siblingsMargin(() => 20)
				.nodeWidth(() => NODE_LAYOUT.WIDTH)
				.nodeHeight(() => NODE_LAYOUT.HEIGHT)
				// .nodeButtonHeight(() => 30)
				// .nodeButtonWidth(() => 30)

				// .initialExpandLevel(2)
				.expandAll()
				.onNodeClick((d) => {
					// console.log(d);
					// setEditingId(d.id);
				})

				.nodeContent((d) => {
					const n = ReactDOMServer.renderToString(
						<NodeLayout
							{...d}
							onDoubleClick={() => console.log('alooo')}
							editing={d.id === editingId}
						/>
					);
					return n;
				})
				.linkUpdate(function (d, i, arr) {
					d3.select(this)
						.attr('stroke', (d) =>
							d.data._upToTheRootHighlighted ? '#14760D' : '#2CAAE5'
						)
						.attr('stroke-width', (d) =>
							d.data._upToTheRootHighlighted ? 15 : 1
						);

					if (d.data._upToTheRootHighlighted) {
						d3.select(this).raise();
					}
				})
				.render();
		}
	}, [props, data, editingId, render, chart, layout]);

	useEffect(() => {
		if (!render) {
			setTimeout(() => {
				setRender(true);
			}, 1000);
		}
	}, [render]);

	return (
		<>
			<div style={{ display: 'flex', gap: 10 }}>
				<Button onClick={() => chart.exportImg({ scale: 10, full: true })}>
					Export Img
				</Button>

				<Button onClick={() => chart.fit()}>View full</Button>

				<Select
					value={layout}
					onChange={(value) => setLayout(value)}
					options={[
						{
							label: 'left',
							value: 'left'
						},
						{
							label: 'right',
							value: 'right'
						},
						{
							label: 'top',
							value: 'top'
						},
						{
							label: 'bottom',
							value: 'bottom'
						}
					]}
				></Select>
			</div>
			<div
				className={stylesModule.orgChart}
				style={styles.orgChart}
				ref={d3Container}
			></div>
		</>
	);
};

export default OrganizationalChart;
