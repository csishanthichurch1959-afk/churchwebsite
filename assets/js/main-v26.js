
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
}
const backToTop = document.getElementById('backToTop');
if(backToTop){
  const toggle = ()=>backToTop.classList.toggle('show',window.scrollY>520);
  window.addEventListener('scroll',toggle,{passive:true}); toggle();
  backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());


const dailyPassages=[{"theme": "Peace", "reference": "John 14:25-27"}, {"theme": "The Good Shepherd", "reference": "Psalm 23:1-6"}, {"theme": "Renewed Strength", "reference": "Isaiah 40:28-31"}, {"theme": "Rest for the Weary", "reference": "Matthew 11:28-30"}, {"theme": "Prayer and Peace", "reference": "Philippians 4:4-7"}, {"theme": "God Our Keeper", "reference": "Psalm 121:1-8"}, {"theme": "Hope", "reference": "Romans 15:10-13"}, {"theme": "Refuge", "reference": "Psalm 46:1-7"}, {"theme": "Trust and Direction", "reference": "Proverbs 3:5-8"}, {"theme": "Cast Your Cares", "reference": "1 Peter 5:5-7"}, {"theme": "Grace in Weakness", "reference": "2 Corinthians 12:7-10"}, {"theme": "Under His Wings", "reference": "Psalm 91:1-6"}, {"theme": "Courage", "reference": "Joshua 1:7-9"}, {"theme": "God's Faithfulness", "reference": "Lamentations 3:21-26"}, {"theme": "Nothing Can Separate Us", "reference": "Romans 8:31-39"}, {"theme": "Joy in the Morning", "reference": "Psalm 30:4-12"}, {"theme": "God Will Guide", "reference": "Psalm 32:7-11"}, {"theme": "Be Still", "reference": "Psalm 46:8-11"}, {"theme": "God's Compassion", "reference": "Psalm 103:8-14"}, {"theme": "Seek First the Kingdom", "reference": "Matthew 6:31-34"}, {"theme": "The Lord Is Good", "reference": "Nahum 1:6-7"}, {"theme": "Near to the Brokenhearted", "reference": "Psalm 34:15-18"}, {"theme": "Do Not Grow Weary", "reference": "Galatians 6:7-10"}, {"theme": "The Priestly Blessing", "reference": "Numbers 6:22-27"}, {"theme": "Hope in God", "reference": "Psalm 42:5-11"}, {"theme": "Abide in Christ", "reference": "John 15:4-8"}, {"theme": "Love Never Fails", "reference": "1 Corinthians 13:4-8"}, {"theme": "A New Heart", "reference": "Ezekiel 36:25-28"}, {"theme": "The Lord Is My Light", "reference": "Psalm 27:1-5"}, {"theme": "A Living Hope", "reference": "1 Peter 1:3-5"}, {"theme": "Wisdom from Above", "reference": "James 3:13-18"}, {"theme": "Ask in Faith", "reference": "James 1:5-8"}, {"theme": "Every Good Gift", "reference": "James 1:16-18"}, {"theme": "Doers of the Word", "reference": "James 1:22-25"}, {"theme": "Faith and Works", "reference": "James 2:14-18"}, {"theme": "The Prayer of Faith", "reference": "James 5:13-16"}, {"theme": "God Works for Good", "reference": "Romans 8:26-30"}, {"theme": "Living Sacrifice", "reference": "Romans 12:1-2"}, {"theme": "Overcome Evil with Good", "reference": "Romans 12:17-21"}, {"theme": "Peace with God", "reference": "Romans 5:1-5"}, {"theme": "Made New", "reference": "2 Corinthians 5:17-21"}, {"theme": "Treasure in Earthen Vessels", "reference": "2 Corinthians 4:7-10"}, {"theme": "Do Not Lose Heart", "reference": "2 Corinthians 4:16-18"}, {"theme": "Walk by Faith", "reference": "2 Corinthians 5:6-9"}, {"theme": "Fruit of the Spirit", "reference": "Galatians 5:22-26"}, {"theme": "Bear One Another's Burdens", "reference": "Galatians 6:1-5"}, {"theme": "Chosen in Love", "reference": "Ephesians 1:3-6"}, {"theme": "Saved by Grace", "reference": "Ephesians 2:4-10"}, {"theme": "Strengthened Within", "reference": "Ephesians 3:14-21"}, {"theme": "Walk in Love", "reference": "Ephesians 5:1-2"}, {"theme": "Armor of God", "reference": "Ephesians 6:10-18"}, {"theme": "The Mind of Christ", "reference": "Philippians 2:3-8"}, {"theme": "Press Toward the Mark", "reference": "Philippians 3:12-14"}, {"theme": "Think on These Things", "reference": "Philippians 4:8-9"}, {"theme": "Christ Is Enough", "reference": "Colossians 2:6-10"}, {"theme": "Put on Compassion", "reference": "Colossians 3:12-17"}, {"theme": "Encourage One Another", "reference": "1 Thessalonians 5:11-18"}, {"theme": "God Is Faithful", "reference": "1 Thessalonians 5:23-24"}, {"theme": "A Spirit of Power and Love", "reference": "2 Timothy 1:6-7"}, {"theme": "Scripture Equips Us", "reference": "2 Timothy 3:14-17"}, {"theme": "Run with Endurance", "reference": "Hebrews 12:1-3"}, {"theme": "Draw Near with Confidence", "reference": "Hebrews 4:14-16"}, {"theme": "Hold Fast to Hope", "reference": "Hebrews 10:19-25"}, {"theme": "Faith's Assurance", "reference": "Hebrews 11:1-6"}, {"theme": "God Will Never Leave You", "reference": "Hebrews 13:5-6"}, {"theme": "Love in Action", "reference": "1 John 3:16-18"}, {"theme": "God Is Love", "reference": "1 John 4:7-12"}, {"theme": "Perfect Love Casts Out Fear", "reference": "1 John 4:16-19"}, {"theme": "God Hears Us", "reference": "1 John 5:13-15"}, {"theme": "The Beatitudes", "reference": "Matthew 5:3-12"}, {"theme": "Salt and Light", "reference": "Matthew 5:13-16"}, {"theme": "Do Not Worry", "reference": "Matthew 6:25-30"}, {"theme": "Ask, Seek, Knock", "reference": "Matthew 7:7-11"}, {"theme": "The Greatest Commandment", "reference": "Matthew 22:36-40"}, {"theme": "The Great Commission", "reference": "Matthew 28:18-20"}, {"theme": "The Word Became Flesh", "reference": "John 1:1-5"}, {"theme": "God So Loved the World", "reference": "John 3:14-17"}, {"theme": "Living Water", "reference": "John 4:13-14"}, {"theme": "Bread of Life", "reference": "John 6:35-40"}, {"theme": "The Light of the World", "reference": "John 8:12"}, {"theme": "The Good Shepherd's Care", "reference": "John 10:11-16"}, {"theme": "Resurrection and Life", "reference": "John 11:25-27"}, {"theme": "The Way, Truth and Life", "reference": "John 14:1-6"}, {"theme": "Love One Another", "reference": "John 13:34-35"}, {"theme": "Joy Made Full", "reference": "John 15:9-12"}, {"theme": "Christ's Prayer for Unity", "reference": "John 17:20-23"}, {"theme": "God's Wonderful Works", "reference": "Psalm 8:1-9"}, {"theme": "The Heavens Declare", "reference": "Psalm 19:1-6"}, {"theme": "The Lord Is My Salvation", "reference": "Psalm 27:7-14"}, {"theme": "Taste and See", "reference": "Psalm 34:1-8"}];
let dailyLanguage=localStorage.getItem("shanthiDailyLanguage")||"en";
const dailyCachePrefix="shanthiBiblePassage:";

