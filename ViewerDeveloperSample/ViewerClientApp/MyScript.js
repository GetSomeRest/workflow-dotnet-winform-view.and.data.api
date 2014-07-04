// Viewer 3D
var viewer3D;

// HTML document to access the elements
var htmlDoc;

// Viewer Document
var currentViewerDoc;

// Document Id that is to be loaded
var documentId;

// OAuth
var auth;

// Geometry nodes
var geometryItems;
var geometryItems_children;

// For navigation between nodes
var selectedModelListIndex = 0;
var currNodes = [];
var currNode = null;
var level = 0;

// Current Camera parameters
var position = [];
var target = [];
var upVector = [];
var aspect = 1.0;
var fov = 10;
//var orthoHeight = 
var isPerspective = true;

var explode = 0;

var automoveType = 0;

// For changing camera position along a chosen direction
// X Y or Z
var direction;

//variable for initialize Viewing service
var bFirst;

//for set token web request
var xmlhttp;

//call back when set token Succeeds
function xmlHttpRequestHandler() {
    UpdateCommandLine("set token Successful ");
}

//call back when set token fails
function xmlHttpRequestErrorHandler() {
    UpdateCommandLine("set token failed ");
}


// Initialization on load of the page
function OnInitialize() 
{
    htmlDoc = document;
	
    //this function is called only once
	bFirst = true;

}


//function for each refresh
function OnInitializeViwer()
{
	//get the token.
	var token = htmlDoc.getElementById("TokenText").value; 
	
    //set the token
	xmlhttp = new XMLHttpRequest();

	xmlhttp.open('POST', 'https://developer.api.autodesk.com/utility/v1/settoken', false); 
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = xmlHttpRequestHandler;
    xmlhttp.onerror = xmlHttpRequestErrorHandler;
    xmlhttp.withCredentials = true;
    xmlhttp.send("access-token=" + token);
	
   var options = {};
   options.env = "AutodeskProduction";
    options.accessToken = token;

    //initialize environment variable
    initializeEnvironmentVariable(options);

    //initialize end points
    initializeServiceEndPoints();

    auth = initializeAuth(null, options);

    //for the first tinme create new instance
	if(bFirst == true)
	{
		var viewerContainer = htmlDoc.getElementById('3dViewDiv');
		viewer3D = new Autodesk.Viewing.Private.GuiViewer3D(viewerContainer, {});
		viewer3D.initialize();
		bFirst = false;
	}

    //Do not show property grid
    viewer3D.propertygrid.openOnSelect = false;

    //set the ghosting status right.
    var cb = document.getElementById("Checkbox_Ghost");
    viewer3D.setGhosting(cb.checked);

    // Get the htmlDoc Id to load
    documentId = document.getElementById("DocIdTB").value;

    //camara event
    viewer3D.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, cameraChangedEventCB);
   
    // Load the document
    Autodesk.Viewing.Document.load(documentId, Autodesk.Viewing.Private.getAuthObject(), onSuccessDocumentLoadCB, onErrorDocumentLoadCB);
}

//Load the viewer document - called when user click the load button in UI
function LoadDocumentBtnClicked() 
{

    //Initialize Viwer
	OnInitializeViwer();
	
    //get the document provided by the user
    documentId = document.getElementById("DocIdTB").value;

    //load the document
    Autodesk.Viewing.Document.load(documentId, Autodesk.Viewing.Private.getAuthObject(), onSuccessDocumentLoadCB, onErrorDocumentLoadCB);
    //update the command line text.
    UpdateCommandLine("Loading document : " + documentId);
}

// Document successfully loaded 
function onSuccessDocumentLoadCB(viewerDocument) {

    //store the varibale in currentViewerDoc.
    currentViewerDoc = viewerDocument;

    //get the root.
    var rootItem = viewerDocument.getRootItem();

    //store in globle variable
    geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(rootItem, { 'type': 'geometry', 'role': '3d' }, true);

    if (geometryItems.length > 0) 
    {
        var item3d = viewerDocument.getViewablePath(geometryItems[0]);

        //load the geometry in the viewer.
        viewer3D.load(item3d);

        level = 0;

        // Add the 3d geometry items to the list
        $("#ModelList").empty()

        var itemList = htmlDoc.getElementById('ModelList');
        for (i = 0; i < geometryItems.length; i++) 
        {
            itemList.add(new Option(geometryItems[i].name, geometryItems[i]));
        }
    }
}

// Some error during document load
function onErrorDocumentLoadCB(errorMsg, errorCode) 
{
    $('#tree_container').empty();
    UpdateCommandLine("Unable to load the document : " + documentId + errorMsg);
}

