export enum RegexType {
  Email = "email",
  Password = "password",
}

export const regexPatterns = {
  [RegexType.Email]: /^((?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|((?:[a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,})))$/,
  [RegexType.Password]: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};