function localDayOfYear(d){
  const start=new Date(d.getFullYear(),0,0);
  return Math.floor((d-start)/86400000);
}

function todayPassage(){
  const now=new Date();
  return {date:now,item:dailyPassages[(localDayOfYear(now)-1)%dailyPassages.length]};
}

function cacheKey(date,reference){
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,"0");
  const d=String(date.getDate()).padStart(2,"0");
  return dailyCachePrefix+y+"-"+m+"-"+d+":"+reference;
}

function cleanVerseText(v){
  if(v==null)return "";
  return String(v).replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
}

function versesToText(list){
  if(!Array.isArray(list))return "";
  return list.map(v=>cleanVerseText(v.text)).filter(Boolean).join(" ");
}

function readMinimalResult(data,module){
  if(!data || !data.results)return "";
  const result=data.results[module];
  if(Array.isArray(result))return versesToText(result);
  return "";
}

async function fetchDailyPassage(reference){
  const {date}=todayPassage();
  const key=cacheKey(date,reference);
  const cached=localStorage.getItem(key);
  if(cached){
    try{return JSON.parse(cached)}catch(e){}
  }

  const params=new URLSearchParams();
  params.set("reference",reference);
  params.set("data_format","minimal");
  params.set("bible",JSON.stringify(["kjv","kn_irv"]));

  const url="https://api.biblesupersearch.com/api?"+params.toString();
  const response=await fetch(url,{headers:{"Accept":"application/json"}});
  if(!response.ok)throw new Error("Bible service returned "+response.status);
  const data=await response.json();

  if(data.error_level && data.error_level>=4){
    throw new Error((data.errors||[]).join(" ")||"Bible service error");
  }

  const en=readMinimalResult(data,"kjv");
  const kn=readMinimalResult(data,"kn_irv");
  if(!en || !kn)throw new Error("Passage text was not returned in both languages.");

  const value={en,kn};
  try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}
  return value;
}

