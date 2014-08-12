var sbCopyInfoConfig = {

	get TEXTBOX() { return document.getElementById("sbCopyInfoTemplate"); },

	init : function()
	{
		this.TEXTBOX.value = sbCopyInfoCommon.getPref("copyPageInfo", "%TITLE%\n%SOURCE%\n");
		this.TEXTBOX.focus();
	},

	done : function()
	{
        sbCopyInfoCommon.setPref("copyPageInfo", this.TEXTBOX.value);
	},

	setPreset : function(flag)
	{
		var val;
		switch ( flag )
		{
			case "TS"   : val = "%TITLE%\n%SOURCE%\n"; break;
			case "TL"   : val = "%TITLE%\n%LOCAL%\n"; break;
			case "TS+"  : val = "<a href=\"%SOURCE%\">%TITLE%</a>"; break;
			case "TL+"  : val = "<a href=\"%LOCAL%\">%TITLE%</a>"; break;
			case "TSS+" : val = "%TITLE%\n<a href=\"%SOURCE%\">%SOURCE%</a>\n"; break;
			case "TLL+" : val = "%TITLE%\n<a href=\"%LOCAL%\">%LOCAL%</a>\n"; break;
		}
		this.TEXTBOX.value = val;
	},

};


