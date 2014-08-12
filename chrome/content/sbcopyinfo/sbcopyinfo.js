var sbCopyInfoService = {

	template : "",
	folderPath : [],

	exec : function(aRes, aRecursive)
	{
		if ( !("sbTreeHandler" in window) || !("flattenResources" in sbDataSource) )
		{
			return alert("ScrapBook X CopyPageInfo ERROR: Please upgrade ScrapBook to 1.0.6 or later.");
		}
		try {
			this.template = sbCommonUtils.PREF.getComplexValue("scrapbook.copyPageInfo", Components.interfaces.nsISupportsString).data;
		} catch(ex) {
			this.template = "%TITLE%\n%SOURCE%\n";
		}
		if ( !this.template.match(/\n$/) ) txt += "\n";
		if ( !aRes ) aRes = sbController.isTreeContext ? sbTreeHandler.resource : sbListHandler.resource;
		this.folderPath = [];
		var tmpRes = aRes;
		for ( var i = 0; i < 32; i++ )
		{
			tmpRes = sbDataSource.findParentResource(tmpRes);
			if ( !tmpRes || tmpRes.Value == "urn:scrapbook:root" ) break;
			this.folderPath.unshift(sbDataSource.getProperty(tmpRes, "title"));
		}
		var txt = "";
		if ( sbDataSource.isContainer(aRes) )
			txt += this.processFolderRecursively(aRes, aRecursive);
		else
			txt += this.getPageInfo(aRes);
		txt = txt.replace(/%TAB%/g, "\t");
		try {
			const CLIPBOARD = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
			CLIPBOARD.copyString(txt);
		} catch(ex) {
			alert("ScrapBook X CopyPageInfo ERROR: Failed to set text to clipboard.\n" + ex);
		}
	},

	processFolderRecursively : function(aRes, aRecursive)
	{
		var txt = "";
		if ( aRes.Value != "urn:scrapbook:root" ) this.folderPath.push(sbDataSource.getProperty(aRes, "title"));
		sbCommonUtils.RDFC.Init(sbDataSource.data, aRes);
		var resEnum = sbCommonUtils.RDFC.GetElements();
		while ( resEnum.hasMoreElements() )
		{
			var res = resEnum.getNext();
			if ( sbDataSource.isContainer(res) ) {
				if ( aRecursive ) txt += this.processFolderRecursively(res, aRecursive);
			} else {
				txt += this.getPageInfo(res);
			}
		}
		if ( aRes.Value != "urn:scrapbook:root" ) this.folderPath.pop();
		return txt;
	},

	getPageInfo : function(aRes)
	{
		var txt = this.template;
		var biblocal;
		var bibtitle;
		txt = txt.replace(/%ID%/g,      sbDataSource.getProperty(aRes, "id"));
		txt = txt.replace(/%TITLE%/g,   sbDataSource.getProperty(aRes, "title"));
		txt = txt.replace(/%SOURCE%/g,  sbDataSource.getProperty(aRes, "source"));
		txt = txt.replace(/%COMMENT%/g, sbDataSource.getProperty(aRes, "comment"));
		txt = txt.replace(/%DATE%/g,    this.formatID2DateTime(sbDataSource.getProperty(aRes, "id")));
		txt = txt.replace(/%BIBYEAR%/g,    this.formatID2DateYear(sbDataSource.getProperty(aRes, "id")));
		txt = txt.replace(/%BIBMONTH%/g,   this.formatID2DateMonth(sbDataSource.getProperty(aRes, "id")));
		txt = txt.replace(/%LOCAL%/g,   sbCommonUtils.getBaseHref(sbDataSource.data.URI) + "data/" + sbDataSource.getProperty(aRes, "id") + "/index.html");
		biblocal = sbCommonUtils.getBaseHref(sbDataSource.data.URI) + "data/" + sbDataSource.getProperty(aRes, "id") + "/index.html";
		// alert(biblocal);
		biblocal = biblocal.replace(/:/g,"\\:");
		// alert(biblocal);
		txt = txt.replace(/%BIBLOCAL%/g, biblocal);		
		bibtitle = sbDataSource.getProperty(aRes, "title");
		bibtitle = bibtitle.replace(/:/g,"\\:");
		// alert(biblocal);
		txt = txt.replace(/%BIBTITLE%/g, bibtitle);		
		txt = txt.replace(/%FOLDER%/g,  this.folderPath.join("/"));
		return txt;
	},

	formatID2DateTime : function(aID)
	{
		aID.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
		try {
			const SDF = Components.classes['@mozilla.org/intl/scriptabledateformat;1'].getService(Components.interfaces.nsIScriptableDateFormat);
			return SDF.FormatDateTime("", SDF.dateFormatLong, SDF.timeFormatSeconds, RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
		} catch(ex) {
			return [RegExp.$1, RegExp.$2, RegExp.$3].join("/") + " " + [RegExp.$4, RegExp.$5, RegExp.$6].join(":");
		}
	},
	
	formatID2DateYear : function(aID)
	{
		aID.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
			return [RegExp.$1]
	},

	formatID2DateMonth : function(aID)
	{
		aID.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
	 switch (RegExp.$2) {
   case "01": return "jan"; break;
   case "02": return "feb"; break;
   case "03": return "mar"; break;
   case "04": return "apr"; break;
   case "05": return "may"; break;
   case "06": return "jun"; break;
   case "07": return "jul"; break;
   case "08": return "aug"; break;
   case "09": return "sep"; break;
   case "10": return "oct"; break;
   case "11": return "nov"; break;
   case "12": return "dec"; break;
   default: return [RegExp.$2];
   }
   },

};


