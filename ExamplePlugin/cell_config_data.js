//This file contains a list of all files that need to be loaded dynamically
//for this module. Every file in this list will be loaded after the module's Init()
//function is called
{
	files:["ExamplePlugin.js"],
	css:["ExamplePlugin.css"],
	config:{
		short_name: "Example",
		name: "Example Plugin #1",
		description: "This plugin cell demonstrates how to register a plugin",
		category:["plugin", "examples"],
		plugin: {
			isolateHtml: false,
			html: {
				source: 'injected_screens.html',
				mainDivId: 'ExamplePlugin-mainDiv'
				}
			}
		}
}
