import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/fa";

dayjs.extend(updateLocale);
dayjs.updateLocale("fa", {
  relativeTime: {
    future: "در %s آینده",
    past: "%s پیش",
    s: "چند ثانیه",
    m: "یک دقیقه",
    mm: "%d دقیقه",
    h: "یک ساعت",
    hh: "%d ساعت",
    d: "یک روز",
    dd: "%d روز",
    M: "یک ماه",
    MM: "%d ماه",
    y: "یک سال",
    yy: "%d سال",
  },
  months: {
    0: "فروردین",
    1: "اردیبهشت",
    2: "خرداد",
    3: "تیر",
    4: "مرداد",
    5: "شهریور",
    6: "مهر",
    7: "آبان",
    8: "آذر",
    9: "دی",
    10: "بهمن",
    11: "اسفند",
  },
});
export function formatCurrency(number) {
  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
  }).format(number);
}

export function formatNumber(number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}

export function formatDistanceFromNow(startDate) {
  dayjs.extend(relativeTime);
  return dayjs(startDate).locale("fa").fromNow();
}

export function formatDate(date, options) {
  return new Intl.DateTimeFormat("fa-IR", options).format(date);
}

export function getDaysBetween(start, end) {
  const range = [];
  let current = start;
  while (!current.isAfter(end)) {
    range.push(current);
    current = current.add(1, "days");
  }
  return range;
}
