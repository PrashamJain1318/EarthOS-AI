export function generateICS(event: {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  url?: string;
}) {
  const { title, description, startDate, endDate, location, url } = event;

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  const formatDate = (date: Date) => {
    return (
      date.getUTCFullYear() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      'T' +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      'Z'
    );
  };

  const start = formatDate(startDate);
  // Default to a 1 hour event if no end date
  const end = endDate ? formatDate(endDate) : formatDate(new Date(startDate.getTime() + 60 * 60 * 1000));

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EARTHOS AI//Warranty Tracker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${startDate.getTime()}@earthos.ai`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
  ];

  if (location) icsLines.push(`LOCATION:${location}`);
  if (url) icsLines.push(`URL:${url}`);

  icsLines.push('STATUS:CONFIRMED');
  icsLines.push('END:VEVENT');
  icsLines.push('END:VCALENDAR');

  return icsLines.join('\r\n');
}

export function downloadICS(filename: string, icsContent: string) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
