import { format, formatDistanceToNow, getTime } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function timeSince(date) {
  const now = new Date().getTime();
  const seconds = Math.floor((now - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) === 1
      ? `${Math.floor(interval)} year ago`
      : `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? `${Math.floor(interval)} month ago`
      : `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? `${Math.floor(interval)} day ago`
      : `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? `${Math.floor(interval)} hour ago`
      : `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? `${Math.floor(interval)} minute ago`
      : `${Math.floor(interval)} minutes ago`;
  }
  return Math.floor(seconds) === 1
    ? `${Math.floor(seconds)} second ago`
    : `${Math.floor(seconds)} seconds ago`;
}
