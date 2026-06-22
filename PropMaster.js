/*bad todo

dynamically adjust minimum guests based on max missions? selected/default missions? probably per venue

	
*/
const AquariumMissionsMax=8;
const BalconyMissionsMax=5;
const BallroomMissionsMax=8;
const CourtyardMissionsMax=7;
const GalleryMissionsMax=8;
const HighriseMissionsMax=8;
const LibraryMissionsMax=8;
const ModerneMissionsMax=8;
const PubMissionsMax=7;
const RedwoodsMissionsMax=8;
const TeienMissionsMax=8;
const TerraceMissionsMax=7;
const VerandaMissionsMax=8;

const GlobalMaxGuests=21;

const listOfVenuesLowercase=["aquarium","balcony","ballroom","courtyard","gallery","highrise","library","moderne","pub","redwoods","teien","terrace","veranda"];
let listOfDupeVenues=[];
// if new venue or mission is added, also update venueHasMission function
//that should not be hardcoded like it is, but it's probably prettier than declaring 13*8 global booleans?


var numExtraAquarium=0;
var numExtraBalcony=0;
var numExtraBallroom=0;
var numExtraCourtyard=0;
var numExtraGallery=0;
var numExtraHighrise=0;
var numExtraLibrary=0;
var numExtraModerne=0;
var numExtraPub=0;
var numExtraRedwoods=0;
var numExtraTeien=0;
var numExtraTerrace=0;
var numExtraVeranda=0;


var retryError=false;//for not forcing retries



