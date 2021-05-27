const date = new Date();

const hour = date.getHours();

type TimeFrame = 'earlyMorning' | 'morning' | 'lunchTime' | 'afterNoon' | 'dinnerTime' | 'dinner' | 'midnight';

export const timeFrame = (): TimeFrame => {
  switch (true) {
    case 4 <= hour && hour < 7:
      return 'earlyMorning';
    case 7 <= hour && hour < 10:
      return 'morning';
    case 10 <= hour && hour < 13:
      return 'lunchTime';
    case 13 <= hour && hour < 16:
      return 'afterNoon';
    case 16 <= hour && hour < 20:
      return 'dinner';
    case 20 <= hour || hour < 4:
      return 'midnight';
    default:
      return 'morning';
  }
};
