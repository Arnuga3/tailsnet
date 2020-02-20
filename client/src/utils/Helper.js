export default class Helper {
   
   static NO_IMAGE() {
      const iconColor = 'rgba(0,0,0,.1)';
      const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="${iconColor}" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/></svg>`;
      return `data:image/svg+xml;utf-8,${iconSVG}`;
   }

   static formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toDateString();
  };

   static getAgeString(date) {
      const today = new Date();
      const dob = new Date(date);
      const msDiff = today.getTime() - dob.getTime();
      let ageStr = '';
      
      const msYear = 365 * 86400000;
      
      const years = msDiff / msYear;
      const yearsRounded = Math.floor(years);

      const months = (years - yearsRounded) * 12;
      const monthsRounded = Math.floor(months);

      const weeks = (months - monthsRounded) * 4.3;
      const weeksRounded = Math.floor(weeks);

      if (yearsRounded > 0)
          ageStr += `${yearsRounded} y`;

      else if (yearsRounded < 1 && monthsRounded > 0)
          ageStr += `${monthsRounded} m`;

      else if (yearsRounded < 1 && monthsRounded < 1 && weeksRounded > 0)
          ageStr += `${weeksRounded} w`;
      else ageStr += '< 1 w';

      return ageStr;
  };
} 