// Get the object tree and load the select elements for navigation
function getObjectTreeCB(result) 
{
    $("#ModelList").empty()
    geometryItems_children = result.children;

    var itemList = htmlDoc.getElementById('ModelList');
    for (i = 0; i < geometryItems_children.length; i++) 
    {
        itemList.add(new Option(geometryItems_children[i].name, geometryItems_children[i]));

        currNodes.push(geometryItems_children[i]);
    }
}

// Selection changed event Callback in the 3D viewer
function selectionChangedEventCB(event) 
{
    var dbIdArray = event.dbIdArray;
    if (dbIdArray.length == 0) 
    {
        UpdateCommandLine("Selection changed event : No selection ");
        return;
    }

    for (i = 0; i < dbIdArray.length; i++) 
    {
        var dbId = dbIdArray[i];

        var node = viewer3D.model.getNodeById(dbId);
        if (node != null) {
            UpdateCommandLine("Selection changed event : selecting object : " + node.name + " (dbId = " + dbId + ")");
        }
        else {
            UpdateCommandLine("Selection changed event : selecting object " + dbId);
        }

        
    }
}

// Isolate event Callback in the 3D Viewer
function isolateEventCB(event) 
{
    var dbIdArray = event.nodeIdArray;
    if (dbIdArray.length == 0) 
    {
        UpdateCommandLine("Isolate event : No selection ");
        return;
    }

    for (i = 0; i < dbIdArray.length; i++) {
        var obj = dbIdArray[i];
        UpdateCommandLine("Isolate event : isolating object " + obj.name + " (" + obj.dbId + ")");
    }
}

function hideEventCB(event) 
{
    var dbIdArray = event.nodeIdArray;
    if (dbIdArray.length == 0) {
        UpdateCommandLine("Hide event : No selection ");
        return;
    }

    for (i = 0; i < dbIdArray.length; i++) {
        var obj = dbIdArray[i];
        UpdateCommandLine("Hide event : hiding object " + obj.name + " (" + obj.dbId + ")");
    }
}

function showEventCB(event) 
{
    var dbIdArray = event.nodeIdArray;
    if (dbIdArray.length == 0) {
        UpdateCommandLine("Show event : No selection ");
        return;
    }

    for (i = 0; i < dbIdArray.length; i++) {
        var obj = dbIdArray[i];
        UpdateCommandLine("Show event : showing object " + obj.name + " (" + obj.dbId + ")");
    }
}

function progressUpdateEventCB(event) {

    UpdateCommandLine("Progress update event message " + event.message);
    UpdateCommandLine("Progress update event percentage " + event.percent);
}

function errorEventCB(event) 
{
    var dbIdArray = event.dbIdArray;
    if (dbIdArray.length == 0) {
        UpdateCommandLine("Error event : No selection ");
        return;
    }

    for (i = 0; i < dbIdArray.length; i++) {
        var dbId = dbIdArray[i];
        UpdateCommandLine("Error event : object " + dbIdArray[i].name + " (" + dbId + ")");
    }
}

//escape event callback
function escapeEventCB(event) 
{
    UpdateCommandLine("escape event ");
}

//navigation event callback
function navigationModeEventCB(event) 
{
    UpdateCommandLine("Navigation mode event value " + event.value);
}

function highlightEventCB(event) 
{
    UpdateCommandLine("highlight event callback " );
}

function geometryLoadedEventCB(event) 
{
    UpdateCommandLine("Geometry loaded event");
    viewer3D.getObjectTree(getObjectTreeCB);
    viewer3D.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, geometryLoadedEventCB);
}

function OnChangeOperation() 
{
    var e = document.getElementById("OperationSelectionBox");
    var str = e.options[e.selectedIndex].text;

    viewer3D.showAll();
}

function UpdateCommandLine(text) 
{
    var itemList = htmlDoc.getElementById('OutputMessages');
    var obj = itemList.add(new Option(text, text));

    var e = document.getElementById("OutputMessages");
    e.scrollTop = e.scrollHeight - 20;
}



