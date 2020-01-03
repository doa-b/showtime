export const UNREGISTERED = 0;
export const GUEST = 10;
export const MEMBER = 20;
export const SUPPORT = 30;
export const TRINITY = 40;
export const EXECUTIVE = 50;
export const ADMINISTRATOR = 60;

// TODO convert this
export const ALL = [
    {title: 'Guest', value: GUEST},
    {title: 'Member', value: MEMBER},
    {title: 'Support', value: SUPPORT},
    {title: 'Trinity', value: TRINITY},
    {title: 'Executive', value: EXECUTIVE},
    {title: 'Administrator', value: ADMINISTRATOR},
];

export const levelToString = (level) => {
  const result = ALL.filter(access => access.value === level);
  return result[0].title
};