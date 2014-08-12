var sbCopyInfoCommon = {

    getPref : function(aName, aDefaultValue)
    {
        if ("getPref" in sbCommonUtils) {  // ScrapBook X >= 1.10.3
            return sbCommonUtils.getPref("addon.copyinfo." + aName, aDefaultValue);
        }
        else if ("copyUnicharPref" in sbCommonUtils) {  // ScrapBook Plus or ScrapBook X < 1.10.3
            return sbCommonUtils.copyUnicharPref("extensions.scrapbook.addon.copyinfo." + aName, aDefaultValue);
        }
        return aDefaultValue;
    },

    setPref : function (aName, aValue)
	{
        if ("setPref" in sbCommonUtils) {  // ScrapBook X >= 1.10.3
            sbCommonUtils.setPref("addon.copyinfo." + aName, aValue);
        }
        else if ("setUnicharPref" in sbCommonUtils) {  // ScrapBook Plus or ScrapBook X < 1.10.3
            sbCommonUtils.setUnicharPref("extensions.scrapbook.addon.copyinfo." + aName, aValue);
        }
	},
};