function Model_selectedItem(modelList) 
{
    if (selectedModelListIndex == modelList.selectedIndex) {
       //
	   if(level == 0)
	   {
	   }
	   else
	   {
		currNode = currNodes[selectedModelListIndex];
	   }
       return; // Do not reload repeatedly
    }

    selectedModelListIndex = modelList.selectedIndex;

    if (level == 0) {

        if (selectedModelListIndex < 0)
            selectedModelListIndex = 0;

        var item3d = currentViewerDoc.getViewablePath(geometryItems[selectedModelListIndex]);

        viewer3D.load(item3d);

        // Clear the properties table
        var table = htmlDoc.getElementById('PropertiesTable')
        while (table.hasChildNodes()) 
        {
            table.removeChild(table.firstChild);
        }

        // Disable the Back button since this is the first level
        $("#NavigateBackBtn").prop('disabled', true);
        
    }
    else {
    // Enable the Back button
        $("#NavigateBackBtn").prop('disabled', false);

        currNode = currNodes[selectedModelListIndex];
        var selectedObjectdbId = currNode.dbId;

        var geomItemsChildren = currNode.children;

        // Disable the Forward button if no further child nodes
        if (typeof geomItemsChildren === "undefined") {
            $("#NavigateForwardBtn").prop('disabled', true);
        }
        else if (geomItemsChildren.length == 0) {
            $("#NavigateForwardBtn").prop('disabled', true);
        }
        else {
            $("#NavigateForwardBtn").prop('disabled', false);
        }


        

        // Isolate, Select the node item
        var e = document.getElementById("OperationSelectionBox");
        var str = e.options[e.selectedIndex].text;

        if (str === "Isolate") 
        {
			//reset firts
            viewer3D.isolateById(selectedObjectdbId);
        }
        else if (str === "Select") 
        {
            // Clear the current selection
            viewer3D.clearSelection();
            
            // Select the node
            viewer3D.select(selectedObjectdbId);
        }
        else if (str === "Hide") {
            // Clear the current selection
            viewer3D.showAll();

            // Select the node
            viewer3D.hide(currNode);

        }
        else if (str === "show-only") {
            
            //not yet implemnted
            //viewer3D.hideAll();

            //viewer3D.show(currNode);
        }

        var zoomcb = document.getElementById("ZoomCheckbox");
        if (zoomcb.checked == true) {
            // Zoom if needed
            viewer3D.docstructure.handleAction(["focus"], selectedObjectdbId);
        }

        // Update the properties of the item that was selected.
        viewer3D.getProperties(selectedObjectdbId, getPropertiesCB);
    }
}

//show the properties in the table
function getPropertiesCB(result) 
{
    var id = result.dbId;
    var name = result.name;
	
	UpdateCommandLine("Getting Properties of object " + name + " (dbId = " + id + ")");

    // Get the properties table
    var propertiesTable = htmlDoc.getElementById('PropertiesTable')

    // Clear the properties table
    while (propertiesTable.hasChildNodes()) 
    {
        propertiesTable.removeChild(propertiesTable.firstChild);
    }

    // Populate the table with the properties
    for (i = 0; i < result.properties.length; i++) 
    {
        var property = result.properties[i];
        var disName = property.displayName;
        var disValue = property.displayValue;

        var row = propertiesTable.insertRow(i);

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);

        cell0.innerHTML = disName;
        cell1.innerHTML = disValue;
    }
}

//go to chidren of the selected item
function onNavigateForward() {
    if (level == 0) {
        var item3d = currentViewerDoc.getViewablePath(geometryItems[selectedModelListIndex]);
        viewer3D.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, geometryLoadedEventCB);
        viewer3D.load(item3d);
		
    }
    else {
        $("#ModelList").empty();
        var itemList = htmlDoc.getElementById('ModelList');

        currNodes = [];
        var geomItemsChildren = currNode.children;
        for (i = 0; i < geomItemsChildren.length; i++) {
            itemList.add(new Option(geomItemsChildren[i].name, geomItemsChildren[i].dbId));
            currNodes.push(geomItemsChildren[i]);
        }
    }

    level = level + 1;
	selectedModelListIndex = -1;
}

//go to parent of the selected item
function onNavigateBack() 
{
    if(level == 1)
    {
        // Add the 3d geometry items to the list
        $("#ModelList").empty();

		viewer3D.initialize();
		var item3d = currentViewerDoc.getViewablePath(geometryItems[0]);

        viewer3D.load(item3d);	
		viewer3D.propertygrid.openOnSelect = false;
		
        var itemList = htmlDoc.getElementById('ModelList');
        for (i = 0; i < geometryItems.length; i++) 
        {
            itemList.add(new Option(geometryItems[i].name, geometryItems[i].dbId));
        }


        $("#NavigateBackBtn").prop('disabled', true);
        $("#NavigateForwardBtn").prop('disabled', false);
    }
    else 
    {
        $("#ModelList").empty();
        var itemList = htmlDoc.getElementById('ModelList');

        currNodes = [];
        var geomItemsChildren = currNode.parent.parent.children;
        for (i = 0; i < geomItemsChildren.length; i++) {
            itemList.add(new Option(geomItemsChildren[i].name, geomItemsChildren[i].dbId));
            currNodes.push(geomItemsChildren[i]);
        }
    }

    level = level - 1;
	selectedModelListIndex = -1;
}


