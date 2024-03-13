import OrganizationalChart from './OrganizationalChart';
import { useState } from 'react';
import departmentListData from './OrganizationalChart/constants/departmentListData';
import _ from 'lodash';

function App() {
	const [data, setData] = useState(departmentListData);

	function flattenMyTree(tree) {
		function recurse(nodes, path) {
			return _.map(nodes, function (node) {
				var newPath = _.union(path, [node.name]);
				return [
					_.assign(
						{ pathname: newPath.join(' > '), level: path.length },
						_.omit(node, 'children')
					),
					recurse(node.children, newPath)
				];
			});
		}
		return _.flattenDeep(recurse(tree, []));
	}

	const convertedData = flattenMyTree(data);
	console.log('🚀 ~ App ~ convertedData:', convertedData);

	return (
		<>
			{/* <SimpleOrgChart data={employees} /> */}
			{/* <SimpleDataChart /> */}
			{/* <CustomContent /> */}
			{/* <NestedData /> */}
			{/* <StyledTree /> */}
			<OrganizationalChart data={convertedData} setData={setData} />
		</>
	);
}

export default App;
