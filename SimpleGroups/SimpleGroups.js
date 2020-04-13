/**
 * @author Tobias Muschialik
 * @version 0.0
 * @namespace i2b2.SimpleGroups
 */


// create the communicator Object
i2b2.SimpleGroups.communicator = i2b2.hive.communicatorFactory("CRC");

//This function is called after the main HTML is loaded
i2b2.SimpleGroups.Init = function(loadedDiv) {
	
}


//This function is called before the plugin is unloaded by the framework
i2b2.SimpleGroups.Unload = function() {
	return true;
}

var setName = "";
var conceptPath = "";
var patient_ids = "";

i2b2.SimpleGroups.updateSetName = function(id) {
	setName = document.getElementById(id).value;
}

i2b2.SimpleGroups.updatePath = function(id) {
	conceptPath = document.getElementById(id).value;
}

i2b2.SimpleGroups.updatePatientIds = function(id) {
	patient_ids = document.getElementById(id).value;
}

i2b2.SimpleGroups.sendRequest = function(body) {
	var url = window.location.host;
	const xhr = new XMLHttpRequest();

	xhr.onload = function(){
		//window.alert("Response Arrived");
	}

	xhr.open("POST", "/index.php");
	xhr.setRequestHeader("Content-type", "application/xml");
	xhr.send(body);
}

i2b2.SimpleGroups.buildQueryDefinition = function() {
	var d = "";
	var idSet = patient_ids.split(';')

	//query definition
	d += '<query_definition>\n';
	d += '<query_name>' + setName + '</query_name>\n';
	d += '<query_timing>ANY</query_timing>\n';
	d += '<specificity_scale>0</specificity_scale>\n';
	d += '<panel>\n';
	d += '\t<panel_number>1</panel_number>\n';
	d += '\t<panel_accuracy_scale>100</panel_accuracy_scale>\n';
	d += '\t<invert>0</invert>\n';
	d += '\t<panel_timing>ANY</panel_timing>\n';
	d += '\t<total_item_occurrences>1</total_item_occurrences>\n';

	for (index = 0; index < idSet.length; index++) {
		d += '\t<item>\n';
		d += '\t\t<hlevel></hlevel>\n';
		//d += '\t\t<item_name>' + idSet[index] + '</item_name>\n';
		d += '\t\t<item_name></item_name>\n';
		d += '\t\t<item_key>' + conceptPath + idSet[index] + '\\</item_key>\n';
		d += '\t\t<tooltip></tooltip>\n';
		d += '\t\t<class>ENC</class>\n';
		d += '\t\t<item_icon>FA</item_icon>\n';
		d += '\t\t<item_is_synonym>false</item_is_synonym>\n';
		d += '\t</item>\n';
	}

	d += '</panel>\n';
	d += '</query_definition>\n';

	return d;
}

i2b2.SimpleGroups.buildRequest = function() {
	var query_definition = i2b2.SimpleGroups.buildQueryDefinition();
	var params = {
		result_wait_time: i2b2.CRC.view.QT.params.queryTimeout,
		psm_query_definition: query_definition,
		psm_result_output: '<result_output_list><result_output priority_index="9" name="patientset"/>\n</result_output_list>\n'
	}
	this.callbackQuery = new i2b2_scopedCallback();
	this.callbackQuery.scope = this;
	this.callbackQuery.callback = function(results) {
		//window.alert("Callback called");
	}

	var message_header = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+
'<ns6:request xmlns:ns4="http://www.i2b2.org/xsd/cell/crc/psm/1.1/" xmlns:ns7="http://www.i2b2.org/xsd/cell/ont/1.1/" xmlns:ns3="http://www.i2b2.org/xsd/cell/crc/pdo/1.1/" xmlns:ns5="http://www.i2b2.org/xsd/hive/plugin/" xmlns:ns2="http://www.i2b2.org/xsd/hive/pdo/1.1/" xmlns:ns6="http://www.i2b2.org/xsd/hive/msg/1.1/" xmlns:ns8="http://www.i2b2.org/xsd/cell/crc/psm/querydefinition/1.1/">\n'+
'	<message_header>\n'+
'		{{{proxy_info}}}\n'+
'		<sending_application>\n'+
'			<application_name>i2b2_QueryTool</application_name>\n'+
'			<application_version>' + i2b2.ClientVersion + '</application_version>\n'+
'		</sending_application>\n'+
'		<sending_facility>\n'+
'			<facility_name>PHS</facility_name>\n'+
'		</sending_facility>\n'+
'		<receiving_application>\n'+
'			<application_name>i2b2_DataRepositoryCell</application_name>\n'+
'			<application_version>' + i2b2.ClientVersion + '</application_version>\n'+
'		</receiving_application>\n'+
'		<receiving_facility>\n'+
'			<facility_name>PHS</facility_name>\n'+
'		</receiving_facility>\n'+
'		<security>\n'+
'			<domain>{{{sec_domain}}}</domain>\n'+
'			<username>{{{sec_user}}}</username>\n'+
'			{{{sec_pass_node}}}\n'+
'		</security>\n'+
'		<message_type>\n'+
'			<message_code>Q04</message_code>\n'+
'			<event_type>EQQ</event_type>\n'+
'		</message_type>\n'+
'		<message_control_id>\n'+
'			<message_num>{{{header_msg_id}}}</message_num>\n'+
'			<instance_num>0</instance_num>\n'+
'		</message_control_id>\n'+
'		<processing_id>\n'+
'			<processing_id>P</processing_id>\n'+
'			<processing_mode>I</processing_mode>\n'+
'		</processing_id>\n'+
'		<accept_acknowledgement_type>messageId</accept_acknowledgement_type>\n'+
'		<project_id>{{{sec_project}}}</project_id>\n'+
'	</message_header>\n'+
'	<request_header>\n'+
'		<result_waittime_ms>{{{result_wait_time}}}000</result_waittime_ms>\n'+
'	</request_header>\n'+
'	<message_body>\n'+
'		<ns4:psmheader>\n'+
'			<user group="{{{sec_project}}}" login="{{{sec_user}}}">{{{sec_user}}}</user>\n'+
'			<patient_set_limit>0</patient_set_limit>\n'+
'			<estimated_time>0</estimated_time>\n'+
'			<query_mode>optimize_without_temp_table</query_mode>\n'+
'			<request_type>CRC_QRY_runQueryInstance_fromQueryDefinition</request_type>\n'+
'		</ns4:psmheader>\n'+
'		<ns4:request xsi:type="ns4:query_definition_requestType" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n'+
'			{{{psm_query_definition}}}\n'+
'			{{{psm_result_output}}}\n'+
'		</ns4:request>\n'+
'		{{{shrine_topic}}}\n'+
'	</message_body>\n'+
'</ns6:request>\n';
	//window.alert("before communicator call");
	i2b2.SimpleGroups.communicator._addFunctionCall(	"runQueryInstance_fromQueryDefinition", 
								"{{{URL}}}request", 
								message_header, 
								["psm_result_output","psm_query_definition","shrine_topic"]);

	i2b2.SimpleGroups.communicator.runQueryInstance_fromQueryDefinition("CRC:QueryTool", params, this.callbackQuery);
	//window.alert("after communicator call");
}

i2b2.SimpleGroups.submit = function() {
	//window.alert("submitting: " + patient_ids);
	i2b2.SimpleGroups.buildRequest();
}