function ChangeCameraPosPositive() 
{
    switch(direction) 
    {
        case 'X':
            ChangeCameraPosX1();
            break;

        case 'Y':
            ChangeCameraPosY1();
            break;

        case 'Z':
            ChangeCameraPosZ1();
            break;

        default:
            ChangeCameraPosX1();
            break;
    }
}

function ChangeCameraPosNegative() {

    switch (direction) {
        case 'X':
            ChangeCameraPosX0();
            break;

        case 'Y':
            ChangeCameraPosY0();
            break;

        case 'Z':
            ChangeCameraPosZ0();
            break;

        default:
            ChangeCameraPosX0();
            break;
    }
}

// Move the camera position in Negative X direction
function ChangeCameraPosX0() 
{
    var threeCamera = viewer3D.getCamera();
    threeCamera.position.set(position.x * 0.9, position.y, position.z);
    viewer3D.applyCamera(threeCamera, false);
}

// Move the camera position in Positive X direction
function ChangeCameraPosX1() {
    var threeCamera = viewer3D.getCamera();
    threeCamera.position.set(position.x * 1.1, position.y, position.z);
    viewer3D.applyCamera(threeCamera, false);
}

// Move the camera position in Negative Y direction
function ChangeCameraPosY0() {
    var threeCamera = viewer3D.getCamera();
    threeCamera.position.set(position.x, position.y * 0.9, position.z);
    viewer3D.applyCamera(threeCamera, false);
}

// Move the camera position in Positive X direction
function ChangeCameraPosY1() {
    var threeCamera = viewer3D.getCamera();
    threeCamera.position.set(position.x, position.y * 1.1, position.z);
    viewer3D.applyCamera(threeCamera, false);
}

// Move the camera position in Negative Z direction
function ChangeCameraPosZ0() {
    var threeCamera = viewer3D.getCamera();
    threeCamera.position.set(position.x, position.y, position.z * 0.9);
    viewer3D.applyCamera(threeCamera, false);
}

// Move the camera position in Positive Z direction
function ChangeCameraPosZ1() {
    var threeCamera = viewer3D.getCamera();
    threeCamera.position.set(position.x, position.y, position.z * 1.1);
    viewer3D.applyCamera(threeCamera, false);
}

function cameraChangedEventCB(evt) 
{
    position = evt.camera.position;
    target = evt.camera.target;
    upVector = evt.camera.up;
    aspect = evt.camera.aspect;
    fov = evt.camera.fov;
    //var orthoHeight = 
    isPerspective = evt.camera.isPerspective;

    var cb = document.getElementById("CameraChangedEvtCheckbox");
    if (cb.checked == true) {
        UpdateCommandLine("Camera : PosX = " + position.x + "PosY = " + position.y + "PosZ = " + position.z + "TargetX = " + target.x + "TargetY = " + target.y + "TargetZ = " + target.z);
    }
}

function OnChangeDirection() {
    var e = document.getElementById("DirectionSelect");
    direction = e.options[e.selectedIndex].text;
}


function OnChangeSelectionChangedEvtCheckbox() {

    var cb = document.getElementById("SelectionChangedEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, selectionChangedEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, selectionChangedEventCB);
    }
}

function OnChangeIsolateEvtCheckbox() {
    var cb = document.getElementById("IsolateEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.ISOLATE_EVENT, isolateEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.ISOLATE_EVENT, isolateEventCB);
    }
}

function OnChangeHideEvtCheckbox() {
    var cb = document.getElementById("HideEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.HIDE_EVENT, hideEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.HIDE_EVENT, hideEventCB);
    }
}

function OnChangeShowEvtCheckbox() {
    var cb = document.getElementById("ShowEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.SHOW_EVENT, showEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.SHOW_EVENT, showEventCB);
    }
}

function OnChangeProgressUpdateEvtCheckbox() {
    var cb = document.getElementById("ProgressUpdateEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.PROGRESS_UPDATE_EVENT, progressUpdateEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.PROGRESS_UPDATE_EVENT, progressUpdateEventCB);
    }
}

