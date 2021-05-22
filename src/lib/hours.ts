const date = new Date();

const hour = date.getHours();

type TimeFrame =
  | 'earlyMorning'
  | 'morning'
  | 'lunchTime'
  | 'afterNoon'
  | 'dinnerTime'
  | 'dinner'
  | 'midnight';

export const timeFrame = (): TimeFrame => {
  switch (true) {
    case 4 <= hour && hour < 7:
      return 'earlyMorning';
      break;
    case 7 <= hour && hour < 10:
      return 'morning';
      break;
    case 10 <= hour && hour < 13:
      return 'lunchTime';
      break;
    case 13 <= hour && hour < 16:
      return 'afterNoon';
      break;
    case 16 <= hour && hour < 20:
      return 'dinner';
      break;
    case 20 <= hour || hour < 4:
      return 'midnight';
      break;
    default:
      return 'morning';
  }
};
