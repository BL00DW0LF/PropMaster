/*bad todo


need to backfill maxes in venue input boxes using consts.  do it when a new venue or mission comes out
can also set consts for max guests per venue and backfill
already have an onLoad method


dynamically adjust minimum guests based on max missions? selected/default missions? probably per venue

check all text values against max and min on error checking.  should be future proof since I mostly dynamically set those maxes/mins

*/



//not using these everywhere yet.  need to backfill maxes in venue input boxes.  later
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



var retryError=false;//for not forcing retries


//counters for error handling
var aquariumD=0;
var aquariumP=0;
var aquariumR=0;

var balconyD=0;
var balconyP=0;
var balconyR=0;

var ballroomD=0;
var ballroomP=0;
var ballroomR=0;

var courtyardD=0;
var courtyardP=0;
var courtyardR=0;

var galleryD=0;
var galleryP=0;
var galleryR=0;

var highriseD=0;
var highriseP=0;
var highriseR=0;

var libraryD=0;
var libraryP=0;
var libraryR=0;

var moderneD=0;
var moderneP=0;
var moderneR=0;

var pubD=0;
var pubP=0;
var pubR=0;

var redwoodsD=0;
var redwoodsP=0;
var redwoodsR=0;

var teienD=0;
var teienP=0;
var teienR=0;

var terraceD=0;
var terraceP=0;
var terraceR=0;

var verandaD=0;
var verandaP=0;
var verandaR=0;


function onClickSave(){//build the prop string, and prompt for download
	var anErrorExists=finalCheckForErrors();
	

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
		
		
		
		
		if(document.getElementById("aquariumAllow").checked)//if we are using aquarium?
			propText = propText+getQuickplayGroupFromVenue("aquarium")+"\n\n";
		if(document.getElementById("balconyAllow").checked)//if we are using balcony?
			propText = propText+getQuickplayGroupFromVenue("balcony")+"\n\n";
		if(document.getElementById("ballroomAllow").checked)//if we are using ballroom?
			propText = propText+getQuickplayGroupFromVenue("ballroom")+"\n\n";
		if(document.getElementById("courtyardAllow").checked)//if we are using courtyard?
			propText = propText+getQuickplayGroupFromVenue("courtyard")+"\n\n";
		if(document.getElementById("galleryAllow").checked)//if we are using gallery?
			propText = propText+getQuickplayGroupFromVenue("gallery")+"\n\n";
		if(document.getElementById("highriseAllow").checked)//if we are using highrise?
			propText = propText+getQuickplayGroupFromVenue("highrise")+"\n\n";
		if(document.getElementById("libraryAllow").checked)//if we are using library?
			propText = propText+getQuickplayGroupFromVenue("library")+"\n\n";
		if(document.getElementById("moderneAllow").checked)//if we are using moderne?
			propText = propText+getQuickplayGroupFromVenue("moderne")+"\n\n";	
		if(document.getElementById("pubAllow").checked)//if we are using pub?
			propText = propText+getQuickplayGroupFromVenue("pub")+"\n\n";	
		if(document.getElementById("redwoodsAllow").checked)//if we are using redwoods?
			propText = propText+getQuickplayGroupFromVenue("redwoods")+"\n\n";	
		if(document.getElementById("teienAllow").checked)//if we are using teien?
			propText = propText+getQuickplayGroupFromVenue("teien")+"\n\n";	
		if(document.getElementById("terraceAllow").checked)//if we are using terrace?
			propText = propText+getQuickplayGroupFromVenue("terrace")+"\n\n";		
		if(document.getElementById("verandaAllow").checked)//if we are using veranda?
			propText = propText+getQuickplayGroupFromVenue("veranda")+"\n\n";		
			
			
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
		alert("An error exists?  At least I think one does.  Double check all data.  Retry without changes to force it to save, maybe I'm wrong.");
		
		
	}
	
}

