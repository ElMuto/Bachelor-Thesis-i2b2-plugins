// This file contains a list of all files that need to be loaded dynamically 
// for this module. Every file in this list will be loaded after the module's Init() 
// function is called 
{
	files:["SimpleGroups.js"],
	css:["main_style.css"],
	config: {
		//additional configuration variables that are set by the system
		short_name: "Simple Groups",
		name: "Simple Patient Group Creation",
		description: "This plugin allows the creation of Patient Groups by entering a list of Pseudonyms.",
		category: ["plugin","community"],
		plugin: {
			isolateHtml: false,
			html: {
				source: 'main_window.html',
				mainDivId: 'SG-main'
				}
			}
		}
}