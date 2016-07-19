(function(){
    var PREF = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.scrapbook.addon.copyinfo.");

    var oSBCommon =
        (typeof ScrapBookUtils != "undefined") ? ScrapBookUtils :
        (typeof sbCommonUtils != "undefined") ? sbCommonUtils :
        null;
    var oSBData =
        (typeof ScrapBookData != "undefined") ? ScrapBookData :
        (typeof sbDataSource != "undefined") ? sbDataSource :
        null;
    var oSBController =
        (typeof sbController != "undefined") ? sbController :
        null;
    var oSBTree =
        (typeof sbTreeUI != "undefined") ? sbTreeUI :
        (typeof sbTreeHandler != "undefined") ? sbTreeHandler :
        null;
    var oSBList =
        (typeof sbListHandler != "undefined") ? sbListHandler :
        null;

    window.sbCopyInfoCommon = {
        get checkCompatibility() {
            return oSBCommon && oSBData && ("flattenResources" in oSBData);
        },

        get RDF() {
            return oSBCommon.RDF;
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