async function renderDailyPassage(){
  const {date,item}=todayPassage();
  const text=document.getElementById("dailyText");
  if(!text)return;

  document.getElementById("dailyTheme").textContent=item.theme;
  document.getElementById("dailyReference").textContent=item.reference;
  document.getElementById("dailyDate").textContent=date.toLocaleDateString(
    dailyLanguage==="kn"?"kn-IN":undefined,
    {weekday:"long",day:"numeric",month:"long",year:"numeric"}
  );

  document.getElementById("langEnglish")?.classList.toggle("active",dailyLanguage==="en");
  document.getElementById("langKannada")?.classList.toggle("active",dailyLanguage==="kn");
  text.classList.toggle("kn",dailyLanguage==="kn");
  text.classList.add("daily-loading");
  text.classList.remove("daily-error");
  text.textContent=dailyLanguage==="kn"
    ?"ಇಂದಿನ ಬೈಬಲ್ ಭಾಗವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ…"
    :"Loading today’s Bible passage…";

  try{
    const content=await fetchDailyPassage(item.reference);
    text.textContent=content[dailyLanguage];
  }catch(err){
    console.error(err);
    text.classList.add("daily-error");
    text.textContent=dailyLanguage==="kn"
      ?"ಈ ಕ್ಷಣದಲ್ಲಿ ಬೈಬಲ್ ಭಾಗವನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
      :"Today’s Bible passage could not be loaded right now. Please try again shortly.";
  }finally{
    text.classList.remove("daily-loading");
  }
}

document.getElementById("langEnglish")?.addEventListener("click",()=>{
  dailyLanguage="en";
  localStorage.setItem("shanthiDailyLanguage","en");
  renderDailyPassage();
});
document.getElementById("langKannada")?.addEventListener("click",()=>{
  dailyLanguage="kn";
  localStorage.setItem("shanthiDailyLanguage","kn");
  renderDailyPassage();
});

renderDailyPassage();
