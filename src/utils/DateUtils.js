// src/utils/dateUtils.js
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMMM yyyy', { locale: es });
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return dateString;
  }
};

export const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hourNumber = parseInt(hours, 10);
    const suffix = hourNumber >= 12 ? 'pm' : 'am';
    const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12;
    return `${formattedHour}:${minutes.toString().padStart(2, '0')}${suffix}`;
};
