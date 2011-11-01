function Connect() {
  var ret = document.embeds[0].Connect("*");
  if(ret != "") {
    alert(ret);
  } else {
    document.getElementById('ButDisconnect').style.display="block";  
    document.getElementById('ButConnect').style.display="none";
    document.getElementById('InfoConnected').style.display="block";  
    document.getElementById('InfoStart').style.display="none";
    document.getElementById('InfoPresent').style.display="none";
    document.getElementById('APDU').style.display="block";
  }   
}

function Disconnect() {
  document.embeds[0].Disconnect(true);
  document.getElementById('ButDisconnect').style.display="none";
  document.getElementById('APDU').style.display="none";
  document.getElementById('ButConnect').style.display="block";
  document.getElementById('ApduOut').value = "";
  document.getElementById('ApduIn').value = "";
  RefreshCardState();
}

function setReader() {
  var readerName = document.getElementById('readers').options[document.getElementById('readers').selectedIndex].value;
  var set = document.embeds[0].SetReader(readerName);
  RefreshCardState();
  Disconnect();
}

function SendApdu() {
  var set = document.embeds[0].TransmitString(document.getElementById('ApduIn').value);
  document.getElementById('ApduOut').value = set;
}

function RefreshReadersList() {
  var nb = document.embeds[0].GetReaderCount();
  s = '<select class="select" id= "readers"  onChange="setReader();">' ;
  var i;
  for (i=0; i<nb; i++) {
    s += '<option>'+document.embeds[0].GetReaderName(i)+'</option>';
  }
  s += '</select>';
  document.getElementById('list').innerHTML = s;
  setReader();
}

function RefreshCardState() {
  var isPresent = document.embeds[0].IsCardPresent();
  if(isPresent) {
    document.getElementById('CardState').value = "Card Present";
    document.getElementById('InfoConnected').style.display="none";  
    document.getElementById('InfoStart').style.display="none";
    document.getElementById('InfoPresent').style.display="block";
  } else {
    document.getElementById('CardState').value = "No Card on the reader";
    document.getElementById('InfoConnected').style.display="none";  
    document.getElementById('InfoStart').style.display="block";
    document.getElementById('InfoPresent').style.display="none";
  }
}

function display(str) {
  alert('.'+str+'.');
}
