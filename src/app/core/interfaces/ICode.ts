export interface ICodeResponse {
  supported_codes: CodeTuple[];
}

export interface ICode {
  code: string;
  country: string;
}

export type CodeTuple = [string, string];
