export type svgProps = {
  styles?: React.CSSProperties;
  className?: CSSModuleClasses[string];
};

export type DrinkComment = {
  id: number;
  username: string;
  userId: number;
  text: string;
  rating: number;
  datePosted: string;
};

export type FormError = {
  showError: boolean;
  errorMessage: string;
};
