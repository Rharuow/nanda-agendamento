export const compare = (text1: string, text2: string) =>
  text1
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .includes(
      text2
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
    );