function onClickSave(){//build the prop string, and prompt for download
	var anErrorExists=finalCheckForErrors();
	
	console.log("error status: retryError="+retryError+" | and error check="+anErrorExists);

	if(retryError || !anErrorExists){//if no errors
		var propName = document.getElementById("filename").value + ".prop";
	
		//start filling prop
		var propText = "group quickplays = \n{\n\tgroup custom_group =\n\t{\n\t\tint Version=1\n\t\tstring Name =\"";
		//get group name
		propText= propText+document.getElementById("group").value+"\"\n\t\tint Locked=1\n\t\tstring Description = \"";
		//get description
		propText= propText+document.getElementById("description").value+"\"\n\t\t"
		//get hide levels?
		if(document.getElementById("minimal").checked)
			propText= propText+"int Minimal = 1\n\t}\n";
		else
			propText= propText+"int Minimal = 0\n\t}\n";
		
		if(Boolean(document.getElementById("aquariumAllow").checked)){//if we are using aquarium?
			propText = propText+getQuickplayGroupFromVenue("aquarium")+"\n";
			for(let i=1;i<=numExtraAquarium;i++){
				propText+=getQuickplayGroupFromVenue("aquarium"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("balconyAllow").checked)){//if we are using balcony?
			propText = propText+getQuickplayGroupFromVenue("balcony")+"\n";
			for(let i=1;i<=numExtraBalcony;i++){
				propText+=getQuickplayGroupFromVenue("balcony"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("ballroomAllow").checked)){//if we are using ballroom?
			propText = propText+getQuickplayGroupFromVenue("ballroom")+"\n";
			for(let i=1;i<=numExtraBallroom;i++){
				propText+=getQuickplayGroupFromVenue("ballroom"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("courtyardAllow").checked)){//if we are using courtyard?
			propText = propText+getQuickplayGroupFromVenue("courtyard")+"\n";
			for(let i=1;i<=numExtraCourtyard;i++){
				propText+=getQuickplayGroupFromVenue("courtyard"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("galleryAllow").checked)){//if we are using gallery?
			propText = propText+getQuickplayGroupFromVenue("gallery")+"\n";
			for(let i=1;i<=numExtraGallery;i++){
				propText+=getQuickplayGroupFromVenue("gallery"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("highriseAllow").checked)){//if we are using highrise?
			propText = propText+getQuickplayGroupFromVenue("highrise")+"\n";
			for(let i=1;i<=numExtraHighrise;i++){
				propText+=getQuickplayGroupFromVenue("highrise"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("libraryAllow").checked)){//if we are using library?
			propText = propText+getQuickplayGroupFromVenue("library")+"\n";
			for(let i=1;i<=numExtraLibrary;i++){
				propText+=getQuickplayGroupFromVenue("library"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("moderneAllow").checked)){//if we are using moderne?
			propText = propText+getQuickplayGroupFromVenue("moderne")+"\n";	
			for(let i=1;i<=numExtraModerne;i++){
				propText+=getQuickplayGroupFromVenue("moderne"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("pubAllow").checked)){//if we are using pub?
			propText = propText+getQuickplayGroupFromVenue("pub")+"\n";	
			for(let i=1;i<=numExtraPub;i++){
				propText+=getQuickplayGroupFromVenue("pub"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("redwoodsAllow").checked)){//if we are using redwoods?
			propText = propText+getQuickplayGroupFromVenue("redwoods")+"\n";
			for(let i=1;i<=numExtraRedwoods;i++){
				propText+=getQuickplayGroupFromVenue("redwoods"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("teienAllow").checked)){//if we are using teien?
			propText = propText+getQuickplayGroupFromVenue("teien")+"\n";	
			for(let i=1;i<=numExtraTeien;i++){
				propText+=getQuickplayGroupFromVenue("teien"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("terraceAllow").checked)){//if we are using terrace?
			propText = propText+getQuickplayGroupFromVenue("terrace")+"\n";	
			for(let i=1;i<=numExtraTerrace;i++){
				propText+=getQuickplayGroupFromVenue("terrace"+i)+"\n";
			}
			propText+="\n";
		}
		if(Boolean(document.getElementById("verandaAllow").checked)){//if we are using veranda?
			propText = propText+getQuickplayGroupFromVenue("veranda")+"\n";	
			for(let i=1;i<=numExtraVeranda;i++){
				propText+=getQuickplayGroupFromVenue("veranda"+i)+"\n";
			}
			propText+="\n";
		}
			
			
		//close prop
		propText = propText+"\n}";
		
		//add all documentation
		//Regular level hashes
		propText = propText+"\n\n\n/*\nLevel Hashes:\naquarium: 0x98e45d99\nbalcony: 0x1dbd8e41\nballroom: 0x5b121925\ncourtyard: 0x9dc5bb5e\ngallery: 0x7173b8bf\nhighrise: 0x1a56c5a1\nlibrary:0x168f4f62\nmoderne: 0x2e37f15b\npub: 0x3b85fff3\nredwoods: 0x35ac5135\nteien: 0x79dfa0cf\nterrace: 0x9032ce22\nveranda: 0x6F81A558\n";
		//old art level hashes
		propText = propText+"old art balcony: 0xB8891FBC\nold art ballroom: 0x09C2E7B0\nold art courtyard1: 0xB4CF686B\nold art courtyard2: 0x290A0C75\nold art gallery: 0x28B3AA5E\nold art library (panopticon):0x3695F583\nold art veranda: 0xA8BEA091\n";
		//jank untested level hashes
		propText = propText+"Modern: 0xE6146120\nDouble Modern: 0x7076E38F\nCrowded pub?: 0x0D027340\nBvB Hirise?: 0x3A30C326\nBvB NuBallroom?: 0x5996FAAA\n\n";
		//GameTypes
		propText = propText+"GameType:\n0=Known (requires both NumNeededMissions and NumSelectedMissions, and both must be equal)\n1=Pick  NumNeededMissions > NumSelectedMissions\n2=Any   NumNeededMissions > NumSelectedMissions\n\n";
		//mission groups
		propText = propText+"Mission Groups:\nprohibited_missions (missions that cannot be chosen)\npermitted_missions (can only select missions from this list)\nrequired_missions (cannot un-select these missions)\ndefault_missions (these are the default chosen or pre-selected missions)\n\n";
		//mission names
		propText = propText+"Mission Names\nbug_ambassador\ndouble_agent\ntransfer_microfilm\nswap_statue\ninspect_statues\nseduction\npurloin_guestlist\nfingerprint_ambassador";
		//unused priority documentation
		propText=propText+"\n\n\nfloat Priority = 2.0 can go in main group to change order it shows up in quickplay list. \nBeginner is 1.0, Intermediate 1 - 3 is 2-4, and Standard is 5, and Old Art is 10.\n";
		
		propText=propText+"\n*/\n\n";
		download(propText,propName,"prop");
	}
	else{//there is an error
		retryError=true;
		alert("An error exists?  At least I think one does.  Double check all data.  Retry without changes to force it to save, maybe I'm wrong.\nSee browser console for hints");
		
		
	}
	
}

function getQuickplayGroupFromVenue(venueName){
	var numberlessString=venueName.replace(/\d+/g, '');
	var numbersOnly=venueName.replace(/[a-zA-Z]/g, '');
	
	//copy custom group
	var propText="\n\t//"+numberlessString;
	if (numbersOnly.length >0)
		propText+=" #"+(Number(numbersOnly)+1);

	propText+="\n\tgroup quickplay =\n\t{\n\t\tint Version=1\n\t\tstring CustomGroup=\""+document.getElementById("group").value+"\"\n\t\tstring Name=\"";
	
	//console.log("test: venueName="+venueName);

	//quickplay name
	propText=propText+document.getElementById(venueName+"Name").value+"\"\n\t\tint LevelHash = ";
	
	//get level hash
	switch(numberlessString)
	{
		case "aquarium":
			propText+="0x98e45d99";break;
		case "balcony":
			propText+="0x1dbd8e41";break;
		case "ballroom":
			propText+="0x5b121925";break;
		case "courtyard":
			propText+="0x9dc5bb5e";break;
		case "gallery":
			propText+="0x7173b8bf";break;
		case "highrise":
			propText+="0x1a56c5a1";break;
		case "library":
			propText+="0x168f4f62";break;
		case "moderne":
			propText+="0x2e37f15b";break;
		case "pub":
			propText+="0x3b85fff3";break;
		case "redwoods":
			propText+="0x35ac5135";break;
		case "teien":
			propText+="0x79dfa0cf";break;
		case "terrace":
			propText+="0x9032ce22";break;
		case "veranda":
			propText+="0x6F81A558";break;
		default:
			alert("Unknown venue name in venue hash switch code: "+numberlessString);
	}
	propText=propText+"\n\t\tint DurationSeconds = ";
	
	//get duration
	propText=propText+document.getElementById(venueName+"Duration").value+"\n\t\tint NumGuests = ";
	
	//get guests
	propText=propText+document.getElementById(venueName+"Guests").value+"\n\t\tint GameType = ";
	
	//get gametype and # missions
	if (document.getElementById(venueName+"Gametype2").checked){
		//gametype constant in this if, this is Any
		propText=propText+"2\n\t\tint NumNeededMissions = ";
		//get missions needed to win:
		propText=propText+document.getElementById(venueName+"Needed").value+"\n\t\tint NumSelectedMissions = "
		//get # selected missions:
		propText=propText+document.getElementById(venueName+"Selected").value;
	}
	else if (document.getElementById(venueName+"Gametype1").checked){
		//gametype constant in this if, this is Pick
		propText=propText+"1\n\t\tint NumNeededMissions = ";
		//get missions needed to win:
		propText=propText+document.getElementById(venueName+"Needed").value+"\n\t\tint NumSelectedMissions = "
		//get # selected missions:
		propText=propText+document.getElementById(venueName+"Selected").value;
	}
	else if (document.getElementById(venueName+"Gametype0").checked){
		//gametype constant in this if, this is KNOWN
		propText=propText+"0\n\t\tint NumNeededMissions = ";
		//get missions needed to win (just take # selected for KNOWN, to ensure they're equal)
		propText=propText+document.getElementById(venueName+"Selected").value+"\n\t\tint NumSelectedMissions = "
		//get # selected missions:
		propText=propText+document.getElementById(venueName+"Selected").value;
	}
	else
		alert("Trouble grabbing gametype for: "+venueName);
	
	//get simplified?
	if(document.getElementById(venueName+"Simplified").checked)
		propText=propText+"\n\t\tint SimpleRules = 1";
	else
		propText=propText+"\n\t\tint SimpleRules = 0";
	
	//get default selections
	if (document.getElementById(venueName+"Preselect").checked){
		propText=propText+"\n\t\tgroup default_missions = \n\t\t{"
		
		if(document.getElementById(venueName+"Default0") !== null && document.getElementById(venueName+"Default0").checked){//bug
			propText=propText+"\n\t\t\tstrings mission = \"bug_ambassador\""
		}
		if(document.getElementById(venueName+"Default1") !== null && document.getElementById(venueName+"Default1").checked){//Contact
			propText=propText+"\n\t\t\tstrings mission = \"double_agent\""
		}
		if(document.getElementById(venueName+"Default2") !== null && document.getElementById(venueName+"Default2").checked){//transfer
			propText=propText+"\n\t\t\tstrings mission = \"transfer_microfilm\""
		}
		if(document.getElementById(venueName+"Default3") !== null && document.getElementById(venueName+"Default3").checked){//swap
			propText=propText+"\n\t\t\tstrings mission = \"swap_statue\""
		}
		if(document.getElementById(venueName+"Default4") !== null && document.getElementById(venueName+"Default4").checked){//inspect
			propText=propText+"\n\t\t\tstrings mission = \"inspect_statues\""
		}
		if(document.getElementById(venueName+"Default5") !== null && document.getElementById(venueName+"Default5").checked){//seduce
			propText=propText+"\n\t\t\tstrings mission = \"seduction\""
		}
		if(document.getElementById(venueName+"Default6") !== null && document.getElementById(venueName+"Default6").checked){//purlin
			propText=propText+"\n\t\t\tstrings mission = \"purloin_guestlist\""
		}
		if(document.getElementById(venueName+"Default7") !== null && document.getElementById(venueName+"Default7").checked){//fingerprint
			propText=propText+"\n\t\t\tstrings mission = \"fingerprint_ambassador\""
		}
		//close group
		propText=propText+"\n\t\t}";
	}
	
	if (document.getElementById(venueName+"Prohibit").checked){
		propText=propText+"\n\t\tgroup prohibited_missions = \n\t\t{"
		
		if(document.getElementById(venueName+"Prohibit0") !== null && document.getElementById(venueName+"Prohibit0").checked){//bug
			propText=propText+"\n\t\t\tstrings mission = \"bug_ambassador\""
		}
		if(document.getElementById(venueName+"Prohibit1") !== null && document.getElementById(venueName+"Prohibit1").checked){//Contact
			propText=propText+"\n\t\t\tstrings mission = \"double_agent\""
		}
		if(document.getElementById(venueName+"Prohibit2") !== null && document.getElementById(venueName+"Prohibit2").checked){//transfer
			propText=propText+"\n\t\t\tstrings mission = \"transfer_microfilm\""
		}
		if(document.getElementById(venueName+"Prohibit3") !== null && document.getElementById(venueName+"Prohibit3").checked){//swap
			propText=propText+"\n\t\t\tstrings mission = \"swap_statue\""
		}
		if(document.getElementById(venueName+"Prohibit4") !== null && document.getElementById(venueName+"Prohibit4").checked){//inspect
			propText=propText+"\n\t\t\tstrings mission = \"inspect_statues\""
		}
		if(document.getElementById(venueName+"Prohibit5") !== null && document.getElementById(venueName+"Prohibit5").checked){//seduce
			propText=propText+"\n\t\t\tstrings mission = \"seduction\""
		}
		if(document.getElementById(venueName+"Prohibit6") !== null && document.getElementById(venueName+"Prohibit6").checked){//purlin
			propText=propText+"\n\t\t\tstrings mission = \"purloin_guestlist\""
		}
		if(document.getElementById(venueName+"Prohibit7") !== null && document.getElementById(venueName+"Prohibit7").checked){//fingerprint
			propText=propText+"\n\t\t\tstrings mission = \"fingerprint_ambassador\""
		}
		//close group
		propText=propText+"\n\t\t}";
	}
	
	if (document.getElementById(venueName+"Require").checked){
		propText=propText+"\n\t\tgroup required_missions = \n\t\t{"
		
		if(document.getElementById(venueName+"Require0") !== null && document.getElementById(venueName+"Require0").checked){//bug
			propText=propText+"\n\t\t\tstrings mission = \"bug_ambassador\""
		}
		if(document.getElementById(venueName+"Require1") !== null && document.getElementById(venueName+"Require1").checked){//Contact
			propText=propText+"\n\t\t\tstrings mission = \"double_agent\""
		}
		if(document.getElementById(venueName+"Require2") !== null && document.getElementById(venueName+"Require2").checked){//transfer
			propText=propText+"\n\t\t\tstrings mission = \"transfer_microfilm\""
		}
		if(document.getElementById(venueName+"Require3") !== null && document.getElementById(venueName+"Require3").checked){//swap
			propText=propText+"\n\t\t\tstrings mission = \"swap_statue\""
		}
		if(document.getElementById(venueName+"Require4") !== null && document.getElementById(venueName+"Require4").checked){//inspect
			propText=propText+"\n\t\t\tstrings mission = \"inspect_statues\""
		}
		if(document.getElementById(venueName+"Require5") !== null && document.getElementById(venueName+"Require5").checked){//seduce
			propText=propText+"\n\t\t\tstrings mission = \"seduction\""
		}
		if(document.getElementById(venueName+"Require6") !== null && document.getElementById(venueName+"Require6").checked){//purlin
			propText=propText+"\n\t\t\tstrings mission = \"purloin_guestlist\""
		}
		if(document.getElementById(venueName+"Require7") !== null && document.getElementById(venueName+"Require7").checked){//fingerprint
			propText=propText+"\n\t\t\tstrings mission = \"fingerprint_ambassador\""
		}
		//close group
		propText=propText+"\n\t\t}";
	}	
	
	propText=propText+"\n\t}";//end this quickplay group/venue
	
	return propText;
}

function addExtraVenue(venueName){
	//first switch and get current div #
	var currentExtra=0;
	switch (venueName) {
		case 'aquarium':
			currentExtra=++numExtraAquarium;//increment numExtraVenue, then assign.
			break;
		case 'balcony':
			currentExtra=++numExtraBalcony;//increment numExtraVenue, then assign.
			break;
		case 'ballroom':
			currentExtra=++numExtraBallroom;//increment numExtraVenue, then assign.
			break;
		case 'courtyard':
			currentExtra=++numExtraCourtyard;//increment numExtraVenue, then assign.
			break;
		case 'gallery':
			currentExtra=++numExtraGallery;//increment numExtraVenue, then assign.
			break;
		case 'highrise':
			currentExtra=++numExtraHighrise;//increment numExtraVenue, then assign.
			break;
		case 'library':
			currentExtra=++numExtraLibrary;//increment numExtraVenue, then assign.
			break;
		case 'modderne':
			currentExtra=++numExtraModerne;//increment numExtraVenue, then assign.
			break;
		case 'pub':
			currentExtra=++numExtraPub;//increment numExtraVenue, then assign.
			break;
		case 'redwoods':
			currentExtra=++numExtraRedwoods;//increment numExtraVenue, then assign.
			break;
		case 'teien':
			currentExtra=++numExtraTeien;//increment numExtraVenue, then assign.
			break;
		case 'terrace':
			currentExtra=++numExtraTerrace;//increment numExtraVenue, then assign.
			break;
		case 'veranda':
			currentExtra=++numExtraVeranda;//increment numExtraVenue, then assign.
			break;
		default:
			console.log("Venue name doesn't match in addExtraVenue1");
	}


	//build extra HTML
	var thisDiv=document.getElementById(""+venueName);
	var htmlToAdd="";
	//add hr?
	htmlToAdd+="<hr>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Name'>Quickplay name:</label> <input type='text' id='"+venueName+currentExtra+"Name' value='"+document.getElementById(""+venueName+"Name").value+(currentExtra+1)+"' onChange='onNameChange(\""+venueName+currentExtra+"\")'/><b style='color:red'><span id='"+venueName+currentExtra+"NameError'></span></b><br>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Duration'>Duration in seconds:</label> <input type='number' id='"+venueName+currentExtra+"Duration' value='"+document.getElementById(""+venueName+"Duration").value+"' step='15' min='15' oninput='displayTime(\""+venueName+currentExtra+"\")'/> <span id='"+venueName+currentExtra+"Time'></span><br>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Guests'>Number of Guests:</label> <input type='number' id='"+venueName+currentExtra+"Guests' value='"+document.getElementById(""+venueName+"Guests").value+"' step='1' max='21' min='4'/><br>";
	htmlToAdd+="Gametype:<br>";
	htmlToAdd+="<input type='radio' name='"+venueName+currentExtra+"Gametype' id='"+venueName+currentExtra+"Gametype0' value='Known' onclick='showHideE(\""+venueName+currentExtra+"SelectedDiv\",false)'/> <label for='"+venueName+currentExtra+"Gametype0'>Known</label><br>";
	htmlToAdd+="<input type='radio' name='"+venueName+currentExtra+"Gametype' id='"+venueName+currentExtra+"Gametype1' value='Pick' onclick='showHideE(\""+venueName+currentExtra+"SelectedDiv\",true)'/> <label for='"+venueName+currentExtra+"Gametype1'>Pick</label><br>";
	htmlToAdd+="<input type='radio' name='"+venueName+currentExtra+"Gametype' id='"+venueName+currentExtra+"Gametype2' value='Any' checked='checked' onclick='showHideE(\""+venueName+currentExtra+"SelectedDiv\",true)'/> <label for='"+venueName+currentExtra+"Gametype2'>Any</label><br>";
	htmlToAdd+="<div id='"+venueName+currentExtra+"SelectedDiv'><label for='"+venueName+currentExtra+"Needed'># of needed Missions to win:</label> <input type='number' id='"+venueName+currentExtra+"Needed' value='"+document.getElementById(""+venueName+"Needed").value+"' step='1' max='998' min='1'  oninput='missionsUpdated(\""+venueName+currentExtra+"\")'/><br></div>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Selected'># of selected Missions:</label> <input type='number' id='"+venueName+currentExtra+"Selected' value='"+document.getElementById(""+venueName+"Selected").value+"' step='1' max='999' min='2' oninput='missionsUpdated(\""+venueName+currentExtra+"\")'/> <b style='color:red'><span id='"+venueName+currentExtra+"Error'></span></b><br>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Simplified'>Simplified Mode?</label> <input type='checkbox' name='"+venueName+currentExtra+"Simplified' id='"+venueName+currentExtra+"Simplified' value='Yes'/><br>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Preselect'>Pre-select missions?</label> <input type='checkbox' name='"+venueName+currentExtra+"Preselect' id='"+venueName+currentExtra+"Preselect' value='Yes' onclick='showHideCheckbox(\""+venueName+currentExtra+"Defaults\",this)'/><br>";
	htmlToAdd+="<div id='"+venueName+currentExtra+"Defaults' style='display:none'>";
	if (venueHasMission(venueName,"Bug"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default0' value='Bug' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default0'>Bug Ambassador</label><br>";
	if (venueHasMission(venueName,"Contact"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default1' value='Contact' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default1'>Contact Double Agent</label><br>";
	if (venueHasMission(venueName,"Transfer"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default2' value='Transfer' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default2'>Transfer Microfilm</label><br>";
	if (venueHasMission(venueName,"Swap"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default3' value='Swap' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default3'>Swap Statue</label><br>";
	if (venueHasMission(venueName,"Inspect"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default4' value='Inspect' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default4'>Inspect Statues</label><br>";
	if (venueHasMission(venueName,"Seduce"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default5' value='Seduce' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default5'>Seduce Target</label><br>";
	if (venueHasMission(venueName,"Purloin"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default6' value='Purloin' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default6'>Purloin Guest List</label><br>";
	if (venueHasMission(venueName,"Fingerprint"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Defaults' id='"+venueName+currentExtra+"Default7' value='Fingerprint' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"D\",this.checked)'/> <label for='"+venueName+currentExtra+"Default7'>Fingerprint Ambassador</label><br>";
	htmlToAdd+="<b style='color:red'><span id='"+venueName+currentExtra+"DError'></span></b>";
	htmlToAdd+="</div>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Prohibit'>Prohibit missions?</label> <input type='checkbox' name='"+venueName+currentExtra+"Prohibit' id='"+venueName+currentExtra+"Prohibit' value='Yes' onclick='showHideCheckbox(\""+venueName+currentExtra+"Prohibits\",this)'/><br>";
	htmlToAdd+="<div id='"+venueName+currentExtra+"Prohibits' style='display:none'>";	
	if (venueHasMission(venueName,"Bug"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit0' value='Bug' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit0'>Bug Ambassador</label><br>";
	if (venueHasMission(venueName,"Contact"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit1' value='Contact' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit1'>Contact Double Agent</label><br>";
	if (venueHasMission(venueName,"Transfer"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit2' value='Transfer' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit2'>Transfer Microfilm</label><br>";
	if (venueHasMission(venueName,"Swap"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit3' value='Swap' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit3'>Swap Statue</label><br>";
	if (venueHasMission(venueName,"Inspect"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit4' value='Inspect' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit4'>Inspect Statues</label><br>";
	if (venueHasMission(venueName,"Seduce"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit5' value='Seduce' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit5'>Seduce Target</label><br>";
	if (venueHasMission(venueName,"Purloin"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit6' value='Purloin' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit6'>Purloin Guest List</label><br>";
	if (venueHasMission(venueName,"Fingerprint"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Prohibits' id='"+venueName+currentExtra+"Prohibit7' value='Fingerprint' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"P\",this.checked)'/> <label for='"+venueName+currentExtra+"Prohibit7'>Fingerprint Ambassador</label><br>";
	htmlToAdd+="<b style='color:red'><span id='"+venueName+currentExtra+"PError'></span></b>";
	htmlToAdd+="</div>";
	htmlToAdd+="<label for='"+venueName+currentExtra+"Require'>Require missions?</label> <input type='checkbox' name='"+venueName+currentExtra+"Require' id='"+venueName+currentExtra+"Require' value='Yes' onclick='showHideCheckbox(\""+venueName+currentExtra+"Requires\",this)'/><br>";
	htmlToAdd+="<div id='"+venueName+currentExtra+"Requires' style='display:none'>";
	if (venueHasMission(venueName,"Bug"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require0' value='Bug' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require0'>Bug Ambassador</label><br>";
	if (venueHasMission(venueName,"Contact"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require1' value='Contact' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require1'>Contact Double Agent</label><br>";
	if (venueHasMission(venueName,"Transfer"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require2' value='Transfer' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require2'>Transfer Microfilm</label><br>";
	if (venueHasMission(venueName,"Swap"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require3' value='Swap' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require3'>Swap Statue</label><br>";
	if (venueHasMission(venueName,"Inspect"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require4' value='Inspect' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require4'>Inspect Statues</label><br>";
	if (venueHasMission(venueName,"Seduce"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require5' value='Seduce' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require5'>Seduce Target</label><br>";
	if (venueHasMission(venueName,"Purloin"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require6' value='Purloin' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require6'>Purloin Guest List</label><br>";
	if (venueHasMission(venueName,"Fingerprint"))
		htmlToAdd+="<input type='checkbox' name='"+venueName+currentExtra+"Requires' id='"+venueName+currentExtra+"Require7' value='Fingerprint' onClick='checkListErrors(\""+venueName+currentExtra+"\",\"R\",this.checked)'/> <label for='"+venueName+currentExtra+"Require7'>Fingerprint Ambassador</label><br>";
	htmlToAdd+="<b style='color:red'><span id='"+venueName+currentExtra+"RError'></span></b>";
	htmlToAdd+="</div>";
	
	thisDiv.insertAdjacentHTML('beforeend', htmlToAdd);//adds without refreshing everything


	//then switch venueName and...
	//track extra venues for error checking
	listOfDupeVenues.push(""+venueName+currentExtra);
	//take care of things that don't require accessing named globals
	displayTime(""+venueName+currentExtra);
	
	//get value of base venue game mode, then click the new gametype with that value
	document.querySelector('input[name="'+venueName+currentExtra+'Gametype"][value="'+document.querySelector('input[name="'+venueName+'Gametype"]:checked')?.value+'"]').click();
	
	//simplified doesn't have any onclick methods.  seems slightly more elegant than declaring checked in html
	document.getElementById(""+venueName+currentExtra+"Simplified").checked=Boolean(document.getElementById(""+venueName+"Simplified").checked);
	
	//preselected missions
	if (Boolean(document.getElementById(""+venueName+"Preselect").checked)){
		//trigger the onclick effects to show the sub div
		document.getElementById(""+venueName+currentExtra+"Preselect").click();
		if (venueHasMission(venueName,"Bug") && Boolean(document.getElementById(""+venueName+"Default0").checked))
			document.getElementById(""+venueName+currentExtra+"Default0").click();
		if (venueHasMission(venueName,"Contact") && Boolean(document.getElementById(""+venueName+"Default1").checked))
			document.getElementById(""+venueName+currentExtra+"Default1").click();
		if (venueHasMission(venueName,"Transfer") && Boolean(document.getElementById(""+venueName+"Default2").checked))
			document.getElementById(""+venueName+currentExtra+"Default2").click();
		if (venueHasMission(venueName,"Swap") && Boolean(document.getElementById(""+venueName+"Default3").checked))
			document.getElementById(""+venueName+currentExtra+"Default3").click();
		if (venueHasMission(venueName,"Inspect") && Boolean(document.getElementById(""+venueName+"Default4").checked))
			document.getElementById(""+venueName+currentExtra+"Default4").click();
		if (venueHasMission(venueName,"Seduce") && Boolean(document.getElementById(""+venueName+"Default5").checked))
			document.getElementById(""+venueName+currentExtra+"Default5").click();
		if (venueHasMission(venueName,"Purloin") && Boolean(document.getElementById(""+venueName+"Default6").checked))
			document.getElementById(""+venueName+currentExtra+"Default6").click();
		if (venueHasMission(venueName,"Fingerprint") && Boolean(document.getElementById(""+venueName+"Default7").checked))
			document.getElementById(""+venueName+currentExtra+"Default7").click();
	}

	//prohibited missions
	if (Boolean(document.getElementById(""+venueName+"Prohibit").checked)){
		//trigger the onclick effects to show the sub div
		document.getElementById(""+venueName+currentExtra+"Prohibit").click();
		if (venueHasMission(venueName,"Bug") && Boolean(document.getElementById(""+venueName+"Prohibit0").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit0").click();
		if (venueHasMission(venueName,"Contact") && Boolean(document.getElementById(""+venueName+"Prohibit1").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit1").click();
		if (venueHasMission(venueName,"Transfer") && Boolean(document.getElementById(""+venueName+"Prohibit2").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit2").click();
		if (venueHasMission(venueName,"Swap") && Boolean(document.getElementById(""+venueName+"Prohibit3").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit3").click();
		if (venueHasMission(venueName,"Inspect") && Boolean(document.getElementById(""+venueName+"Prohibit4").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit4").click();
		if (venueHasMission(venueName,"Seduce") && Boolean(document.getElementById(""+venueName+"Prohibit5").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit5").click();
		if (venueHasMission(venueName,"Purloin") && Boolean(document.getElementById(""+venueName+"Prohibit6").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit6").click();
		if (venueHasMission(venueName,"Fingerprint") && Boolean(document.getElementById(""+venueName+"Prohibit7").checked))
			document.getElementById(""+venueName+currentExtra+"Prohibit7").click();
	}

	//prohibited missions
	if (Boolean(document.getElementById(""+venueName+"Require").checked)){
		//trigger the onclick effects to show the sub div
		document.getElementById(""+venueName+currentExtra+"Require").click();
		if (venueHasMission(venueName,"Bug") && Boolean(document.getElementById(""+venueName+"Require0").checked))
			document.getElementById(""+venueName+currentExtra+"Require0").click();
		if (venueHasMission(venueName,"Contact") && Boolean(document.getElementById(""+venueName+"Require1").checked))
			document.getElementById(""+venueName+currentExtra+"Require1").click();
		if (venueHasMission(venueName,"Transfer") && Boolean(document.getElementById(""+venueName+"Require2").checked))
			document.getElementById(""+venueName+currentExtra+"Require2").click();
		if (venueHasMission(venueName,"Swap") && Boolean(document.getElementById(""+venueName+"Require3").checked))
			document.getElementById(""+venueName+currentExtra+"Require3").click();
		if (venueHasMission(venueName,"Inspect") && Boolean(document.getElementById(""+venueName+"Require4").checked))
			document.getElementById(""+venueName+currentExtra+"Require4").click();
		if (venueHasMission(venueName,"Seduce") && Boolean(document.getElementById(""+venueName+"Require5").checked))
			document.getElementById(""+venueName+currentExtra+"Require5").click();
		if (venueHasMission(venueName,"Purloin") && Boolean(document.getElementById(""+venueName+"Require6").checked))
			document.getElementById(""+venueName+currentExtra+"Require6").click();
		if (venueHasMission(venueName,"Fingerprint") && Boolean(document.getElementById(""+venueName+"Require7").checked))
			document.getElementById(""+venueName+currentExtra+"Require7").click();
	}

	//some stuff that references venue-named globals
	switch (venueName) {
		case 'aquarium':
			document.getElementById(""+venueName+currentExtra+"Selected").max=AquariumMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=AquariumMissionsMax-1;
			break;
		case 'balcony':
			document.getElementById(""+venueName+currentExtra+"Selected").max=BalconyMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=BalconyMissionsMax-1;
			break;
		case 'ballroom':
			document.getElementById(""+venueName+currentExtra+"Selected").max=BallroomMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=BallroomMissionsMax-1;
			break;
		case 'courtyard':
			document.getElementById(""+venueName+currentExtra+"Selected").max=CourtyardMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=CourtyardMissionsMax-1;
			break;
		case 'gallery':
			document.getElementById(""+venueName+currentExtra+"Selected").max=GalleryMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=GalleryMissionsMax-1;
			break;
		case 'highrise':
			document.getElementById(""+venueName+currentExtra+"Selected").max=HighriseMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=HighriseMissionsMax-1;
			break;
		case 'library':
			document.getElementById(""+venueName+currentExtra+"Selected").max=LibraryMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=LibraryMissionsMax-1;
			break;
		case 'modderne':
			document.getElementById(""+venueName+currentExtra+"Selected").max=ModerneMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=ModerneMissionsMax-1;
			break;
		case 'pub':
			document.getElementById(""+venueName+currentExtra+"Selected").max=PubMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=PubMissionsMax-1;
			break;
		case 'redwoods':
			document.getElementById(""+venueName+currentExtra+"Selected").max=RedwoodsMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=RedwoodsMissionsMax-1;
			break;
		case 'teien':
			document.getElementById(""+venueName+currentExtra+"Selected").max=TeienMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=TeienMissionsMax-1;
			break;
		case 'terrace':
			document.getElementById(""+venueName+currentExtra+"Selected").max=TerraceMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=TerraceMissionsMax-1;
			break;
		case 'veranda':
			document.getElementById(""+venueName+currentExtra+"Selected").max=VerandaMissionsMax;
			document.getElementById(""+venueName+currentExtra+"Needed").max=VerandaMissionsMax-1;
			break;
		default:
			console.log("Venue name doesn't match in addExtraVenue2");
	}

	
	
}

function venueHasMission(venueName,missionName){
	//I don't think this is needed, but just in case
	var numberlessString=venueName.replace(/\d+/g, '');

	//everybody loves nested switch statments
	switch (numberlessString) {
		case 'aquarium':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'balcony':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return false;
					break;
				case "Swap":
					return false;
					break;
				case "Inspect":
					return false;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'ballroom':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'courtyard':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return false;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'gallery':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'highrise':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'library':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'moderne':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'pub':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return false;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'redwoods':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'teien':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'terrace':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return false;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		case 'veranda':
			switch(missionName){
				case "Bug":
					return true;
					break;
				case "Contact":
					return true;
					break;
				case "Transfer":
					return true;
					break;
				case "Swap":
					return true;
					break;
				case "Inspect":
					return true;
					break;
				case "Seduce":
					return true;
					break;
				case "Purloin":
					return true;
					break;
				case "Fingerprint":
					return true;
					break;
				default:
					return false;
			}
			break;
		default:
			console.log("Venue name doesn't match in venueHasMission: "+numberlessString);
			return false;//just in case
	}
	return false;//just in case
}

function venueMissionCount(venueName){
	//this is needed
	var numberlessString=venueName.replace(/\d+/g, '');

	switch (numberlessString) {
		case 'aquarium':
			return 8;
			break;
		case 'balcony':
			return 5;
			break;
		case 'ballroom':
			return 8;
			break;
		case 'courtyard':
			return 7;
			break;
		case 'gallery':
			return 8;
			break;
		case 'highrise':
			return 8;
			break;
		case 'library':
			return 8;
			break;
		case 'moderne':
			return 8;
			break;
		case 'pub':
			return 7;
			break;
		case 'redwoods':
			return 8;
			break;
		case 'teien':
			return 8;
			break;
		case 'terrace':
			return 7;
			break;
		case 'veranda':
			return 8;
			break;
		default:
			console.log("Venue name doesn't match in venueMissionCount: "+numberlessString);
			return -99;//just in case
	}
}

// Function to download data to a file
function download(data, filename, type) {
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
            url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
	}
}

function showHideCheckbox(whatToHide, isChecked) {
    var e = document.getElementById(whatToHide);
    e.style.display = isChecked.checked ? "block" : "none";
}
function showHideE(whatToHide, isCheckedTF) {
    var e = document.getElementById(whatToHide);
    if (isCheckedTF)
		e.style.display="block";
	else
		e.style.display="none";
	
	
	//if whatToHide ends with "SelectedDiv" then this is a GameType radio click
	//we need to do error checking on missions
	
	if (whatToHide.endsWith("SelectedDiv")){
		var venueName=whatToHide.slice(0,-11);//should be venue name only now
		
		if (document.getElementById(venueName+"Gametype0").checked){
			//if known
			document.getElementById(venueName+"Selected").min=1;
		}
		else{//not known
			document.getElementById(venueName+"Selected").min=2;
			if (Number(document.getElementById(venueName+"Selected").value) == 1)
				document.getElementById(venueName+"Selected").value=2;
		}
		
		missionsUpdated(venueName);//update mission input box maxes for this venue
	}
	
}

function missionsUpdated(venueName){//when one of the Selected Missions counter is changed

	//this is also called when Needed missions is changed (because need to update for Required checklist), but should be okay
	var currentlySelected = Number(document.getElementById(venueName+"Selected").value);
	var maxOnThisVenue=venueMissionCount(venueName);
	if (currentlySelected>maxOnThisVenue){//prevent numbers too big
		currentlySelected=maxOnThisVenue;
		document.getElementById(venueName+"Selected").value=currentlySelected;
	}
	
	document.getElementById(venueName+"Needed").max=Math.max(currentlySelected-1,1);//set max missions needed to data or 1, whichever is higher
	if (Number(document.getElementById(venueName+"Needed").value)>= currentlySelected){//if we need to adjust current value of neededElement
		//if it's Known gametype, neededElement isn't used, so just bump down to currentlySelected-1
		document.getElementById(venueName+"Needed").value=Math.max(currentlySelected-1,1);
		missionsUpdated(venueName);//if we changed Needed amount, might as well re-run calculations
		return;//break out, no further calcs required
	}
	
	//if not the known game type, and selected=needed
	if (!document.getElementById(venueName+"Gametype0").checked && (Number(document.getElementById(venueName+"Needed").value) == Number(document.getElementById(venueName+"Selected").value))){
		document.getElementById(venueName+"Error").innerHTML="Missions Selected needs to be greater than Needed";
		//anErrorExists=true;
	}
	else{
		document.getElementById(venueName+"Error").innerHTML="";
		//anErrorExists=false;
	}
	
	retryError=false;//assume an error was fixed.  possibly not, but can allow full retry anyway

	//re-test all 3 checklists on this venue.
	checkListErrors(venueName,"D",true);
	checkListErrors(venueName,"P",true);
	checkListErrors(venueName,"R",true);
}

function countDsForVenue(venueName){
	let count = 0;
	let numberlessString=venueName.replace(/\d+/g, '');

	//console.log("testing: counting Ds for venue: "+venueName+" | numberless = "+numberlessString);

	if (venueHasMission(numberlessString,"Bug") && Boolean(document.getElementById(""+venueName+"Default0").checked))
		count++;
	if (venueHasMission(numberlessString,"Contact") && Boolean(document.getElementById(""+venueName+"Default1").checked))
		count++;
	if (venueHasMission(numberlessString,"Transfer") && Boolean(document.getElementById(""+venueName+"Default2").checked))
		count++;
	if (venueHasMission(numberlessString,"Swap") && Boolean(document.getElementById(""+venueName+"Default3").checked))
		count++;
	if (venueHasMission(numberlessString,"Inspect") && Boolean(document.getElementById(""+venueName+"Default4").checked))
		count++;
	if (venueHasMission(numberlessString,"Seduce") && Boolean(document.getElementById(""+venueName+"Default5").checked))
		count++;
	if (venueHasMission(numberlessString,"Purloin") && Boolean(document.getElementById(""+venueName+"Default6").checked))
		count++;
	if (venueHasMission(numberlessString,"Fingerprint") && Boolean(document.getElementById(""+venueName+"Default7").checked))
		count++;

	return count;
}
function countPsForVenue(venueName){
	let count = 0;
	let numberlessString=venueName.replace(/\d+/g, '');

	if (venueHasMission(numberlessString,"Bug") && Boolean(document.getElementById(""+venueName+"Prohibit0").checked))
		count++;
	if (venueHasMission(numberlessString,"Contact") && Boolean(document.getElementById(""+venueName+"Prohibit1").checked))
		count++;
	if (venueHasMission(numberlessString,"Transfer") && Boolean(document.getElementById(""+venueName+"Prohibit2").checked))
		count++;
	if (venueHasMission(numberlessString,"Swap") && Boolean(document.getElementById(""+venueName+"Prohibit3").checked))
		count++;
	if (venueHasMission(numberlessString,"Inspect") && Boolean(document.getElementById(""+venueName+"Prohibit4").checked))
		count++;
	if (venueHasMission(numberlessString,"Seduce") && Boolean(document.getElementById(""+venueName+"Prohibit5").checked))
		count++;
	if (venueHasMission(numberlessString,"Purloin") && Boolean(document.getElementById(""+venueName+"Prohibit6").checked))
		count++;
	if (venueHasMission(numberlessString,"Fingerprint") && Boolean(document.getElementById(""+venueName+"Prohibit7").checked))
		count++;

	return count;
}
function countRsForVenue(venueName){
	let count = 0;
	let numberlessString=venueName.replace(/\d+/g, '');

	if (venueHasMission(numberlessString,"Bug") && Boolean(document.getElementById(""+venueName+"Require0").checked))
		count++;
	if (venueHasMission(numberlessString,"Contact") && Boolean(document.getElementById(""+venueName+"Require1").checked))
		count++;
	if (venueHasMission(numberlessString,"Transfer") && Boolean(document.getElementById(""+venueName+"Require2").checked))
		count++;
	if (venueHasMission(numberlessString,"Swap") && Boolean(document.getElementById(""+venueName+"Require3").checked))
		count++;
	if (venueHasMission(numberlessString,"Inspect") && Boolean(document.getElementById(""+venueName+"Require4").checked))
		count++;
	if (venueHasMission(numberlessString,"Seduce") && Boolean(document.getElementById(""+venueName+"Require5").checked))
		count++;
	if (venueHasMission(numberlessString,"Purloin") && Boolean(document.getElementById(""+venueName+"Require6").checked))
		count++;
	if (venueHasMission(numberlessString,"Fingerprint") && Boolean(document.getElementById(""+venueName+"Require7").checked))
		count++;

	return count;
}

function checkListErrors(venueName,checklistKey,isChecked){
	//console.log(""+venueName);
	var currentlySelected=Number(document.getElementById(venueName+"Selected").value);
	
	//strip numbers in case we're calling a dupe.  this might mess up error checking
	var numberlessString=venueName.replace(/\d+/g, '');

	var count =-1;

	//if something was removed, allow full recheck
	if(!Boolean(isChecked))
		retryError=false;

	switch(checklistKey){//get last character as key
		case "D":
			count = countDsForVenue(venueName);

			if (count>currentlySelected){
				document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
				return true;
			}
			else{//if(count<=currentlySelected)
				document.getElementById(venueName+checklistKey+"Error").innerHTML="";
				return false;
			}
			break;
		case "P":
			count = countPsForVenue(venueName);

			if (count>AquariumMissionsMax-currentlySelected){
				document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
				return true;
			}
			else{
				document.getElementById(venueName+checklistKey+"Error").innerHTML="";
				return false;
			}
			break;
		case "R":
			count = countRsForVenue(venueName);

			if(!Boolean(document.getElementById(venueName+"Gametype0").checked)){//if not known mode
				if (count>Number(document.getElementById(venueName+"Needed").value)){
					document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
					return true;
				}
				else{
					document.getElementById(venueName+checklistKey+"Error").innerHTML="";
					return false;
				}
			}
			else{//known mode
				//then test on selected value
				if (count>currentlySelected){
					document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
					return true;
				}
				else{
					document.getElementById(venueName+checklistKey+"Error").innerHTML="";
					return false;
				}
			}
			break;
		default:
			alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
	}//end switch
}

function finalCheckForErrors(){
	//build list of all venues to test
	let venueList=[];
	listOfVenuesLowercase.forEach(element => {
		if(Boolean(document.getElementById(""+element+"Allow").checked))
			venueList.push(element);
	});
	listOfDupeVenues.forEach(element=> {
		let numberlessString=element.replace(/\d+/g, '');
		//if base venue is einabled
		if(Boolean(document.getElementById(""+numberlessString+"Allow").checked))
			venueList.push(element);
	});

	var errorExists=false;

	//test elements of venueList
	venueList.forEach(element => {
		let numberlessString=element.replace(/\d+/g, '');

		if(checkListErrors(element,"D",true) || checkListErrors(element,"P",true) || checkListErrors(element,"R",true)){
			console.log("Error detected with D/P/R checkboxes in venue "+document.getElementById(""+element+"Name").value);
			errorExists = true;
			return;//out of this for Each loop
		}

		if (Number(document.getElementById(""+element+"Guests").value)<4){
			console.log("Error detected with low guest count in venue "+document.getElementById(""+element+"Name").value);
			errorExists = true;
			return;//out of this for Each loop
		}
		if (Number(document.getElementById(""+element+"Guests").value)>GlobalMaxGuests){
			console.log("Error detected with high guest count in venue "+document.getElementById(""+element+"Name").value);
			errorExists = true;
			return;//out of this for Each loop
		}
		
		//if not Known, and needed >=selected
		if (!Boolean(document.getElementById(""+element+"Gametype0").checked) && (Number(document.getElementById(""+element+"Needed").value) >= Number(document.getElementById(""+element+"Selected").value))){
			console.log("Error detected with required missions count in venue "+document.getElementById(""+element+"Name").value);
			errorExists = true;
			return;//out of this for Each loop
		}
			
		//test if a mission is both prohibited and required?
		if(Boolean(document.getElementById(""+element+"Prohibit").checked) && Boolean(document.getElementById(""+element+"Require").checked)){
			if(venueHasMission(numberlessString,"Bug")&&Boolean(document.getElementById(""+element+"Prohibit0").checked)&&Boolean(document.getElementById(""+element+"Require0").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Contact")&&Boolean(document.getElementById(""+element+"Prohibit1").checked)&&Boolean(document.getElementById(""+element+"Require1").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Transfer")&&Boolean(document.getElementById(""+element+"Prohibit2").checked)&&Boolean(document.getElementById(""+element+"Require2").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Swap")&&Boolean(document.getElementById(""+element+"Prohibit3").checked)&&Boolean(document.getElementById(""+element+"Require3").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Inspect")&&Boolean(document.getElementById(""+element+"Prohibit4").checked)&&Boolean(document.getElementById(""+element+"Require4").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Seduce")&&Boolean(document.getElementById(""+element+"Prohibit5").checked)&&Boolean(document.getElementById(""+element+"Require5").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Purloin")&&Boolean(document.getElementById(""+element+"Prohibit6").checked)&&Boolean(document.getElementById(""+element+"Require6").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
			if(venueHasMission(numberlessString,"Fingerprint")&&Boolean(document.getElementById(""+element+"Prohibit7").checked)&&Boolean(document.getElementById(""+element+"Require7").checked)){
				console.log("Error detected with prohibited mission being required in venue "+document.getElementById(""+element+"Name").value);
				errorExists = true;
				return;//out of this for Each loop
			}
		}

	});

	return errorExists;
}

function displayTime(venueName){



	var seconds=Number(document.getElementById(venueName+"Duration").value);
	var stringBuilder="(";
	var minutes = Math.floor(seconds/60);
	if (minutes<10)
		stringBuilder+="0";
	stringBuilder+=minutes+":";
	seconds=seconds - (minutes*60);
	if (seconds<10)
		stringBuilder+="0";
	stringBuilder+=seconds+")";
	
	//display
	document.getElementById(venueName+"Time").innerHTML=stringBuilder;
}

//when changing the name, check if it has a quotation mark, pop up a warning if so.
function onNameChange(fieldName){
	
	if (fieldName=='group' || fieldName=='description')//then grab the exact fieldName
		var currentName = document.getElementById(fieldName).value;
	else//use venueName combo
		var currentName = document.getElementById(fieldName+"Name").value;
	
	//if the name contains a quotation mark
	if (currentName.indexOf('"')>=0){
		document.getElementById(fieldName+"NameError").innerHTML="  Make sure to escape quotation marks (\\\") or prop will not validate.";
		
	}
	else{
		document.getElementById(fieldName+"NameError").innerHTML="";
	}
	
}


function onLoad(){
	
	listOfVenuesLowercase.forEach(element => {
		displayTime(""+element);
		document.getElementById(""+element+"Guests").max=GlobalMaxGuests;

		/*
		//set blur detectors for mission count text boxes, and call missionsUpdated on blur
		document.getElementById(""+element+"Needed").addEventListener('blur', (event) => {
			missionsUpdated(element);
		});
		document.getElementById(""+element+"Selected").addEventListener('blur', (event) => {
			missionsUpdated(element);
		});*/
	});
	

	document.getElementById("aquariumSelected").max=AquariumMissionsMax;
	document.getElementById("aquariumNeeded").max=AquariumMissionsMax-1;
	document.getElementById("balconySelected").max=BalconyMissionsMax;
	document.getElementById("balconyNeeded").max=BalconyMissionsMax-1;
	document.getElementById("ballroomSelected").max=BallroomMissionsMax;
	document.getElementById("ballroomNeeded").max=BallroomMissionsMax-1;
	document.getElementById("courtyardSelected").max=CourtyardMissionsMax;
	document.getElementById("courtyardNeeded").max=CourtyardMissionsMax-1;
	document.getElementById("gallerySelected").max=GalleryMissionsMax;
	document.getElementById("galleryNeeded").max=GalleryMissionsMax-1;
	document.getElementById("highriseSelected").max=HighriseMissionsMax;
	document.getElementById("highriseNeeded").max=HighriseMissionsMax-1;
	document.getElementById("librarySelected").max=LibraryMissionsMax;
	document.getElementById("libraryNeeded").max=LibraryMissionsMax-1;
	document.getElementById("moderneSelected").max=ModerneMissionsMax;
	document.getElementById("moderneNeeded").max=ModerneMissionsMax-1;
	document.getElementById("pubSelected").max=PubMissionsMax;
	document.getElementById("pubNeeded").max=PubMissionsMax-1;
	document.getElementById("redwoodsSelected").max=RedwoodsMissionsMax;
	document.getElementById("redwoodsNeeded").max=RedwoodsMissionsMax-1;
	document.getElementById("teienSelected").max=TeienMissionsMax;
	document.getElementById("teienNeeded").max=TeienMissionsMax-1;
	document.getElementById("terraceSelected").max=TerraceMissionsMax;
	document.getElementById("terraceNeeded").max=TerraceMissionsMax-1;
	document.getElementById("verandaSelected").max=VerandaMissionsMax;
	document.getElementById("verandaNeeded").max=VerandaMissionsMax-1;

}
