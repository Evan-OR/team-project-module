export type svgProps = {
  styles?: React.CSSProperties;
  className?: CSSModuleClasses[string];
};

export type DrinkComment = {
  id: number;
  username: string;
  text: string;
  datePosted: string;
};

export type FormError = {
  showError: boolean;
  errorMessage: string;
};
