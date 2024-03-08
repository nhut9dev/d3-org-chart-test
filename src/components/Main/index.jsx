import { useLayoutEffect } from 'react';
import departmentsData from './constants/departmentsData';
import { useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

const styles = {
	orgChart: {
		height: 'calc(100vh - 60px)',
		backgroundColor: '#eaeaea'
	}
};

const OrganizationalChart = ({ data, ...props }) => {
	const d3Container = useRef(null);

	useLayoutEffect(() => {
		const chart = new OrgChart();

		chart
			.container(d3Container.current)
			.svgHeight(window.innerHeight - 10)
			.data(departmentsData)
			.nodeHeight((d) => 170)
			.nodeWidth((d) => {
				if (d.depth == 0) return 500;
				return 330;
			})
			.childrenMargin((d) => 90)
			.compactMarginBetween((d) => 65)
			.compactMarginPair((d) => 100)
			.neighbourMargin((a, b) => 50)
			.siblingsMargin((d) => 100)
			.buttonContent(({ node, state }) => {
				return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${
					node.children
						? `<i class="fas fa-angle-up"></i>`
						: `<i class="fas fa-angle-down"></i>`
				}</span> ${node.data._directSubordinates}  </div>`;
			})
			// .linkUpdate(function (d, i, arr) {
			// 	d3.select(this)
			// 		.attr('stroke', (d) =>
			// 			d.data._upToTheRootHighlighted ? '#14760D' : '#2CAAE5'
			// 		)
			// 		.attr('stroke-width', (d) =>
			// 			d.data._upToTheRootHighlighted ? 15 : 1
			// 		);

			// 	if (d.data._upToTheRootHighlighted) {
			// 		d3.select(this).raise();
			// 	}
			// })
			// 		.nodeContent(function (d, i, arr, state) {
			// 			const svgStr = `<svg width=150 height=75  style="background-color:none"> <path d="M 0,15 L15,0 L135,0 L150,15 L150,60 L135,75 L15,75 L0,60" fill="#2599DD" stroke="#2599DD"/> </svg>`;
			// 			return `
			//                   <div class="left-top" style="position:absolute;left:-10px;top:-10px">  ${svgStr}</div>
			//                   <div class="right-top" style="position:absolute;right:-10px;top:-10px">  ${svgStr}</div>
			//                   <div class="right-bottom" style="position:absolute;right:-10px;bottom:-14px">  ${svgStr}</div>
			//                   <div class="left-bottom" style="position:absolute;left:-10px;bottom:-14px">  ${svgStr}</div>
			//                   <div style="font-family: 'Inter'; background-color:#040910;sans-serif; position:absolute;margin-top:-1px; margin-left:-1px;width:${
			// 										d.width
			// 									}px;height:${d.height}px;border-radius:0px;border: 2px solid #2CAAE5">

			//                      <div class="pie-chart-wrapper" style="margin-left:-10px;margin-top:5px;width:320px;height:300px"></div>

			//                     <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
			//                       <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> ${
			// 												d.data.name
			// 											} </div>
			//                       <div style="font-size:10px;"> ${
			// 												d.data.positionName || ''
			// 											} </div>
			//                       <div style="font-size:10px;"> ${d.data.id || ''} </div>
			//                       ${
			// 												d.depth == 0
			// 													? `                              <br/>
			//                       <div style="max-width:200px;font-size:10px;">
			//                         A corporate history of Ian is a chronological account of a business or other co-operative organization he founded.  <br><br>Usually it is produced in written format but it can also be done in audio or audiovisually
			//                       </div>`
			// 													: ''
			// 											}

			//                     </div>

			//                     <div style="position:absolute;left:-5px;bottom:10px;">
			//                       <div style="font-size:10px;color:#2CAAE5;margin-left:20px;margin-top:32px"> Progress </div>
			//                       <div style="color:#2CAAE5;margin-left:20px;margin-top:3px;font-size:10px;">
			//                         <svg width=150 height=30> ${d.data.progress
			// 													.map((h, i) => {
			// 														return `<rect  width=10 x="${
			// 															i * 12
			// 														}" height=${h}  y=${30 - h} fill="#B41425"/>`;
			// 													})
			// 													.join('')}  </svg>
			//                         </div>
			//                     </div>
			//                   </div>

			// `;
			// 		})
			// .nodeUpdate(function (d, i, arr) {
			// 	d3.select(this)
			// 		.select('.node-rect')
			// 		.attr('stroke', (d) =>
			// 			d.data._highlighted || d.data._upToTheRootHighlighted
			// 				? '#14760D'
			// 				: 'none'
			// 		)
			// 		.attr(
			// 			'stroke-width',
			// 			d.data._highlighted || d.data._upToTheRootHighlighted ? 40 : 1
			// 		);

			// 	const pieChartWrapperNode = d3
			// 		.select(this)
			// 		.select('.pie-chart-wrapper')
			// 		.node();
			// 	const val = (d.data.name.length * 5) % 100; // Dummy calc
			// 	// General pie chart invokation code

			// })
			.render();
	}, []);
	return <div style={styles.orgChart} ref={d3Container} />;
};

export default OrganizationalChart;