function getQuickplayGroupFromVenue(venueName){
	//copy custom group
	var propText="\n\t//"+venueName+"\n\tgroup quickplay =\n\t{\n\t\tint Version=1\n\t\tstring CustomGroup=\""+document.getElementById("group").value+"\"\n\t\tstring Name=\"";
	
	//quickplay name
	propText=propText+document.getElementById(venueName+"Name").value+"\"\n\t\tint LevelHash = "
	
	//get level hash
	switch(venueName)
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
			alert("Unknown venue name in venue hash switch code: "+venueName);
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
		propText=propText+"\n\t\tgroup default_missions = \n\t\t{\n\t\t\t"
		
		if(document.getElementById(venueName+"Default0") !== null && document.getElementById(venueName+"Default0").checked){//bug
			propText=propText+"strings mission = \"bug_ambassador\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default1") !== null && document.getElementById(venueName+"Default1").checked){//Contact
			propText=propText+"strings mission = \"double_agent\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default2") !== null && document.getElementById(venueName+"Default2").checked){//transfer
			propText=propText+"strings mission = \"transfer_microfilm\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default3") !== null && document.getElementById(venueName+"Default3").checked){//swap
			propText=propText+"strings mission = \"swap_statue\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default4") !== null && document.getElementById(venueName+"Default4").checked){//inspect
			propText=propText+"strings mission = \"inspect_statues\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default5") !== null && document.getElementById(venueName+"Default5").checked){//seduce
			propText=propText+"strings mission = \"seduction\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default6") !== null && document.getElementById(venueName+"Default6").checked){//purlin
			propText=propText+"strings mission = \"purloin_guestlist\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Default7") !== null && document.getElementById(venueName+"Default7").checked){//fingerprint
			propText=propText+"strings mission = \"fingerprint_ambassador\"\n\t\t\t"
		}
		//close group
		propText=propText+"\n\t\t}";
	}
	
	if (document.getElementById(venueName+"Prohibit").checked){
		propText=propText+"\n\t\tgroup prohibited_missions = \n\t\t{\n\t\t\t"
		
		if(document.getElementById(venueName+"Prohibit0") !== null && document.getElementById(venueName+"Prohibit0").checked){//bug
			propText=propText+"strings mission = \"bug_ambassador\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit1") !== null && document.getElementById(venueName+"Prohibit1").checked){//Contact
			propText=propText+"strings mission = \"double_agent\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit2") !== null && document.getElementById(venueName+"Prohibit2").checked){//transfer
			propText=propText+"strings mission = \"transfer_microfilm\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit3") !== null && document.getElementById(venueName+"Prohibit3").checked){//swap
			propText=propText+"strings mission = \"swap_statue\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit4") !== null && document.getElementById(venueName+"Prohibit4").checked){//inspect
			propText=propText+"strings mission = \"inspect_statues\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit5") !== null && document.getElementById(venueName+"Prohibit5").checked){//seduce
			propText=propText+"strings mission = \"seduction\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit6") !== null && document.getElementById(venueName+"Prohibit6").checked){//purlin
			propText=propText+"strings mission = \"purloin_guestlist\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Prohibit7") !== null && document.getElementById(venueName+"Prohibit7").checked){//fingerprint
			propText=propText+"strings mission = \"fingerprint_ambassador\"\n\t\t\t"
		}
		//close group
		propText=propText+"\n\t\t}";
	}
	
	if (document.getElementById(venueName+"Require").checked){
		propText=propText+"\n\t\tgroup required_missions = \n\t\t{\n\t\t\t"
		
		if(document.getElementById(venueName+"Require0") !== null && document.getElementById(venueName+"Require0").checked){//bug
			propText=propText+"strings mission = \"bug_ambassador\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require1") !== null && document.getElementById(venueName+"Require1").checked){//Contact
			propText=propText+"strings mission = \"double_agent\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require2") !== null && document.getElementById(venueName+"Require2").checked){//transfer
			propText=propText+"strings mission = \"transfer_microfilm\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require3") !== null && document.getElementById(venueName+"Require3").checked){//swap
			propText=propText+"strings mission = \"swap_statue\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require4") !== null && document.getElementById(venueName+"Require4").checked){//inspect
			propText=propText+"strings mission = \"inspect_statues\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require5") !== null && document.getElementById(venueName+"Require5").checked){//seduce
			propText=propText+"strings mission = \"seduction\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require6") !== null && document.getElementById(venueName+"Require6").checked){//purlin
			propText=propText+"strings mission = \"purloin_guestlist\"\n\t\t\t"
		}
		if(document.getElementById(venueName+"Require7") !== null && document.getElementById(venueName+"Require7").checked){//fingerprint
			propText=propText+"strings mission = \"fingerprint_ambassador\"\n\t\t\t"
		}
		//close group
		propText=propText+"\n\t\t}";
	}	
	
	propText=propText+"\n\t}";//end this quickplay group/venue
	
	return propText;
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
			if (document.getElementById(venueName+"Selected").value == 1)
				document.getElementById(venueName+"Selected").value=2;
		}
		
		
		missionsUpdated(venueName);//update mission input box maxes for this venue
	}
	
}



