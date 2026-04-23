// src/constants/colors.ts

// 🔹 Core colors
const colors = {
 mainPurple: '#7C5DFA',
 lightPurple: '#9277FF',
 darkTheme: '#1E2139',
 darkThemeLight: '#252945',
 ourGray: '#DFE3FA',
 ourSlate: '#888EB0',
 mediumDarkSlate: '#7E88C3',
 blueBlack: '#0C0E16',
 lightRed: '#EC5757',
 pink: '#f7cfca',
 lightBG: '#F8F8F8',
 darkNavy: '#141625',


  primary25: '#F5F9FF',
  primary50: '#EAF3FF',
  primary100: '#BAD8FF',
  primary200: '#8BBDFF',
  primary300: '#E0EAFF',
  primary500: '#1A74EA',
  primary600: '#1A73E8',
  primary700: '#0047A4',
  primary800: '#003882',
  primary900: '#002A60',
  primaryx300: '#5CA2FF',
  twitter: '#1DA1F2',
  facebook: '#1877F2',
  linkedin: '#0A66c2',
  rating: '#E5CB0A',
  gray1: '#F2F4F7',
  gray2: '#D7D7D7',
  gray3: '#667085',
  gray4: '#d9d9d9',
  gray5: '#F1F2F4',
  gray25: '#FCFCFD',
  gray50: '#F9FAFB',
  gray100: '#F2F4F7',
  gray200: '#EAECF0',
  gray300: '#D0D5DD',
  gray301: '#D0D5DD',
  gray400: '#98A2B3',
  gray500: '#667085',
  gray600: '#475467',
  gray700: '#344054',
  gray800: '#1D2939',
  gray900: '#101828',
  white: '#FFFFFF',
  black: '#000000',
  dark: '#101828',
  success50: '#ECFDF3',
  success100: '#D1FADF',
  success200: '#A6F4C5',
  success500: '#12B76A',
  success600: '#039855',
  success700: '#027A48',
  warning50: '#FFFAEB',
  warning500: '#F79009',
  warning600: '#DC6803',
  warning700: '#B54708',
  warning200: '#FEDF89',
  warning100: '#FEF0C7',
  error600: '#DC3545',
  error50: '#FEF3F2',
  error100: '#F1DADF',
  error500: '#F04438',
  error700: '#B42318',
  error800: '#f8284e',
  blue600: '#1570EF',
  blue: '#2E71F3',
  blue50: '#EFF8FF',
  blue200: '#B2DDFF',
  blue700: '#175CD3',
  orange50: '#FFF6ED',
  orange100: '#FFEAD5',
  orange200: '#FFEAD5',
  orange500: '#FDDCAB',
  orange700: '#C4320A',
  rose600: '#E31B54',
  indigo50: '#EEF4FF',
  indigo200: '#C7D7FE',
  indigo600: '#444CE7',
  faintRed: '#ffcccb',
  notificationError: '#DC3545',
  unreadMessage: '#DC3545',
  youtube: '#FF0302',
  verifiedDark: '#3CB456',
  verifiedLight: '#E5FFEC',
  notificationSuccess: '#339900',
  notificationWarning: '#ff9966',
  purple: '#CF9FFF',
  purple50: '#F4F3FF',
  purple100: '#EBE9FE',
  purple200: '#D9D6FE',
  purple500: '#7A5AF8',
  purple600: '#6938EF',
  purple700: '#5925DC',
  purpleDark: '#444CE7E5',
  border: '#D0D5DD',
  blueLight50: '#F0F9FF',
  blueLight100: '#E0F2FE',
  blueLight500: '#0BA5EC',
  blueLight600: '#0086C9',
  blueLight700: '#026AA2',
  blueGray200: '#D5D9EB',
};

// 🔹 Derived types
export type ColorKey = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorKey];

// 🔹 Monthly rating colors
export const monthlyRatingColors = {
  positive: {
    color: '#12B76A',
    background: '#ECFDF3',
  },
  negative: {
    color: '#FB6514',
    background: '#FDEDDE8F',
  },
  flatline: {
    color: colors.gray500,
    background: colors.gray200,
  },
};

// 🔹 Profile avatar colors
export const profileColors = [
  '#a6691e',
  '#8b8f14',
  '#15734a',
  '#154773',
  '#7a5199',
  '#944d93',
  '#944d62',
  '#A4BCFD',
];

// 🔹 Event schedule colors
const scheduleColors: string[] = [
  '#F79009',
  '#1570EF',
  '#12B76A',
  '#FF69B4',
  '#8E4ECF',
];

let usedColors: string[] = [];

export const scheduleEventColors = (): string => {
  const availableColors = scheduleColors.filter(
    (color) => !usedColors.includes(color)
  );

  let selectedColor: string;

  if (availableColors.length === 0) {
    usedColors = [];
    selectedColor =
      scheduleColors[Math.floor(Math.random() * scheduleColors.length)];
  } else {
    selectedColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
  }

  usedColors.push(selectedColor);
  return selectedColor;
};

// 🔹 Random profile color
export const randomColorGetter = (): string => {
  return profileColors[Math.floor(Math.random() * profileColors.length)];
};

// 🔹 Default tooltip styles
export const defaultTooltipStyles: {
  backgroundColor: ColorValue;
  color: ColorValue;
  fontWeight: string;
  zIndex: string;
  borderRadius: string;
} = {
  backgroundColor: colors.primary50,
  color: colors.primary600,
  fontWeight: '600',
  zIndex: '50',
  borderRadius: '8px',
};

export { colors };
export default colors;
