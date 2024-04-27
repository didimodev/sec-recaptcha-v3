type PATTERN = {
  EMAIL: RegExp
  PASSWORD: RegExp
}

const PATTERNS: PATTERN = {
  EMAIL: /^[a-zA-Z0-9._]+@(gmail|hotmail|outlook)\.(com|com\.br)$/i,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$^&])(?!.*[<>%'";:,+=.\\])(?!.*\s).{8,}$/,
}

export default PATTERNS
