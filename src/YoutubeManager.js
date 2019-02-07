// export const getYoutubeSearchId = async (search) => {
//   if(!search) return youtubeError();

//   console.log(process.env.YOUTUBE_DATA_API_KEY);
//   if(!process.env.YOUTUBE_DATA_API_KEY) return missingYtDataApiKeyError();

//   let _return =  await fetch('https://www.googleapis.com/youtube/v3/'+
//   'search?part=snippet&order=relevance&q='+search+
//   '&key='+process.env.YOUTUBE_DATA_API_KEY,
//   {mode: 'cors'})
//   .then(response => response.json())
//   .then(data => {
//       if(data.error) 
//       {
//           console.error(data)
//           return null;
//       }
//       return data;
//   });
//   return _return;  
// }

export const getYoutubeSearchId = async (search) => {
  if(!search) return youtubeError();

  let _return =  await fetch('https://www.googleapis.com/youtube/v3/'+
  'search?part=snippet&order=relevance&q='+search+
  '&key=AIzaSyDuNGLnUASRTFPRSbPrNldPrql53vRqm8E',
  {mode: 'cors'})
  .then(response => response.json())
  .then(data => {
      if(data.error) 
      {
          console.error(data)
          return null;
      }
      return data.items[0].id.videoId;
  });
  return _return;  
}


const missingYtDataApiKeyError = () => {
  console.error('Missing YOUTUBE_DATA_API_KEY YoutubeManager.js');
  return null;
}

const youtubeError = () => {
  console.error('Error YoutubeManager.js');
  return null;
}
