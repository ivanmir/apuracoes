sap.ui.controller("Apuracoes.ext.controller.ListReportExt", {

	onInit: function() {},

	onInitSmartFilterBarExtension: function(oEvent) {},

	getCustomAppStateDataExtension: function(oCustomData) {},

	restoreCustomAppStateDataExtension: function(oCustomData) {},

	onBeforeRebindTableExtension: function(oEvent) {

		/*
		 * Reusable vars 
		 */
		var oBindingParams = oEvent.getParameter("bindingParams");
		oBindingParams.parameters = oBindingParams.parameters || {};

		var oSmartTable = oEvent.getSource();
		var oTable = oSmartTable.getTable();
		var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());

		/*
		 * Get the 1st column and format the text in a certain pattern 
		 */
		var oCol = oTable.getColumns()[0];
		if (oCol instanceof sap.ui.table.AnalyticalColumn) {

			var oCustomData = oCol.data('p13nData');
			var fDateFormatter = sap.ui.core.format.DateFormat.getInstance({
				//style: 'full',
				pattern: "dd/MM/yyyy"
			});

			if (oCustomData && oCustomData.type === "date") {
				//if (oCustomData) {
				oCol.setGroupHeaderFormatter(
					function(date) {
						return fDateFormatter.format(date);
					}
				);

			}
		}
		/*
		 * Get the custom filter selection and add it as filter to the model 
		 */
/*		 var oSearchValidFrom = this.byId("DT_INI_PERIODO");
		 var oCustomControl1 = oSmartFilterBar.getControlByKey("DT_INI_PERIODO");
		 var sDate = fDateFormatter.format(oCustomControl1.getDateValue(), false);
		 if (oSearchValidFrom && oSearchValidFrom.getDateValue()) {
			oBindingParams.filters.push(new sap.ui.model.Filter("DT_INI_PERIODO", "EQ", sDate));
		}*/
		 
		/*
		 * Get the custom filter selection and add it as filter to the model 
		 */
		var vCategory;
		if (oSmartFilterBar instanceof sap.ui.comp.smartfilterbar.SmartFilterBar) {
			//Custom filter: ID_IMPOSTO
			var oCustomControl = oSmartFilterBar.getControlByKey("ID_IMPOSTO");
			if (oCustomControl instanceof sap.m.ComboBox) {
				vCategory = oCustomControl.getSelectedKey();
				switch (vCategory) {
					case "0":
						oBindingParams.filters.push(new sap.ui.model.Filter("ID_IMPOSTO", "EQ", "1"));
						break;
					case "1":
						oBindingParams.filters.push(new sap.ui.model.Filter("ID_IMPOSTO", "EQ", "2"));
						break;
					default:
						break;
				}
			}
		}

	},

	onClickActionApuracoes1: function(oEvent) {}
});