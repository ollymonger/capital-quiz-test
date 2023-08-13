export type FetchQuestionResult = {
  selected: string | null;
  options: Option[] | null;
};

type Option = {
  capital: string;
};
