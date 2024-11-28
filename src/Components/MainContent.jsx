import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './prayer'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState , useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
export default function MainContent() {

  const [time , setTime] = useState(new Date());
  
  const syrian_cities = [
    {
      "id": 1,
      "city": "Damascus",
      "city_ar": "دمشق"
    },
    {
      "id": 2,
      "city": "Aleppo",
      "city_ar": "حلب"
    },
    {
      "id": 3,
      "city": "Homs",
      "city_ar": "حمص"
    },
    {
      "id": 4,
      "city": "Latakia",
      "city_ar": "اللاذقية"
    },
    {
      "id": 5,
      "city": "Tartus",
      "city_ar": "طرطوس"
    },
    {
      "id": 6,
      "city": "Daraa",
      "city_ar": "درعا"
    },
    {
      "id": 7,
      "city": "Deir ez-Zor",
      "city_ar": "دير الزور"
    },
    {
      "id": 8,
      "city": "Raqqa",
      "city_ar": "الرقة"
    },
    {
      "id": 9,
      "city": "Hasakah",
      "city_ar": "الحسكة"
    },
    {
      "id": 10,
      "city": "Idlib",
      "city_ar": "إدلب"
    },
    {
      "id": 11,
      "city": "Qamishli",
      "city_ar": "القامشلي"
    },
    {
      "id": 12,
      "city": "Manbij",
      "city_ar": "منبج"
    },
    {
      "id": 13,
      "city": "Swaida",
      "city_ar": "السويداء"
    },
    {
      "id": 14,
      "city": "Rural Damascus",
      "city_ar": "ريف دمشق"
    },
    {
      "id": 15,
      "city": "Zabadani",
      "city_ar": "الزبداني"
    },
    {
      "id": 16,
      "city": "Yarmouk",
      "city_ar": "مخيم اليرموك"
    },
    {
      "id": 17,
      "city": "Banias",
      "city_ar": "بانياس"
    },
    {
      "id": 18,
      "city": "Jableh",
      "city_ar": "جبلة"
    },
    {
      "id": 19,
      "city": "Maaloula",
      "city_ar": "معرة صيدنايا"
    },
    {
      "id": 20,
      "city": "Douma",
      "city_ar": "دوما"
    },
    {
      "id": 21,
      "city": "Rastan",
      "city_ar": "الرستن"
    },
    {
      "id": 22,
      "city": "Hama",
      "city_ar": "حماة"
    },
    {
      "id": 23,
      "city": "Tabaqah",
      "city_ar": "الطبقة"
    },
    {
      "id": 24,
      "city": "Al-Bukamal",
      "city_ar": "البوكمال"
    },
    {
      "id": 25,
      "city": "Qatana",
      "city_ar": "قطنا"
    },
    {
      "id": 26,
      "city": "Jaramana",
      "city_ar": "جرمانا"
    },
    {
      "id": 27,
      "city": "Al-Hasakah",
      "city_ar": "الحسكة"
    },
    {
      "id": 28,
      "city": "Tadmor",
      "city_ar": "تدمر"
    }
  ]
  const months_ar = [
    "يناير", // January
    "فبراير", // February
    "مارس", // March
    "أبريل", // April
    "مايو", // May
    "يونيو", // June
    "يوليو", // July
    "أغسطس", // August
    "سبتمبر", // September
    "أكتوبر", // October
    "نوفمبر", // November
    "ديسمبر"  // December
  ];
   const prayers = {
    "Fajr": "الفجر",
    "Dhuhr": "الظهر",
    "Asr": "العصر",
    "Maghrib": "المغرب",
    "Isha": "العشاء"
  }

  const [nextPrayer , setNextrPrayer] = useState(' ');
  const [city , setCity] = useState(syrian_cities[0]);
   const [timings , setTimings] = useState({})
  const [nextPrayerTimeReamining , setnextPrayerTimeReamining] = useState(' '); 

   let getTimings = async ()=> {
    let data = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SY&city=${city.city}`);
    return(data.data.data);
   }
   useEffect(()=>{
    getTimings().then(
      (d)=> {
        const data = d.date.gregorian ;
        setTimings(()=> d.timings);
        setDate({day: data.day , month: months_ar[data.month.number] , year:data.year});
        
      }
    );
   }, [city]); 

  useEffect(()=> {
    let i = setInterval(()=> {
      nearestPrayer();
    });
    return()=>{
      clearInterval(i);

    }
  }
    ,[timings]);

//    useEffect(()=>{
//     let timerC = setInterval(() => {
//       setTimer((t)=>t+1)
//     }, 1000);
// return ()=> {
//   clearInterval(timerC);
// }
  //  }, []);
   const [date , setDate] = useState({day : "" , month: "" , year: ""});
   const handleDate = ()=> {  
    return `${date.year} ${date.month} ${date.day}`
   }
   const [res , setRes] = useState(screen.availWidth);
   const creen = (res > 600? 6: 12)
   window.onresize = ()=>{
    setRes(screen.availWidth)
   }
  const handleChange = (e)=>{
      setCity(()=> syrian_cities.find(el => el.id === e.target.value));
   }
  function nearestPrayer(){
      let momentNow = moment();
      let nextP = ' ';
      if(momentNow.isAfter(moment(timings.Fajr , 'hh:mm')) 
        && momentNow.isBefore(moment(timings.Dhuhr , 'hh:mm')))
      nextP = "Dhuhr"
        else  if(momentNow.isAfter(moment(timings.Dhuhr , 'hh:mm')) 
          && momentNow.isBefore(moment(timings.Asr , 'hh:mm')))
          nextP = "Asr"
        else  if(momentNow.isAfter(moment(timings.Asr , 'hh:mm')) 
            && momentNow.isBefore(moment(timings.Maghrib , 'hh:mm')))
            nextP = "Maghrib"
            else  if(momentNow.isAfter(moment(timings.Maghrib , 'hh:mm')) 
              && momentNow.isBefore(moment(timings.Isha , 'hh:mm')))
              nextP = "Isha"
              else nextP = "Fajr"

              
                if(nextP === undefined)
                  setNextrPrayer(' ');
                else setNextrPrayer(prayers[nextP]);
                let remainingTime = moment(timings[nextP] , "hh:mm").diff(momentNow);
                
                if (remainingTime < 0){
                  let midNighDiff = moment('23:59:59' , 'hh:mm:ss').diff(momentNow);
                  let aftermidNighyDiff =moment(timings[nextP] , 'hh:mm').diff(moment("00:00" , 'hh:mm'));
                  remainingTime = midNighDiff + aftermidNighyDiff;
                }
                let dur = moment.duration(remainingTime);
                setnextPrayerTimeReamining(()=> {
                  if(isNaN(dur.hours())) return ' '
                  else return `${dur.seconds()} : ${dur.minutes()} : ${dur.hours()}`
                });
              }
   
  return (
    <div style={{padding: '30px 0'}}>
    <Grid container style={{textAlign: 'center'}}>
    <Grid item xs = {creen}>
       <div>
         <h2 >{handleDate()}</h2>
         <h1  >{city.city_ar}</h1>
       </div>
    </Grid>

    <Grid item xs = {creen}>
           <div>
             <h2>{` متبقي حتى صلاة ${nextPrayer}`}</h2>
             <h1>{nextPrayerTimeReamining}</h1>
           </div>
    </Grid>
    </Grid>
    <Divider style = {{borderColor: 'gold'}}/>
    <Stack direction={'row'} justifyContent= 'center' spacing={3} sx = {{
      flexWrap: 'wrap'
    }}>
    <Prayer prayer = 'صلاة الفجر' taim = {timings.Fajr}/> 
    <Prayer prayer = "صلاة الضهر" taim = {timings.Dhuhr} />
    <Prayer prayer = "صلاة العصر" taim = {timings.Asr}/>
    <Prayer prayer = "صلاة المغرب" taim = {timings.Maghrib}/>
    <Prayer prayer = "صلاة العشاء" taim = {timings.Isha}/>
    </Stack>
    <Box style = {{display: 'flex' , justifyContent: 'center'}}>
    <FormControl style={{marginTop: '20px'}}>
        <InputLabel id="demo-simple-select-label">
        <span
        style = {{
          color: 'gold',
        }}
        >المدينة</span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
          style = {{color: 'white' , width: '100px'}}
        >
        {syrian_cities.map(e => <MenuItem key = {e.id} value = {e.id}>{e.city_ar}</MenuItem>)}

        </Select>
      </FormControl>
      </Box>
    </div>
  )
}