function OnChangeErrorEvtCheckbox() {
    var cb = document.getElementById("ErrorEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.ERROR_EVENT, errorEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.ERROR_EVENT, errorEventCB);
    }
}

function OnChangeEscapeEvtCheckbox() {
    var cb = document.getElementById("EscapeEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.ESCAPE_EVENT, escapeEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.ESCAPE_EVENT, escapeEventCB);
    }
}

function OnChangeNavigationModeEvtCheckbox() {
    var cb = document.getElementById("NavigationModeEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.NAVIGATION_MODE_CHANGED_EVENT, navigationModeEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.NAVIGATION_MODE_CHANGED_EVENT, navigationModeEventCB);
    }
}

function OnChangeCameraChangedEvtCheckbox() {

    var cb = document.getElementById("CameraChangedEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(CAMERA_CHANGE_EVENT, cameraChangedEventCB);
    }
    else {
        viewer3D.removeEventListener(CAMERA_CHANGE_EVENT, cameraChangedEventCB);
    }
}

function OnChangeHighlightEvtCheckbox() {
    var cb = document.getElementById("HighlightEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.HIGHLIGHT_EVENT, highlightEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.HIGHLIGHT_EVENT, highlightEventCB);
    }
}

function OnChangeGeometryLoadedEvtCheckbox() {
    var cb = document.getElementById("GeometryLoadedEvtCheckbox");
    if (cb.checked == true) {
        viewer3D.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, geometryLoadedEventCB);
    }
    else {
        viewer3D.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, geometryLoadedEventCB);
    }
}


//control Whether to show other objects during isolate
function OnChangeGhostCheckbox() {

    var cb = document.getElementById("Checkbox_Ghost");
    viewer3D.setGhosting(cb.checked);

    UpdateCommandLine("Setting ghost objects during isolate = " + cb.checked);
}

//show all, clear selection and fit the view
function show_onclick() {
    viewer3D.clearSelection();
    viewer3D.showAll();
    viewer3D.impl.controls.fitToView();
}

//explode
function onExplodeValue(newVal) {
    viewer3D.explode(newVal);
}

//explode call back
function explodeValue(newVal) {
     viewer3D.explode(newVal);
}

//clear selection button callback
function button_clearSelection_onclick() {
    viewer3D.clearSelection();
}

function OnResetViewBtnClicked() {

}

//call back function of serch.
function onSearchResultsReturned(idArray) {
    //for testing isoloate all the ids
    viewer3D.isolateById(idArray);
    
    var zoomcb = document.getElementById("ZoomCheckbox");

    if (zoomcb.checked == true) {
        // Zoom if needed
        viewer3D.docstructure.handleAction(["focus"], idArray);
    }

    //update the commnadline window.
    if (idArray.length == 0) {
        UpdateCommandLine("No objects found in Search ");
        return;
    }

    UpdateCommandLine(idArray.length + " items found in the Search -------");

    for (i = 0; i < idArray.length; i++) {
        var node = viewer3D.model.getNodeById(idArray[i]);
        if (node != null) {
            UpdateCommandLine(node.name + " (dbId = " + idArray[i] + ")");
        }
        else {
            UpdateCommandLine("No node for" + " (dbId = " + idArray[i] + ")");
        }

        //you can also check for node.hasOwnProperty
        //if yes, then get the properties
    }
}

//this function is called from Search button click
function Search_onclick() {

    var Search = document.getElementById("Text1_Search").value;
    viewer3D.search(Search, onSearchResultsReturned);
 }

 //timer end function. used in 
 function continueExecution() {
     viewer3D.impl.controls.autoMove(automoveType, false);
 }

 //rotate clockwise for 250 mili seconds
 function rightturen_onclick() {

     viewer3D.canvas.focus();
     automoveType = 1;
     viewer3D.impl.controls.autoMove(automoveType, true);
     setTimeout(continueExecution, 250);
 }

 //rotate anti-lockwise for 250 mili seconds
 function leftturn_onclick() {
     viewer3D.canvas.focus();
     automoveType = 0;
     viewer3D.impl.controls.autoMove(automoveType, true);
     setTimeout(continueExecution, 250);
 }

 //zoom out
 function zoomout_onclick() {
     viewer3D.canvas.focus();
     automoveType = 4;
     viewer3D.impl.controls.autoMove(automoveType, true);
     setTimeout(continueExecution, 250);
 }

 //zoom-in
 function zoomin_onclick() {
     viewer3D.canvas.focus();
     automoveType = 5;
     viewer3D.impl.controls.autoMove(automoveType, true);
     setTimeout(continueExecution, 250);
 }