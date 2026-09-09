

export  type IntegerBounds = Readonly<{min : number, max: number}>

const assertIntegerConfiguration = (
    falback: number, {min, max} : IntegerBounds
): void => {

    if(!Number.isSafeInteger(min) ||
    !Number.isSafeInteger(max) ||
    min < 0 || min > max )
    {
      throw  new RangeError(
          `Invalid enviroment, bounds must be ordered safe integer bounds.`
      )
    }

    if(!Number.isSafeInteger(falback) || falback <min || falback > max) {
        throw new RangeError(
            `Integer environment fallback must be a safe integer between ${min} and ${max}`,        )
    }

}


const blankToUndefined = (value: unknown ,  mode: "trim" | "preserve",) : unknown => {

    if(typeof value !== "string")  return value;
     const trimed = value.trim();
     if(trimed === "") return undefined;
     return  mode === "trim" ? trimed : undefined;


}
