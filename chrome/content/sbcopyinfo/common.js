(function(){
    var PREF = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.scrapbook.addon.copyinfo.");

    var oSBCommon = ("ScrapBookUtils" in window) ? ScrapBookUtils : sbCommonUtils;
    var oSBData = ("ScrapBookData" in window) ? ScrapBookData : ("sbDataSource" in window) ? sbDataSource : null;
    var oSBController = ("sbController" in window) ? sbController : null;
    var oSBTree = ("sbTreeUI" in window) ? sbTreeUI : ("sbTreeHandler" in window) ? sbTreeHandler : null;
    var oSBList = ("sbListHandler" in window) ? sbListHandler : null;

    window.sbCopyInfoCommon = {
        get checkCompatibility() {
            return oSBCommon && oSBData && ("flattenResources" in oSBData);
        },

        get RDFC() {
            return oSBCommon.RDFC;
        },

        getBaseHref: function(sURI) {
            return oSBCommon.getBaseHref(sURI);
        },
        
        copyUnicharPref: function(aName, aDefaultValue) {
            try {
                return PREF.getComplexValue(aName, Components.interfaces.nsISupportsString).data;
            } catch(ex) {
                return aDefaultValue;
            }
        },

        setUnicharPref: function (aName, aValue) {
            try {
                var str = Components.classes["@mozilla.org/supports-string;1"].
                          createInstance(Components.interfaces.nsISupportsString);
                str.data = aValue;
                PREF.setComplexValue(aName, Components.interfaces.nsISupportsString, str);
            }
            catch (ex) {}
        },
    };

    window.sbCopyInfoData = {
        get data() {
            return ("dataSource" in oSBData) ? oSBData.dataSource : oSBData.data;
        },

        flattenResources: function(aContRes, aRule, aRecursive) {
            return oSBData.flattenResources(aContRes, aRule, aRecursive);
        },

        findParentResource: function(aRes) {
            return oSBData.findParentResource(aRes);
        },

        getProperty: function(aRes, aProp) {
            return oSBData.getProperty(aRes, aProp);
        },
        
        isContainer: function(aRes) {
            return oSBData.isContainer(aRes);
        },
    };

    window.sbCopyInfoTree = {
        get resource() {
            if ("isTreeContext" in oSBController) {
                return oSBController.isTreeContext ? oSBTree.resource : oSBList.resource;
            }
            return oSBTree.resource;
        },
    };
})();
