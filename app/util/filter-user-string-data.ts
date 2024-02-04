import { UserData } from "@app/types/user";

export interface FilterRule {
  property: keyof Omit<UserData, "id">;
  regex: string;
  regexFlag?: string;
}

export default function filterUserStringData(
  rules: FilterRule[],
  data: UserData[]
) {
  return data.filter((value) => {
    let flag = false;

    for (let rule of rules) {
      flag =
        flag ||
        new RegExp(rule.regex, rule.regexFlag).test(value[rule.property]);
    }

    return flag;
  });
}