function missionsUpdated(venueName){//when one of the Selected Missions counter is changed
	//this is also called when Needed missions is changed (because need to update for Required checklist), but should be okay
	var currentlySelected = document.getElementById(venueName+"Selected").value;
	
	document.getElementById(venueName+"Needed").max=Math.max(currentlySelected-1,1);//set max missions needed to data or 1, whichever is higher
	if (document.getElementById(venueName+"Needed").value >= currentlySelected){//if we need to adjust current value of neededElement
		//if it's Known gametype, neededElement isn't used, so just bump down to currentlySelected-1
		document.getElementById(venueName+"Needed").value=Math.max(currentlySelected-1,1);
	}
	
	//if not the known game type, and selected=needed
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value == document.getElementById(venueName+"Selected").value)){
		document.getElementById(venueName+"Error").innerHTML="Missions Selected needs to be greater than Needed";
		//anErrorExists=true;
	}
	else{
		document.getElementById(venueName+"Error").innerHTML="";
		retryError=false;//an error was fixed.
		//anErrorExists=false;
	}
	
	
	//re-test all 3 checklists on this venue.
	switch(venueName){
		case "aquarium":
			if(aquariumD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(aquariumP > AquariumMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(aquariumR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{//this is known mode
				//then test on selected value
				if(aquariumR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "balcony":
			if(balconyD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(balconyP > BalconyMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(balconyR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(balconyR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "ballroom":
			if(ballroomD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(ballroomP > BallroomMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(ballroomR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(ballroomR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "courtyard":
			if(courtyardD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(courtyardP > CourtyardMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(courtyardR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(courtyardR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "gallery":
			if(galleryD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(galleryP > GalleryMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(galleryR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(galleryR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "highrise":
			if(highriseD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(highriseP > HighriseMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(highriseR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(highriseR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "library":
			if(libraryD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(libraryP > LibraryMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(libraryR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(libraryR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "moderne":
			if(moderneD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(moderneP > ModerneMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(moderneR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(moderneR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "pub":
			if(pubD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(pubP > PubMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(pubR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(pubR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "redwoods":
			if(redwoodsD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(redwoodsP > RedwoodsMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(redwoodsR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(redwoodsR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "teien":
			if(teienD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(teienP > TeienMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(teienR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(teienR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "terrace":
			if(terraceD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(terraceP > TerraceMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(terraceR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(terraceR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		case "veranda":
			if(verandaD > currentlySelected)
				document.getElementById(venueName+'D'+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
			else{
				document.getElementById(venueName+'D'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(verandaP > VerandaMissionsMax-currentlySelected)
				document.getElementById(venueName+'P'+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
			else{
				document.getElementById(venueName+'P'+"Error").innerHTML="";
				retryError=false;//an error was fixed.
			}
			if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
				//then test on needed to win value
				if(verandaR > document.getElementById(venueName+"Needed").value){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			else{
				//then test on selected value
				if(verandaR > currentlySelected){
					document.getElementById(venueName+'R'+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
				}
				else{
					document.getElementById(venueName+'R'+"Error").innerHTML="";
					retryError=false;//an error was fixed.
				}
			}
			break;
		default:
			alert("unexpected venue in list check in missionsUpdated: "+venueName);
	}
		
}





function checkListErrors(venueName,checklistKey, isChecked){
	//console.log(""+venueName);
	var currentlySelected=document.getElementById(venueName+"Selected").value;
	
	//gross code, have fun future people
	switch(venueName){
		case "aquarium":
			//aquarium
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						aquariumD++;
						if(aquariumD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						aquariumD--;
						if(aquariumD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						aquariumP++;
						if(aquariumP > AquariumMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						aquariumP--;
						if(aquariumP<=AquariumMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						aquariumR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(aquariumR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(aquariumR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						aquariumR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(aquariumR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(aquariumR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end aquarium
		
		case "balcony":
			//balcony
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						balconyD++;
						if(balconyD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						balconyD--;
						if(balconyD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						balconyP++;
						if(balconyP > BalconyMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						balconyP--;
						if(balconyP<=BalconyMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						balconyR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(balconyR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(balconyR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						balconyR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(balconyR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(balconyR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end balcony
		case "ballroom":
			//ballroom
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						ballroomD++;
						if(ballroomD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						ballroomD--;
						if(ballroomD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						ballroomP++;
						if(ballroomP > BallroomMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						ballroomP--;
						if(ballroomP<=BallroomMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						ballroomR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(ballroomR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(ballroomR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						ballroomR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(ballroomR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(ballroomR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end ballroom
		case "courtyard":
			//courtyard
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						courtyardD++;
						if(courtyardD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						courtyardD--;
						if(courtyardD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						courtyardP++;
						if(courtyardP > CourtyardMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						courtyardP--;
						if(courtyardP<=CourtyardMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						courtyardR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(courtyardR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(courtyardR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						courtyardR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(courtyardR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(courtyardR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end courtyard
		case "gallery":
			//gallery
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						galleryD++;
						if(galleryD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						galleryD--;
						if(galleryD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						galleryP++;
						if(galleryP > GalleryMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						galleryP--;
						if(galleryP<=GalleryMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						galleryR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(galleryR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(galleryR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						galleryR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(galleryR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(galleryR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end gallery
		case "highrise":
			//highrise
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						highriseD++;
						if(highriseD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						highriseD--;
						if(highriseD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						highriseP++;
						if(highriseP > HighriseMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						highriseP--;
						if(highriseP<=HighriseMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						highriseR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(highriseR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(highriseR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						highriseR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(highriseR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(highriseR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end highrise
		case "library":
			//library
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						libraryD++;
						if(libraryD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						libraryD--;
						if(libraryD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						libraryP++;
						if(libraryP > LibraryMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						libraryP--;
						if(libraryP<=LibraryMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						libraryR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(libraryR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(libraryR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						libraryR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(libraryR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(libraryR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end library
		case "moderne":
			//moderne
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						moderneD++;
						if(moderneD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						moderneD--;
						if(moderneD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						moderneP++;
						if(moderneP > ModerneMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						moderneP--;
						if(moderneP<=ModerneMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						moderneR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(moderneR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(moderneR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						moderneR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(moderneR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(moderneR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end moderne
		case "pub":
			//pub
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						pubD++;
						if(pubD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						pubD--;
						if(pubD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						pubP++;
						if(pubP > PubMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						pubP--;
						if(pubP<=PubMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						pubR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(pubR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(pubR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						pubR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(pubR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(pubR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end pub
		case "redwoods":
			//redwoods
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						redwoodsD++;
						if(redwoodsD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						redwoodsD--;
						if(redwoodsD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						redwoodsP++;
						if(redwoodsP > RedwoodsMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						redwoodsP--;
						if(redwoodsP<=RedwoodsMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						redwoodsR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(redwoodsR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(redwoodsR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						redwoodsR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(redwoodsR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(redwoodsR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end redwoods
		case "teien":
			//teien
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						teienD++;
						if(teienD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						teienD--;
						if(teienD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						teienP++;
						if(teienP > TeienMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						teienP--;
						if(teienP<=TeienMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						teienR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(teienR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(teienR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						teienR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(teienR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(teienR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end teien
		case "terrace":
			//terrace
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						terraceD++;
						if(terraceD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						terraceD--;
						if(terraceD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						terraceP++;
						if(terraceP > TerraceMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						terraceP--;
						if(terraceP<=TerraceMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						terraceR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(terraceR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(terraceR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						terraceR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(terraceR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(terraceR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end terrace
		case "veranda":
			//veranda
			switch(checklistKey){//get last character as key
				case "D":
					if(isChecked){
						verandaD++;
						if(verandaD > currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over selected.  It works, but randomly(?) selects the correct number of missions.";
							//anErrorExists=true;
						}
					}
					else{
						verandaD--;
						if(verandaD<=currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "P":
					if(isChecked){
						verandaP++;
						if(verandaP > VerandaMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="Over prohibited.  This quickplay prop will not validate.";
							//anErrorExists=true;
						}
					}
					else{
						verandaP--;
						if(verandaP<=VerandaMissionsMax-currentlySelected){
							document.getElementById(venueName+checklistKey+"Error").innerHTML="";
							retryError=false;//an error was fixed.
						}
					}
					break;
				case "R":
					if(isChecked){
						verandaR++;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
							//then test on needed to win value
							if(verandaR > document.getElementById(venueName+"Needed").value){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						else{
							//then test on selected value
							if(verandaR > currentlySelected){
								document.getElementById(venueName+checklistKey+"Error").innerHTML="Over required.  This 'works' but will forcefully enable more missions in weird ways.";
								//anErrorExists=true;
							}
						}
						
					}
					else{
						verandaR--;
						if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
								//test on needed to win
								if(verandaR<=document.getElementById(venueName+"Needed").value){//if less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
						else{
							//test on needed to win
							if(verandaR<=currentlySelected){ //if not known and less or equal required than need to win
								document.getElementById(venueName+checklistKey+"Error").innerHTML="";
								retryError=false;//an error was fixed.
							}
						}
					}
					break;
				default:
					alert("Unknown key in checkListErrors() ["+venueName+":"+checklistKey+"]");
			}
			break;//end veranda
		
		default:
			alert("Unknown venueName in checkListErrors() ["+venueName+"]");
	}//end venue switch
	
	

}//end checkListErrors




function finalCheckForErrors(){
	
	
	//test all checklists, and test guest minimum
	//should I also test needed < selected? suuure
	var venueName= "aquarium";
	var currentlySelected=document.getElementById(venueName+"Selected").value;
	if(aquariumD > currentlySelected)
		return true;
	if(aquariumP > AquariumMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(aquariumR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{//this is known mode
		//then test on selected value
		if(aquariumR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "balcony";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(balconyD > currentlySelected)
		return true;
	if(balconyP > BalconyMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(balconyR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(balconyR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "ballroom";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(ballroomD > currentlySelected)
		return true;
	if(ballroomP > BallroomMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(ballroomR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(ballroomR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "courtyard";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(courtyardD > currentlySelected)
		return true;
	if(courtyardP > CourtyardMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(courtyardR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(courtyardR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "gallery";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(galleryD > currentlySelected)
		return true;
	if(galleryP > GalleryMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(galleryR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(galleryR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "highrise";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(highriseD > currentlySelected)
		return true;
	if(highriseP > HighriseMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(highriseR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(highriseR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "library";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(libraryD > currentlySelected)
		return true;
	if(libraryP > LibraryMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(libraryR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(libraryR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "moderne";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(moderneD > currentlySelected)
		return true;
	if(moderneP > ModerneMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(moderneR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(moderneR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "pub";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(pubD > currentlySelected)
		return true;
	if(pubP > PubMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(pubR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(pubR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "redwoods";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(redwoodsD > currentlySelected)
		return true;
	if(redwoodsP > RedwoodsMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(redwoodsR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(redwoodsR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "teien";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(teienD > currentlySelected)
		return true;
	if(teienP > TeienMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(teienR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(teienR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "terrace";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(terraceD > currentlySelected)
		return true;
	if(terraceP > TerraceMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(terraceR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(terraceR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	venueName= "veranda";
	currentlySelected=document.getElementById(venueName+"Selected").value;
	if(verandaD > currentlySelected)
		return true;
	if(verandaP > VerandaMissionsMax-currentlySelected)
		return true;
	if(!document.getElementById(venueName+"Gametype0").checked){//if not known mode
		//then test on needed to win value
		if(verandaR > document.getElementById(venueName+"Needed").value){
			return true;
		}
	}
	else{
		//then test on selected value
		if(verandaR > currentlySelected){
			return true;
		}
	}
	if (document.getElementById(venueName+"Guests").value<4)
		return true;
	if (!document.getElementById(venueName+"Gametype0").checked && (document.getElementById(venueName+"Needed").value >= currentlySelected))
		return true;
	
	
	
	
	
	return false;
}






function displayTime(venueName){
	var seconds=document.getElementById(venueName+"Duration").value;
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
	//set display time for each venue
	displayTime("aquarium");
	displayTime("balcony");
	displayTime("ballroom");
	displayTime("courtyard");
	displayTime("gallery");
	displayTime("highrise");
	displayTime("library");
	displayTime("moderne");
	displayTime("pub");
	displayTime("redwoods");
	displayTime("teien");
	displayTime("terrace");
	displayTime("veranda");
	
}




