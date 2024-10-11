console.log("started");
let videos = 0;
let shorts = 0;
let date = new Date();
let totTime = 0;
let avgTime = 0;
let flag  = false;
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    videos++;
    if(videos>1){
      const curr = new Date();
      curr.toLocaleTimeString();
      console.log("video played for ",(curr-date)/1000," sec");
      totTime = totTime + (curr-date)/1000;
      avgTime = totTime/(shorts+videos);
      console.log("average time spend is ",avgTime," sec");
      chrome.storage.local.set({ avgTime });
    }
    date = new Date();
    const queryParameters = tab.url.split("?")[1];
    console.log(queryParameters);
    console.log(date.toLocaleTimeString());   
    console.log("videos: ",videos);
  }
  else if (tab.url && tab.url.includes("youtube.com/shorts")) {
    shorts++;
    if(shorts>1){
      const curr = new Date();
      curr.toLocaleTimeString();
      console.log("video played for ",(curr-date)/1000," sec");
      totTime = totTime + (curr-date)/1000;
      avgTime = totTime/(shorts+videos);
      console.log("average time spend is ",avgTime," sec");
      flag = false;
      chrome.storage.local.set({ avgTime, shorts, flag });
    }
    date = new Date();
    const queryParameters = tab.url.split("shorts")[1];
    console.log(queryParameters);
    console.log("shorts: ",shorts);  
  }
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  
  if(areaName === "local" && changes.flag && changes.flag.newValue == true) {
    console.log("flag is true");
    avgTime = 0;
    totTime = 0;
    shorts = 0;
    date = new Date();
  }
});