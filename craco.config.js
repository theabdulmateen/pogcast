const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#75634F', '@link-color': '#75634F' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
