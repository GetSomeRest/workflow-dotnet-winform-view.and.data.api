workflow-winform
================

This is a sample for WinForm desktop application demoing the partial workflow of using Autodesk View and Data API

This sample has 2 modules 

ViewerHelperApp - .NET form based App which can create token, upload files and translate files. This sample give back the urn.

ViewerClientApp – This has a simple htm file, which host the viewer. The htm file has text fields where you need to provide the token and the file urn.

This sample shows the use of below API’s
1.	Creation of “GuiViewer3D” class.
2.	Disabling the property grid in viewer (viewer3D.propertygrid.openOnSelect = false;)
3.	Adding camera event callback (viewer3D.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, cameraChangedEventCB);)
4.	Loading the document (Autodesk.Viewing.Document.load())
5.	Loading the geometry to show in viewer (viewer3D.load(item3d);)
6.	Getting the node from the dbid (viewer3D.model.getNodeById(dbId);)
7.	Get the model structure (viewer3D.getObjectTree(getObjectTreeCB);)
8.	Isolate the selected geometry using its dbid (viewer3D.isolateById(selectedObjectdbId);)
9.	Select the geometry using its dbid (viewer3D.select(selectedObjectdbId);)
10.	Hide the geometry using its node (viewer3D.hide(currNode);)
11.	Getting geometry properties using dbid (viewer3D.getProperties(selectedObjectdbId, getPropertiesCB);) 
12.	Controlling the visibility ghost objects (viewer3D.setGhosting()) 
13.	Exploding the geometry between 0 to 1(viewer3D.explode(newVal);)
14.	Searching the view for a given text (viewer3D.search(Search, onSearchResultsReturned);)
15.	Rotating and zooming of the model (viewer3D.impl.controls.autoMove(automoveType, true);)
16.	Event handling of selection, escape, hiding, isolation, camera position changing etc. 

Note: You need to host this htm page in a server. Example: in an ASP.net project or you can use technologies like mongoose etc. 

You can also watch ViewerDeveloperSample_working.mp4. This shows basic working of the sample.


