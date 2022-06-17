export const formatName = (authorName: string) => {
  const splited = authorName.split(' ');
  const initials = splited.slice(0, splited.length - 1).map(s => {
    return s.substring(0, 1) + '.';
  });
  const name = `${initials}${splited[splited.length - 1]}`;
  return name.replace(/,/g, '');
};
